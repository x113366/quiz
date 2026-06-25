import { supabase } from '../../shared/lib/supabase';

const AUTH_USER_KEY = 'sharedCurrentUser';
const LEGACY_AUTH_USER_KEY = 'quizCurrentUser';
const ANONYMOUS_CLIENT_ID_KEY = 'quizClientId';
const AUTH_CHANGE_EVENT = 'quiz-auth-change';

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
};

const writeCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const getCurrentUser = () => {
  const user = readJson(AUTH_USER_KEY, null);
  if (user) return user;

  const legacyUser = readJson(LEGACY_AUTH_USER_KEY, null);
  if (legacyUser) {
    writeCurrentUser(legacyUser);
  }
  return legacyUser;
};

export const canEditQuestions = (user = getCurrentUser()) => {
  return user?.username?.toLowerCase() === 'x113366';
};

export const getCurrentClientId = () => {
  const user = getCurrentUser();
  if (user?.id) {
    return `user:${user.id}`;
  }

  const existing = localStorage.getItem(ANONYMOUS_CLIENT_ID_KEY);
  if (existing) return `anon:${existing}`;

  const clientId = crypto.randomUUID();
  localStorage.setItem(ANONYMOUS_CLIENT_ID_KEY, clientId);
  return `anon:${clientId}`;
};

const normalizeAuthRow = (row) => ({
  id: row.id,
  username: row.username
});

const callAuthFunction = async (functionName, username, password) => {
  const { data, error } = await supabase.rpc(functionName, {
    p_username: username,
    p_password: password
  });

  if (error) {
    throw new Error(error.message || '登录服务暂时不可用');
  }

  const user = normalizeAuthRow(data?.[0]);
  writeCurrentUser(user);
  return user;
};

export const loginUser = (username, password) => {
  return callAuthFunction('quiz_login_user', username, password);
};

export const registerUser = (username, password) => {
  return callAuthFunction('quiz_register_user', username, password);
};

export const logoutUser = () => {
  writeCurrentUser(null);
};

export const subscribeToAuthChanges = (callback) => {
  const handler = () => callback(getCurrentUser());
  window.addEventListener(AUTH_CHANGE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
};
