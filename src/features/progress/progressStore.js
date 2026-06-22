import { getCurrentClientId } from '../auth/authStore';
import { supabase, supabaseKey, supabaseUrl } from '../../shared/lib/supabase';

const LOCAL_PROGRESS_KEY = 'quizProgress';
const SYNC_QUEUE_KEY = 'sync_queue';
const ANSWERS_SINCE_SYNC_KEY = 'quizAnswersSinceSync';
const SYNC_BATCH_SIZE = 10;

export const getClientId = () => {
  return getCurrentClientId();
};

const getScopedStorageKey = (key) => {
  return `${key}:${getClientId()}`;
};

const progressRowsToState = (rows) => {
  return rows.reduce((state, row) => {
    if (!state.chapters[row.category_id]) {
      state.chapters[row.category_id] = {};
    }
    state.chapters[row.category_id][row.chapter_id] = {
      answeredIds: row.answered_ids || [],
      correctCount: row.correct_count || 0
    };
    return state;
  }, { chapters: {} });
};

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(getScopedStorageKey(key));
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(getScopedStorageKey(key), JSON.stringify(value));
};

const getQueueKey = (categoryId, chapterId) => `${categoryId}::${chapterId}`;

const progressToRow = (categoryId, chapterId, progress) => ({
  client_id: getClientId(),
  category_id: categoryId,
  chapter_id: chapterId,
  answered_ids: progress.answeredIds,
  correct_count: progress.correctCount,
  updated_at: new Date().toISOString()
});

export const getLocalQuizProgress = () => {
  return readJson(LOCAL_PROGRESS_KEY, { chapters: {} });
};

export const saveLocalChapterProgress = (categoryId, chapterId, progress) => {
  const state = getLocalQuizProgress();
  if (!state.chapters[categoryId]) {
    state.chapters[categoryId] = {};
  }
  state.chapters[categoryId][chapterId] = progress;
  writeJson(LOCAL_PROGRESS_KEY, state);
  return state;
};

const mergeProgressStates = (remoteState, localState) => {
  const merged = {
    chapters: {
      ...(remoteState.chapters || {})
    }
  };

  Object.entries(localState.chapters || {}).forEach(([categoryId, chapters]) => {
    merged.chapters[categoryId] = {
      ...(merged.chapters[categoryId] || {}),
      ...chapters
    };
  });

  return merged;
};

export const getSyncQueue = () => {
  return readJson(SYNC_QUEUE_KEY, {});
};

export const getSyncQueueSize = () => {
  return Object.keys(getSyncQueue()).length;
};

export const enqueueProgressSync = (categoryId, chapterId, progress) => {
  const queue = getSyncQueue();
  queue[getQueueKey(categoryId, chapterId)] = progressToRow(categoryId, chapterId, progress);
  writeJson(SYNC_QUEUE_KEY, queue);
  return queue;
};

const clearSyncedQueueRows = (sentQueue) => {
  const latestQueue = getSyncQueue();
  Object.entries(sentQueue).forEach(([key, row]) => {
    if (JSON.stringify(latestQueue[key]) === JSON.stringify(row)) {
      delete latestQueue[key];
    }
  });
  writeJson(SYNC_QUEUE_KEY, latestQueue);
};

export const fetchQuizProgress = async () => {
  const clientId = getClientId();
  const { data, error } = await supabase
    .from('quiz_progress')
    .select('category_id, chapter_id, answered_ids, correct_count')
    .eq('client_id', clientId);

  if (error) {
    console.warn('Remote progress unavailable, using local progress:', error);
    return getLocalQuizProgress();
  }

  return mergeProgressStates(progressRowsToState(data || []), getLocalQuizProgress());
};

export const saveChapterProgress = async (categoryId, chapterId, progress) => {
  const clientId = getClientId();
  const { error } = await supabase
    .from('quiz_progress')
    .upsert({
      client_id: clientId,
      category_id: categoryId,
      chapter_id: chapterId,
      answered_ids: progress.answeredIds,
      correct_count: progress.correctCount,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'client_id,category_id,chapter_id'
    });

  if (error) {
    throw error;
  }
};

export const saveChapterProgressLocally = (categoryId, chapterId, progress) => {
  saveLocalChapterProgress(categoryId, chapterId, progress);
  enqueueProgressSync(categoryId, chapterId, progress);
};

export const syncQueuedProgress = async () => {
  const queue = getSyncQueue();
  const rows = Object.values(queue);

  if (rows.length === 0) {
    return { synced: 0, pending: 0 };
  }

  const { error } = await supabase
    .from('quiz_progress')
    .upsert(rows, {
      onConflict: 'client_id,category_id,chapter_id'
    });

  if (error) {
    throw error;
  }

  clearSyncedQueueRows(queue);
  localStorage.setItem(getScopedStorageKey(ANSWERS_SINCE_SYNC_KEY), '0');

  return {
    synced: rows.length,
    pending: getSyncQueueSize()
  };
};

export const syncQueuedProgressIfNeeded = async () => {
  const answersSinceSyncKey = getScopedStorageKey(ANSWERS_SINCE_SYNC_KEY);
  const answersSinceSync = Number(localStorage.getItem(answersSinceSyncKey) || '0') + 1;
  localStorage.setItem(answersSinceSyncKey, String(answersSinceSync));

  if (answersSinceSync < SYNC_BATCH_SIZE) {
    return { skipped: true, pending: getSyncQueueSize() };
  }

  return syncQueuedProgress();
};

export const flushQueuedProgressWithKeepAlive = () => {
  const queue = getSyncQueue();
  const rows = Object.values(queue);

  if (rows.length === 0 || !supabaseUrl || !supabaseKey) {
    return false;
  }

  const endpoint = `${supabaseUrl}/rest/v1/quiz_progress?on_conflict=client_id,category_id,chapter_id`;
  fetch(endpoint, {
    method: 'POST',
    keepalive: true,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates'
    },
    body: JSON.stringify(rows)
  }).catch(() => {});

  return true;
};

export const getChapterProgress = (progressState, categoryId, chapterId) => {
  return progressState.chapters?.[categoryId]?.[chapterId] || {
    answeredIds: [],
    correctCount: 0
  };
};

export const clearLegacyLocalProgress = () => {
  localStorage.removeItem('legacyQuizProgress');
};
