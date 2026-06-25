const formatAnswerText = (question, answers) => {
  const answerList = Array.isArray(answers) ? answers : [answers];
  const questionOptions = question.options || {};

  return answerList
    .filter(Boolean)
    .map((key) => (questionOptions[key] ? `${key}: ${questionOptions[key]}` : String(key)))
    .join(', ');
};

export async function copyQuestionToClipboard(question, options = {}) {
  try {
    if (!question) {
      throw new Error('题目信息不存在');
    }

    const { selectedAnswers = [], includeSelectedAnswer = false } = options;

    // 构建要复制的内容
    let content = `题目：${question.question}\n\n`;
    
    const questionOptions = question.options || {};
    const isFillBlank = question.questionType === 'fill_blank';

    // 添加选项
    if (!isFillBlank && Object.keys(questionOptions).length > 0) {
      content += '选项：\n';
      Object.entries(questionOptions).forEach(([key, value]) => {
        content += `${key}: ${value}\n`;
      });
    }
    
    // 添加正确答案
    if (!isFillBlank && question.correctAnswer) {
      content += `\n正确答案：${formatAnswerText(question, question.correctAnswer)}`;
    }

    if (includeSelectedAnswer && selectedAnswers.length > 0) {
      content += `\n我选的选项：${formatAnswerText(question, selectedAnswers)}`;
    }

    if (isFillBlank) {
      const fillAnswer = question.answerText || question.correctAnswer;
      if (fillAnswer) {
        content += `\n正确答案：${fillAnswer}`;
      }
    }
    
    // 添加解析
    if (question.explanation) {
      content += `\n\n解析：${question.explanation}`;
    }

    // 复制到剪贴板
    await navigator.clipboard.writeText(content);
    return { success: true, message: '题目和答案已复制到剪贴板' };

  } catch (error) {
    console.error('复制到剪贴板失败:', error);
    return { success: false, message: '复制失败，请手动复制' };
  }
}
