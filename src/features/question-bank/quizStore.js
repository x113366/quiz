import { supabase } from '../../shared/lib/supabase';

let quizCache = null;
const QUIZ_CATEGORIES_KEY = 'quizCategories';
const QUIZ_QUESTIONS_KEY = 'quizQuestions';
const LOCAL_QUIZ_CATEGORIES_KEY = 'localQuizCategories';
const LOCAL_QUIZ_QUESTIONS_KEY = 'localQuizQuestions';

const EMPTY_QUIZ_DATA = {
  categories: [],
  questions: {}
};

const normalizeQuestion = (question) => ({
  id: question.id,
  question: question.question || '暂无问题',
  options: question.options || {
    a: '选项A',
    b: '选项B',
    c: '选项C',
    d: '选项D'
  },
  correctAnswer: question.correct_answer,
  explanation: question.explanation || '暂无解释',
  questionType: question.question_type || question.questionType || '',
  filledQuestion: question.filled_question || question.filledQuestion || '',
  answerText: question.answer_text || question.answerText || ''
});

const groupQuestionsByChapter = (questionRows) => {
  return questionRows.reduce((grouped, question) => {
    if (!grouped[question.category_id]) {
      grouped[question.category_id] = {};
    }
    if (!grouped[question.category_id][question.chapter_id]) {
      grouped[question.category_id][question.chapter_id] = [];
    }
    grouped[question.category_id][question.chapter_id].push(normalizeQuestion(question));
    return grouped;
  }, {});
};

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
};

const loadLocalQuizData = () => {
  const categories = readJson(QUIZ_CATEGORIES_KEY, null);
  const questions = readJson(QUIZ_QUESTIONS_KEY, null);

  if (!categories || !questions) {
    return null;
  }

  return { categories, questions };
};

const loadLocalImportedQuizData = () => {
  const categories = readJson(LOCAL_QUIZ_CATEGORIES_KEY, null);
  const questions = readJson(LOCAL_QUIZ_QUESTIONS_KEY, null);

  if (!categories || !questions) {
    return null;
  }

  return { categories, questions };
};

const saveQuizData = (categoryKey, questionKey, data) => {
  localStorage.setItem(categoryKey, JSON.stringify(data.categories));
  localStorage.setItem(questionKey, JSON.stringify(data.questions));
};

const saveLocalQuizData = (data) => {
  saveQuizData(QUIZ_CATEGORIES_KEY, QUIZ_QUESTIONS_KEY, data);
};

const saveLocalImportedQuizData = (data) => {
  saveQuizData(LOCAL_QUIZ_CATEGORIES_KEY, LOCAL_QUIZ_QUESTIONS_KEY, data);
};

const cloneQuestionGroups = (questions = {}) => {
  return Object.fromEntries(
    Object.entries(questions).map(([categoryId, chapters]) => [
      categoryId,
      Object.fromEntries(
        Object.entries(chapters || {}).map(([chapterId, chapterQuestions]) => [
          chapterId,
          [...(chapterQuestions || [])]
        ])
      )
    ])
  );
};

const ensureQuestionChapter = (questions, categoryId, chapterId) => {
  if (!questions[categoryId]) {
    questions[categoryId] = {};
  }
  if (!questions[categoryId][chapterId]) {
    questions[categoryId][chapterId] = [];
  }
};

const removeQuestionById = (questions, questionId) => {
  Object.values(questions).forEach((chapters) => {
    Object.keys(chapters || {}).forEach((chapterId) => {
      chapters[chapterId] = chapters[chapterId].filter((question) => question?.id !== questionId);
    });
  });
};

const mergeCategories = (baseCategories = [], incomingCategories = []) => {
  const categoriesById = new Map();

  const upsertCategory = (category) => {
    if (!category?.id) return;

    const existing = categoriesById.get(category.id);
    const chaptersById = new Map();

    [...(existing?.chapters || []), ...(category.chapters || [])].forEach((chapter) => {
      if (chapter?.id) {
        chaptersById.set(chapter.id, {
          ...chaptersById.get(chapter.id),
          ...chapter
        });
      }
    });

    categoriesById.set(category.id, {
      ...existing,
      ...category,
      chapters: Array.from(chaptersById.values())
    });
  };

  baseCategories.forEach(upsertCategory);
  incomingCategories.forEach(upsertCategory);

  return Array.from(categoriesById.values());
};

