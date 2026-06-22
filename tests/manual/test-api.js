// API测试脚本
// 测试豆包AI API是否能正常调用

import axios from 'axios';

const API_KEY = '01a2da26-35c5-454f-ad42-24d138505bb7';
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

async function testTranslation() {
  console.log('\n=== 测试翻译功能 ===');
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'doubao-seed-1-8-251228',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的翻译助手，请将英文文本翻译成中文，保持原意准确，语言流畅自然。'
          },
          {
            role: 'user',
            content: '请翻译以下文本：JavaScript is a programming language that is commonly used in web development.'
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
    
    if (response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      console.log('翻译请求成功！');
      console.log('原文：JavaScript is a programming language that is commonly used in web development.');
      console.log('翻译结果：', response.data.choices[0].message.content);
    } else {
      console.log('翻译请求失败：无法获取翻译结果');
    }
  } catch (error) {
    console.error('翻译请求失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  }
}

async function testAIExplanation() {
  console.log('\n=== 测试AI讲解功能 ===');
  try {
    const question = {
      question: '以下哪种不是JavaScript的数据类型？',
      options: {
        a: 'String',
        b: 'Number',
        c: 'Boolean',
        d: 'Character'
      }
    };
    
    const response = await axios.post(
      API_URL,
      {
        model: 'doubao-seed-1-8-251228',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的教育辅导助手，擅长讲解各种学科的题目。请详细解释这道题的正确解法，分析错误答案的问题所在，并提供相关知识点的总结。'
          },
          {
            role: 'user',
            content: `题目：${question.question}\n选项：${Object.entries(question.options).map(([key, value]) => `${key}: ${value}`).join('\n')}\n用户答案：d\n正确答案：d`
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
    
    if (response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      console.log('AI讲解请求成功！');
      console.log('讲解结果：', response.data.choices[0].message.content);
    } else {
      console.log('AI讲解请求失败：无法获取讲解结果');
    }
  } catch (error) {
    console.error('AI讲解请求失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  }
}

async function runTests() {
  console.log('开始测试API调用...');
  console.log('API密钥:', API_KEY);
  console.log('API地址:', API_URL);
  
  await testTranslation();
  await testAIExplanation();
  
  console.log('\n=== 测试完成 ===');
}

runTests();
