import axios from 'axios';

const API_KEY = '01a2da26-35c5-454f-ad42-24d138505bb7';
const API_URL = '/api/v3/chat/completions';

export async function getExplanation(question, userAnswer, correctAnswer) {
  try {
    console.log('开始AI讲解请求...');
    const response = await axios.post(
      API_URL,
      {
        model: 'doubao-seed-1-8-251228',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的教育辅导助手，擅长讲解各种学科的题目。请按照以下要求回答：1. 对每个选项简单说明选择或不选择的原因，直接给出结论；2. 最后给出一个简洁的总结，不要长篇大论；3. 保持回答清晰、条理，避免使用复杂的格式和符号，确保显示效果良好。'
          },
          {
            role: 'user',
            content: `题目：${question.question}\n选项：${Object.entries(question.options).map(([key, value]) => `${key}: ${value}`).join('\n')}\n用户答案：${userAnswer.map(key => question.options[key]).join(', ')}\n正确答案：${correctAnswer.map(key => question.options[key]).join(', ')}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    console.log('AI讲解响应:', response.data);
    if (response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      return response.data.choices[0].message.content;
    }
    return 'AI讲解结果获取失败';

  } catch (error) {
    console.error('AI讲解请求失败:', error);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
    return 'AI讲解暂时不可用，请稍后重试。';
  }
}