const findQuestionLocation = (data, questionId) => {
  for (const [categoryId, chapters] of Object.entries(data?.questions || {})) {
    for (const [chapterId, chapterQuestions] of Object.entries(chapters || {})) {
      const questionIndex = chapterQuestions.findIndex((question) => question?.id === questionId);

      if (questionIndex >= 0) {
        return {
          categoryId,
          chapterId,
          questionIndex,
          question: chapterQuestions[questionIndex]
        };
      }
    }
  }

  return null;
};

const updateQuestionInData = (data, questionId, createUpdatedQuestion) => {
  const location = findQuestionLocation(data, questionId);
  if (!location) {
    return { data, location: null, updatedQuestion: null };
  }

  const nextData = {
    categories: [...(data.categories || [])],
    questions: cloneQuestionGroups(data.questions)
  };
  const updatedQuestion = createUpdatedQuestion(location.question);

  nextData.questions[location.categoryId][location.chapterId][location.questionIndex] = updatedQuestion;

  return {
    data: nextData,
    location,
    updatedQuestion
  };
};

const getQuestionBankSlice = (data, location, updatedQuestion) => {
  const category = data.categories.find((item) => item.id === location.categoryId);
  const chapter = category?.chapters?.find((item) => item.id === location.chapterId);

  return {
    categories: [
      {
        ...(category || {
          id: location.categoryId,
          name: '本地题库',
          description: '本地导入题库',
          icon: '📝',
          color: '#666666'
        }),
        chapters: [
          chapter || {
            id: location.chapterId,
            name: '本地章节',
            description: '本地导入章节'
          }
        ]
      }
    ],
    questions: {
      [location.categoryId]: {
        [location.chapterId]: [updatedQuestion]
      }
    }
  };
};

export const mergeQuestionBanks = (baseData = EMPTY_QUIZ_DATA, incomingData = EMPTY_QUIZ_DATA) => {
  const questions = cloneQuestionGroups(baseData.questions);

  Object.entries(incomingData.questions || {}).forEach(([categoryId, chapters]) => {
    Object.entries(chapters || {}).forEach(([chapterId, incomingQuestions]) => {
      ensureQuestionChapter(questions, categoryId, chapterId);

      incomingQuestions.forEach((question) => {
        if (!question?.id) return;

        removeQuestionById(questions, question.id);
        questions[categoryId][chapterId].push(question);
      });
    });
  });

  return {
    categories: mergeCategories(baseData.categories, incomingData.categories),
    questions
  };
};

const fetchCloudQuizData = async () => {
  const [categoriesResult, chaptersResult, questionsResult] = await Promise.all([
    supabase
      .from('quiz_categories')
      .select('id, name, description, icon, color, sort_order')
      .order('sort_order', { ascending: true }),
    supabase
      .from('quiz_chapters')
      .select('id, category_id, name, description, sort_order')
      .order('sort_order', { ascending: true }),
    supabase
      .from('quiz_questions')
      .select('id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order')
      .order('sort_order', { ascending: true })
  ]);

  const error = categoriesResult.error || chaptersResult.error || questionsResult.error;
  if (error) {
    throw error;
  }

  const chaptersByCategory = chaptersResult.data.reduce((grouped, chapter) => {
    if (!grouped[chapter.category_id]) {
      grouped[chapter.category_id] = [];
    }
    grouped[chapter.category_id].push({
      id: chapter.id,
      name: chapter.name || '未命名章节',
      description: chapter.description || '暂无描述'
    });
    return grouped;
  }, {});

  const categories = categoriesResult.data.map((category) => ({
    id: category.id,
    name: category.name || '未命名分类',
    description: category.description || '暂无描述',
    icon: category.icon || '📝',
    color: category.color || '#666666',
    chapters: chaptersByCategory[category.id] || []
  }));

  return {
    categories,
    questions: groupQuestionsByChapter(questionsResult.data)
  };
};

const normalizeCorrectAnswerForDb = (correctAnswer) => {
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.length === 1 ? correctAnswer[0] : correctAnswer;
  }

  return correctAnswer;
};

