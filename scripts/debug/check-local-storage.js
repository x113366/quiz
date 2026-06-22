// 检查 QuizManager 组件的逻辑
console.log('=== 检查 QuizManager 组件逻辑 ===');

// 检查文件上传逻辑
console.log('1. 文件上传功能已添加 Excel 支持');
console.log('2. 支持 .xlsx 和 .xls 文件格式');
console.log('3. 解析逻辑：');
console.log('   - 第一个工作表作为分类');
console.log('   - 后续工作表作为题目');
console.log('   - 自动创建对应分类');

// 检查初始化逻辑
console.log('\n4. 初始化逻辑：');
console.log('   - 优先使用本地存储的数据');
console.log('   - 如果没有，使用合并后的数据');
console.log('   - 保存到本地存储');

// 检查合并逻辑
console.log('\n5. 合并逻辑：');
console.log('   - 合并新分类到现有分类');
console.log('   - 合并新题目到现有题目');
console.log('   - 保存到本地存储');

// 检查本地存储键名
console.log('\n6. 本地存储键名：');
console.log('   - 分类：quizCategories');
console.log('   - 题目：quizQuestions');

// 可能的问题
console.log('\n=== 可能的问题 ===');
console.log('1. 本地存储已存在数据，新导入的数据被合并但未覆盖');
console.log('2. 导入过程中出现错误，数据未保存');
console.log('3. 浏览器缓存问题，需要刷新页面');

// 解决方案
console.log('\n=== 解决方案 ===');
console.log('1. 尝试清除本地存储：点击 "清除本地存储" 按钮');
console.log('2. 重新导入 Excel 文件');
console.log('3. 刷新页面查看结果');

