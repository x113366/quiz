import * as XLSX from 'xlsx';
import fs from 'fs';

// 模拟浏览器环境的 localStorage
class LocalStorage {
  constructor() {
    this.store = {};
  }
  
  getItem(key) {
    return this.store[key] || null;
  }
  
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  
  clear() {
    this.store = {};
  }
}

const localStorage = new LocalStorage();

// 模拟现有的分类和题目
const existingCategories = [
  {
    id: 'existing_cat',
    name: '现有分类',
    description: '现有分类描述',
    icon: '📝',
    color: '#666666'
  }
];

const existingQuestions = {
  existing_cat: [
    {
      id: 'existing_q1',
      question: '现有题目',
      options: { a: '选项A', b: '选项B' },
      correctAnswer: 'a',
      explanation: '现有解释'
    }
  ]
};

// 保存现有数据到本地存储
localStorage.setItem('quizCategories', JSON.stringify(existingCategories));
localStorage.setItem('quizQuestions', JSON.stringify(existingQuestions));

console.log('=== 测试导入流程 ===');
console.log('初始状态:');
console.log('分类数量:', JSON.parse(localStorage.getItem('quizCategories')).length);
console.log('题目数量:', Object.keys(JSON.parse(localStorage.getItem('quizQuestions'))).length);

// 读取 Excel 文件
const data = fs.readFileSync(new URL('../../examples/example-quiz.xlsx', import.meta.url));
const workbook = XLSX.read(data, { type: 'buffer' });

// 解析 Excel 数据
const categoriesSheet = workbook.Sheets[workbook.SheetNames[0]];
const categoriesData = XLSX.utils.sheet_to_json(categoriesSheet);

const categories = categoriesData.map((item, index) => ({
  id: item.id || `category_${Date.now()}_${index}`,
  name: item.name || item.分类名称 || `分类${index + 1}`,
  description: item.description || item.描述 || '暂无描述',
  icon: item.icon || item.图标 || '📝',
  color: item.color || item.颜色 || '#666666'
}));

const questions = {};

for (let i = 1; i < workbook.SheetNames.length; i++) {
  const sheetName = workbook.SheetNames[i];
  const sheet = workbook.Sheets[sheetName];
  const sheetData = XLSX.utils.sheet_to_json(sheet);
  
  let categoryId = categories.find(cat => 
    cat.name === sheetName || 
    cat.id === sheetName
  )?.id;
  
  if (!categoryId) {
    categoryId = `category_${Date.now()}_${i}`;
    categories.push({
      id: categoryId,
      name: sheetName,
      description: '从Excel导入的分类',
      icon: '📝',
      color: '#666666'
    });
  }
  
  const categoryQuestions = sheetData.map((item, index) => {
    const options = {};
    for (let j = 1; j <= 10; j++) {
      const optionKey = String.fromCharCode(96 + j);
      const optionValue = item[`选项${optionKey.toUpperCase()}`] || item[`选项${j}`];
      if (optionValue) {
        options[optionKey] = optionValue;
      }
    }
    
    let correctAnswer = item.correctAnswer || item.正确答案 || item.答案;
    if (typeof correctAnswer === 'string') {
      correctAnswer = correctAnswer.split(',').map(a => a.trim());
      if (correctAnswer.length === 1) {
        correctAnswer = correctAnswer[0];
      }
    }
    
    return {
      id: item.id || `${categoryId}_${index + 1}`,
      question: item.question || item.题目 || '暂无问题',
      options: options,
      correctAnswer: correctAnswer || Object.keys(options)[0],
      explanation: item.explanation || item.解析 || item.解释 || '暂无解释'
    };
  });
  
  questions[categoryId] = categoryQuestions;
}

// 合并数据
const updatedCategories = [...JSON.parse(localStorage.getItem('quizCategories'))];
const updatedQuestions = { ...JSON.parse(localStorage.getItem('quizQuestions')) };

// 处理新分类
categories.forEach(newCategory => {
  const processedCategory = {
    id: newCategory.id || `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: newCategory.name || '未命名分类',
    description: newCategory.description || '暂无描述',
    icon: newCategory.icon || '📝',
    color: newCategory.color || '#666666',
    ...newCategory
  };

  const existingIndex = updatedCategories.findIndex(cat => cat.id === processedCategory.id);
  if (existingIndex === -1) {
    updatedCategories.push(processedCategory);
  } else {
    updatedCategories[existingIndex] = processedCategory;
  }
});

// 处理新题目
Object.keys(questions).forEach(categoryId => {
  updatedQuestions[categoryId] = questions[categoryId].map((question, index) => ({
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

// 保存到本地存储
localStorage.setItem('quizCategories', JSON.stringify(updatedCategories));
localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));

console.log('\n导入后状态:');
console.log('分类数量:', updatedCategories.length);
console.log('分类列表:', updatedCategories.map(cat => cat.name));
console.log('题目数量:', Object.keys(updatedQuestions).length);
Object.entries(updatedQuestions).forEach(([categoryId, qs]) => {
  const categoryName = updatedCategories.find(cat => cat.id === categoryId)?.name || categoryId;
  console.log(`- ${categoryName}: ${qs.length} 题`);
});

// 验证数据
console.log('\n=== 验证数据 ===');
const savedCategories = JSON.parse(localStorage.getItem('quizCategories'));
const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions'));

console.log('本地存储中的分类:', savedCategories.map(cat => cat.name));
console.log('本地存储中的题目:', Object.keys(savedQuestions).length);
