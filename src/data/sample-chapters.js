// 分章节题库示例
// 格式：包含章节的JS文件

// 分类数据
const categories = [
  {
    id: 'medicine',
    name: '医学基础',
    description: '医学基础知识题库',
    icon: '⚕️',
    color: '#4CAF50',
    chapters: [
      {
        id: 'anatomy',
        name: '解剖学',
        description: '人体解剖学基础'
      },
      {
        id: 'physiology',
        name: '生理学',
        description: '人体生理功能'
      },
      {
        id: 'pathology',
        name: '病理学',
        description: '疾病病理变化'
      }
    ]
  }
];

// 题目数据
const questions = {
  'medicine': {
    'anatomy': [
      {
        id: 'anatomy1',
        question: '人体最大的器官是？',
        options: {
          a: '肝脏',
          b: '皮肤',
          c: '心脏',
          d: '肺'
        },
        correctAnswer: 'b',
        explanation: '皮肤是人体最大的器官，覆盖全身，具有保护、调节体温等功能。'
      },
      {
        id: 'anatomy2',
        question: '下列哪项不是骨骼的功能？',
        options: {
          a: '支持',
          b: '保护',
          c: '造血',
          d: '消化'
        },
        correctAnswer: 'd',
        explanation: '骨骼的主要功能包括支持、保护、造血和运动，不包括消化功能。'
      }
    ],
    'physiology': [
      {
        id: 'physiology1',
        question: '正常人体的体温范围是？',
        options: {
          a: '35-36°C',
          b: '36-37.5°C',
          c: '37.5-38.5°C',
          d: '38.5-39.5°C'
        },
        correctAnswer: 'b',
        explanation: '正常人体的体温范围是36-37.5°C，超过37.5°C属于发热。'
      }
    ],
    'pathology': [
      {
        id: 'pathology1',
        question: '炎症的基本病理变化不包括？',
        options: {
          a: '变质',
          b: '渗出',
          c: '增生',
          d: '坏死'
        },
        correctAnswer: 'd',
        explanation: '炎症的基本病理变化包括变质、渗出和增生，坏死是一种病理过程，但不是炎症的基本病理变化。'
      },
      {
        id: 'pathology2',
        question: '下列哪种细胞是炎症反应中的主要吞噬细胞？',
        options: {
          a: '淋巴细胞',
          b: '单核细胞',
          c: '中性粒细胞',
          d: '嗜酸性粒细胞'
        },
        correctAnswer: 'c',
        explanation: '中性粒细胞是炎症反应中的主要吞噬细胞，能够吞噬和清除病原体。'
      }
    ]
  }
};

export { categories, questions };