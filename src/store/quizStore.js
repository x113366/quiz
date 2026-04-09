import { questions as originalQuestions, categories as originalCategories } from '../data/questions';

// 从本地存储获取数据，如果没有则使用原始数据
const getStoredCategories = () => {
  const stored = localStorage.getItem('quizCategories');
  const categories = stored ? JSON.parse(stored) : originalCategories;
  
  // 为分类添加默认值
  return categories.map(category => ({
    id: category.id || `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: category.name || '未命名分类',
    description: category.description || '暂无描述',
    icon: category.icon || '📝',
    color: category.color || '#666666',
    ...category
  }));
};

const getStoredQuestions = () => {
  const stored = localStorage.getItem('quizQuestions');
  const questions = stored ? JSON.parse(stored) : originalQuestions;
  
  // 为题目添加默认值
  Object.keys(questions).forEach(categoryId => {
    questions[categoryId] = questions[categoryId].map((question, index) => ({
      id: question.id || `${categoryId}_${index + 1}`,
      question: question.question || '暂无问题',
      options: question.options || {
        a: '选项A',
        b: '选项B',
        c: '选项C',
        d: '选项D'
      },
      correctAnswer: question.correctAnswer || Object.keys(question.options || {a: '选项A'})[0],
      explanation: question.explanation || '暂无解释',
      ...question
    }));
  });
  
  return questions;
};

// 获取分类的所有题目
export const getCategoryQuestions = (categoryId) => {
  const questions = getStoredQuestions();
  return questions[categoryId] || [];
};

// 获取单个题目
export const getQuestionById = (categoryId, questionId) => {
  const questions = getStoredQuestions();
  const categoryQuestions = questions[categoryId];
  const question = categoryQuestions?.find(q => q.id === questionId);
  
  // 为单个题目添加默认值
  if (question) {
    return {
      id: question.id || `${categoryId}_${Date.now()}`,
      question: question.question || '暂无问题',
      options: question.options || {
        a: '选项A',
        b: '选项B',
        c: '选项C',
        d: '选项D'
      },
      correctAnswer: question.correctAnswer || Object.keys(question.options || {a: '选项A'})[0],
      explanation: question.explanation || '暂无解释',
      ...question
    };
  }
  
  return null;
};

// 获取所有分类
export const getAllCategories = () => getStoredCategories();

// 获取单个分类
export const getCategoryById = (categoryId) => {
  const categories = getStoredCategories();
  const category = categories.find(c => c.id === categoryId);
  
  // 为单个分类添加默认值
  if (category) {
    return {
      id: category.id || `category_${Date.now()}`,
      name: category.name || '未命名分类',
      description: category.description || '暂无描述',
      icon: category.icon || '📝',
      color: category.color || '#666666',
      ...category
    };
  }
  
  return null;
};

// 随机打乱数组
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 从未答过的题目中随机选择
export const getRandomUnansweredQuestion = (categoryId, answeredIds) => {
  const questions = getStoredQuestions();
  const categoryQuestions = questions[categoryId];
  if (!categoryQuestions) return null;

  const unansweredQuestions = categoryQuestions.filter(
    q => !answeredIds.includes(q.id)
  );

  if (unansweredQuestions.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
  const question = unansweredQuestions[randomIndex];
  
  // 为随机选择的题目添加默认值
  return {
    id: question.id || `${categoryId}_${Date.now()}`,
    question: question.question || '暂无问题',
    options: question.options || {
      a: '选项A',
      b: '选项B',
      c: '选项C',
      d: '选项D'
    },
    correctAnswer: question.correctAnswer || Object.keys(question.options || {a: '选项A'})[0],
    explanation: question.explanation || '暂无解释',
    ...question
  };
};