const getCleanQuestionEdits = ({ options, correctAnswer, explanation }) => {
  const cleanOptions = Object.fromEntries(
    Object.entries(options).map(([key, value]) => [key, String(value).trim()])
  );
  const cleanCorrectAnswer = Array.isArray(correctAnswer)
    ? correctAnswer.map((answer) => String(answer).trim()).filter(Boolean)
    : [String(correctAnswer).trim()].filter(Boolean);
  const cleanExplanation = String(explanation || '').trim();

  if (Object.values(cleanOptions).some((value) => !value)) {
    throw new Error('选项内容不能为空');
  }

  if (cleanCorrectAnswer.length === 0) {
    throw new Error('请至少选择一个正确答案');
  }

  return {
    options: cleanOptions,
    correctAnswer: cleanCorrectAnswer,
    explanation: cleanExplanation
  };
};

const applyLocalQuestionEdit = ({ questionId, options, correctAnswer, explanation }) => {
  const localQuizData = loadLocalQuizData();
  const localImportedQuizData = loadLocalImportedQuizData();
  const sourceData = localQuizData || localImportedQuizData;

  if (!sourceData) {
    throw new Error('本地题库为空，请先同步或导入题库');
  }

  const createUpdatedQuestion = (question) => ({
    ...question,
    options,
    correctAnswer: correctAnswer.length === 1 ? correctAnswer[0] : correctAnswer,
    explanation
  });
  const localResult = updateQuestionInData(sourceData, questionId, createUpdatedQuestion);

  if (!localResult.updatedQuestion) {
    throw new Error('题目不存在');
  }

  const localImportedResult = localImportedQuizData
    ? updateQuestionInData(localImportedQuizData, questionId, createUpdatedQuestion)
    : { updatedQuestion: null };
  const updatedImportSlice = localImportedResult.updatedQuestion
    ? localImportedResult.data
    : mergeQuestionBanks(
      localImportedQuizData || EMPTY_QUIZ_DATA,
      getQuestionBankSlice(sourceData, localResult.location, localResult.updatedQuestion)
    );

  saveLocalImportedQuizData(updatedImportSlice);
  quizCache = localQuizData
    ? updateQuestionInData(localQuizData, questionId, createUpdatedQuestion).data
    : mergeQuestionBanks(sourceData, updatedImportSlice);
  saveLocalQuizData(quizCache);

  return localResult.updatedQuestion;
};

const updateLocalImportedQuestionIfPresent = ({ questionId, options, correctAnswer, explanation }) => {
  const localImportedQuizData = loadLocalImportedQuizData();
  if (!localImportedQuizData || !findQuestionLocation(localImportedQuizData, questionId)) {
    return;
  }

  const result = updateQuestionInData(localImportedQuizData, questionId, (question) => ({
    ...question,
    options,
    correctAnswer: correctAnswer.length === 1 ? correctAnswer[0] : correctAnswer,
    explanation
  }));

  saveLocalImportedQuizData(result.data);
};

export const clearLocalQuestionBank = () => {
  localStorage.removeItem(QUIZ_CATEGORIES_KEY);
  localStorage.removeItem(QUIZ_QUESTIONS_KEY);
  localStorage.removeItem(LOCAL_QUIZ_CATEGORIES_KEY);
  localStorage.removeItem(LOCAL_QUIZ_QUESTIONS_KEY);
  quizCache = null;
};

export const replaceLocalQuestionBank = (data) => {
  quizCache = data;
  saveLocalQuizData(data);
  return quizCache;
};

export const mergeLocalQuestionBank = (data) => {
  const localImportedQuizData = mergeQuestionBanks(
    loadLocalImportedQuizData() || EMPTY_QUIZ_DATA,
    data
  );

  saveLocalImportedQuizData(localImportedQuizData);

  quizCache = mergeQuestionBanks(loadLocalQuizData() || EMPTY_QUIZ_DATA, data);
  saveLocalQuizData(quizCache);
  return quizCache;
};

