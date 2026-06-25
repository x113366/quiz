import axios from 'axios';

const API_KEY = '01a2da26-35c5-454f-ad42-24d138505bb7';
const API_URL = '/api/v3/chat/completions';

export async function translateText(text) {
  try {
    console.log('开始翻译请求...');
    const response = await axios.post(
      API_URL,
      {
        model: 'doubao-seed-1-8-251228',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的医学翻译助手，请将英文医学文本直接翻译成中文，保持原意准确，语言专业，不需要任何解释，快速完成翻译。'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    console.log('翻译响应:', response.data);
    if (response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      return response.data.choices[0].message.content;
    }
    return '翻译结果获取失败';

  } catch (error) {
    console.error('翻译请求失败:', error);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
    return '翻译暂时不可用，请稍后重试。';
  }
}
