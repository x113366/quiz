// 题库示例代码
// 格式：JS文件，包含categories和questions两个变量

// 分类数据
const categories = [
  {
    id: 'js',
    name: 'JavaScript',
    description: 'JavaScript基础知识',
    icon: '💻',
    color: '#f7df1e'
  },
  {
    id: 'html',
    name: 'HTML/CSS',
    description: 'HTML和CSS相关知识',
    icon: '📄',
    color: '#e34f26'
  },
  {
    id: 'react',
    name: 'React',
    description: 'React框架相关知识',
    icon: '⚛️',
    color: '#61dafb'
  }
];

// 题目数据
const questions = {
  'js': [
    {
      id: 'js1',
      question: 'JavaScript中，以下哪种方法可以将字符串转换为数字？',
      options: {
        a: 'parseInt()',
        b: 'toString()',
        c: 'String()',
        d: 'Number()'
      },
      correctAnswer: ['a', 'd'],
      explanation: 'parseInt()和Number()都可以将字符串转换为数字，toString()是将其他类型转换为字符串，String()是创建字符串对象。'
    },
    {
      id: 'js2',
      question: '以下哪种不是JavaScript的数据类型？',
      options: {
        a: 'String',
        b: 'Number',
        c: 'Boolean',
        d: 'Character'
      },
      correctAnswer: 'd',
      explanation: 'JavaScript的数据类型包括String、Number、Boolean、Null、Undefined、Object、Symbol等，没有Character类型。'
    }
  ],
  'html': [
    {
      id: 'html1',
      question: 'HTML5中，哪个标签用于定义文档的主要内容？',
      options: {
        a: '<main>',
        b: '<section>',
        c: '<article>',
        d: '<content>'
      },
      correctAnswer: 'a',
      explanation: '<main>标签用于定义文档的主要内容，<section>用于定义文档中的节，<article>用于定义独立的内容。'
    }
  ],
  'react': [
    {
      id: 'react1',
      question: 'React中，以下哪个Hook用于在组件挂载和卸载时执行副作用？',
      options: {
        a: 'useState',
        b: 'useEffect',
        c: 'useContext',
        d: 'useReducer'
      },
      correctAnswer: 'b',
      explanation: 'useEffect Hook用于在组件挂载、更新和卸载时执行副作用操作，useState用于管理状态，useContext用于访问上下文，useReducer用于复杂状态管理。'
    }
  ]
};

// 导出数据（可选，两种格式都支持）
// 格式1：直接定义变量
// 格式2：导出变量
export { categories, questions };
