// 测试本地存储内容
console.log('=== 本地存储测试 ===');

// 检查分类
const categories = localStorage.getItem('quizCategories');
console.log('分类数据:', categories ? JSON.parse(categories).length + ' 个分类' : '无');
if (categories) {
  const cats = JSON.parse(categories);
  cats.forEach(cat => {
    console.log('-', cat.name, '(', cat.id, ')');
  });
}

// 检查题目
const questions = localStorage.getItem('quizQuestions');
console.log('\n题目数据:', questions ? Object.keys(JSON.parse(questions)).length + ' 个分类的题目' : '无');
if (questions) {
  const qs = JSON.parse(questions);
  Object.entries(qs).forEach(([categoryId, qList]) => {
    console.log('- 分类', categoryId, ':', qList.length, '题');
  });
}

// 检查答题日志
const quizLog = localStorage.getItem('quizLog');
console.log('\n答题日志:', quizLog ? JSON.parse(quizLog).length + ' 条记录' : '无');

// 检查答题进度
const quizProgress = localStorage.getItem('quizProgress');
console.log('\n答题进度:', quizProgress ? '有' : '无');

// 检查错题本
const wrongBook = localStorage.getItem('wrongBook');
console.log('\n错题本:', wrongBook ? Object.keys(JSON.parse(wrongBook)).length + ' 道错题' : '无');

console.log('\n=== 测试完成 ===');