export const uploadLocalQuestionBankToCloud = async (userId) => {
  const questionBank = await loadQuizData();
  const { data, error } = await supabase.rpc('quiz_upsert_question_bank_for_editor', {
    p_user_id: userId,
    p_question_bank: questionBank
  });

  if (error) {
    if (error.message?.includes('schema cache')) {
      throw new Error('云端上传函数尚未生效，请先在 Supabase SQL Editor 执行最新上传题库 RPC 脚本');
    }
    throw new Error(error.message || '云端上传失败');
  }

  return data?.[0] || {
    category_count: 0,
    chapter_count: 0,
    question_count: 0
  };
};

export const loadQuizData = async ({ force = false } = {}) => {
  if (quizCache && !force) {
    return quizCache;
  }

  const localQuizData = loadLocalQuizData();
  if (localQuizData && !force) {
    quizCache = localQuizData;
    return quizCache;
  }

  if (!force) {
    throw new Error('本地题库为空，请在题库管理中手动同步题库');
  }

  const cloudQuizData = await fetchCloudQuizData();
  const localImportedQuizData = loadLocalImportedQuizData();
  quizCache = localImportedQuizData
    ? mergeQuestionBanks(cloudQuizData, localImportedQuizData)
    : localQuizData
      ? mergeQuestionBanks(cloudQuizData, localQuizData)
    : cloudQuizData;

  saveLocalQuizData(quizCache);
  return quizCache;
};

export const getAllCategories = async () => {
  const data = await loadQuizData();
  return data.categories;
};

export const getCategoryById = async (categoryId) => {
  const data = await loadQuizData();
  return data.categories.find((category) => category.id === categoryId) || null;
};

export const getCategoryQuestions = async (categoryId, chapterId = null) => {
  const data = await loadQuizData();
  const categoryQuestions = data.questions[categoryId];

  if (!categoryQuestions) return [];
  if (chapterId) return categoryQuestions[chapterId] || [];

  return Object.values(categoryQuestions).flat();
};

export const getQuestionById = async (categoryId, questionId, chapterId = null) => {
  const questions = await getCategoryQuestions(categoryId, chapterId);
  return questions.find((question) => question.id === questionId) || null;
};

export const updateQuizQuestion = async ({
  userId,
  questionId,
  options,
  correctAnswer,
  explanation
}) => {
  const {
    options: cleanOptions,
    correctAnswer: cleanCorrectAnswer,
    explanation: cleanExplanation
  } = getCleanQuestionEdits({ options, correctAnswer, explanation });

  const { data, error } = await supabase.rpc('quiz_update_question_for_editor', {
    p_user_id: userId,
    p_question_id: questionId,
    p_options: cleanOptions,
    p_correct_answer: normalizeCorrectAnswerForDb(cleanCorrectAnswer),
    p_explanation: cleanExplanation
  });

  if (error) {
    if (error.message?.includes('题目不存在')) {
      return applyLocalQuestionEdit({
        questionId,
        options: cleanOptions,
        correctAnswer: cleanCorrectAnswer,
        explanation: cleanExplanation
      });
    }

    throw new Error(error.message || '云端保存失败');
  }

  const updatedRow = data?.[0];
  const updatedQuestion = normalizeQuestion(updatedRow);
  if (!updatedQuestion?.id) {
    throw new Error('云端保存失败：没有返回更新后的题目');
  }

  const quizData = await loadQuizData();
  const chapterQuestions = quizData.questions?.[updatedRow.category_id]?.[updatedRow.chapter_id] || [];
  const questionIndex = chapterQuestions.findIndex((question) => question.id === updatedQuestion.id);

  if (questionIndex >= 0) {
    chapterQuestions[questionIndex] = updatedQuestion;
    quizCache = { ...quizData };
    saveLocalQuizData(quizCache);
  }

  updateLocalImportedQuestionIfPresent({
    questionId,
    options: cleanOptions,
    correctAnswer: cleanCorrectAnswer,
    explanation: cleanExplanation
  });

  return updatedQuestion;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomUnansweredQuestion = async (categoryId, answeredIds, chapterId = null) => {
  const categoryQuestions = await getCategoryQuestions(categoryId, chapterId);
  const unansweredQuestions = categoryQuestions.filter(
    (question) => !answeredIds.includes(question.id)
  );

  if (unansweredQuestions.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
  return unansweredQuestions[randomIndex];
};
