import * as XLSX from 'xlsx';
import fs from 'fs';

// 读取 Excel 文件
const data = fs.readFileSync(new URL('../../examples/example-quiz.xlsx', import.meta.url));
const workbook = XLSX.read(data, { type: 'buffer' });

console.log('=== Excel 解析测试 ===');
console.log('工作表数量:', workbook.SheetNames.length);
console.log('工作表名称:', workbook.SheetNames);

// 解析分类
console.log('\n=== 解析分类 ===');
const categoriesSheet = workbook.Sheets[workbook.SheetNames[0]];
const categoriesData = XLSX.utils.sheet_to_json(categoriesSheet);
console.log('分类数据:', categoriesData);

// 解析题目
console.log('\n=== 解析题目 ===');
for (let i = 1; i < workbook.SheetNames.length; i++) {
  const sheetName = workbook.SheetNames[i];
  console.log(`\n工作表: ${sheetName}`);
  const sheet = workbook.Sheets[sheetName];
  const sheetData = XLSX.utils.sheet_to_json(sheet);
  console.log('题目数量:', sheetData.length);
  console.log('第一题:', sheetData[0]);
}

// 模拟完整解析过程
console.log('\n=== 完整解析过程 ===');
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

console.log('\n=== 解析结果 ===');
console.log('分类:', categories);
console.log('题目:', questions);
