// 合并后的总题库

// 分类数据
const categories = [
  {
    id: 'virus',
    name: '病毒',
    description: '病毒学专门题库',
    icon: '🦠',
    color: '#2E7D32',
    chapters: [
      {
        id: 'hepatitis_virus',
        name: '肝炎病毒',
        description: '肝炎病毒相关题目'
      }
    ]
  }
];

// 题目数据
const questions = {
  'virus': {
    'hepatitis_virus': [
      {
        id: 'hepatitis_virus_1',
        question: "下列哪一种肝炎病毒属于DNA病毒？",
        options: {
          'a': "HAV",
          'b': "HBV",
          'c': "HCV",
          'd': "HEV",
        },
        correctAnswer: 'b',
        explanation: "HBV是五型肝炎病毒里唯一的DNA病毒，为“部分双链环状DNA”。其余HAV、HCV、HDV、HEV均为RNA病毒。"
      },
      {
        id: 'hepatitis_virus_2',
        question: "下列哪组肝炎病毒均通过粪-口途径传播？",
        options: {
          'a': "HBV、HCV",
          'b': "HAV、HEV",
          'c': "HBV、HDV",
          'd': "HCV、HEV",
        },
        correctAnswer: 'b',
        explanation: "HAV和HEV都经粪-口传播，特点是无包膜、急性感染、不慢性化。"
      },
      {
        id: 'hepatitis_virus_3',
        question: "HAV的核酸类型是：",
        options: {
          'a': "双链DNA",
          'b': "单负链RNA",
          'c': "单正链RNA",
          'd': "环形RNA",
        },
        correctAnswer: 'c',
        explanation: "HAV为单正链RNA病毒。 记忆：HAV、HCV、HEV都是“+RNA”。"
      },
      {
        id: 'hepatitis_virus_4',
        question: "下列哪种肝炎病毒属于缺陷病毒？",
        options: {
          'a': "HAV",
          'b': "HBV",
          'c': "HCV",
          'd': "HDV",
        },
        correctAnswer: 'd',
        explanation: "HDV是缺陷病毒，必须依赖HBV提供HBsAg才能复制和装配。"
      },
      {
        id: 'hepatitis_virus_5',
        question: "下列关于HAV的描述，正确的是：",
        options: {
          'a': "有包膜",
          'b': "易形成慢性感染",
          'c': "仅有一个血清型",
          'd': "主要经血液传播",
        },
        correctAnswer: 'c',
        explanation: "HAV只有一个血清型，因此疫苗保护效果稳定。HAV无包膜，经粪-口传播，不慢性化。"
      },
      {
        id: 'hepatitis_virus_6',
        question: "HAV对下列哪种环境耐受性较强？",
        options: {
          'a': "高温",
          'b': "强碱",
          'c': "酸性环境",
          'd': "紫外线",
        },
        correctAnswer: 'c',
        explanation: "HAV耐酸，pH1环境仍可存活，因此适合经胃肠道传播。"
      },
      {
        id: 'hepatitis_virus_7',
        question: "HAV感染后最主要的传播媒介是：",
        options: {
          'a': "血液",
          'b': "精液",
          'c': "粪便污染的水和食物",
          'd': "飞沫",
        },
        correctAnswer: 'c',
        explanation: "HAV主要通过被粪便污染的水、食物传播，尤其贝类海产品。"
      },
      {
        id: 'hepatitis_virus_8',
        question: "HAV感染后最具有诊断意义的抗体是：",
        options: {
          'a': "抗-HAV IgG",
          'b': "抗-HAV IgM",
          'c': "抗-HBs",
          'd': "抗-HBc",
        },
        correctAnswer: 'b',
        explanation: "抗-HAV IgM提示近期急性感染。IgG提示既往感染或免疫。"
      },
      {
        id: 'hepatitis_virus_9',
        question: "HAV最主要的致病机制是：",
        options: {
          'a': "病毒直接溶解肝细胞",
          'b': "细菌毒素损伤",
          'c': "免疫损伤",
          'd': "血栓形成",
        },
        correctAnswer: 'c',
        explanation: "HAV肝损伤主要由免疫反应导致，而不是病毒直接细胞毒作用。"
      },
      {
        id: 'hepatitis_virus_10',
        question: "关于HAV感染特点，错误的是：",
        options: {
          'a': "可出现隐性感染",
          'b': "可形成慢性携带状态",
          'c': "感染后可获得终身免疫",
          'd': "多数预后良好",
        },
        correctAnswer: 'b',
        explanation: "HAV不会形成慢性感染或慢性携带状态。"
      },
      {
        id: 'hepatitis_virus_11',
        question: "HEV感染最危险的人群是：",
        options: {
          'a': "儿童",
          'b': "老年男性",
          'c': "孕妇",
          'd': "糖尿病患者",
        },
        correctAnswer: 'c',
        explanation: "HEV对孕妇尤其危险，死亡率可高达20%。"
      },
      {
        id: 'hepatitis_virus_12',
        question: "HEV的主要传播途径是：",
        options: {
          'a': "血液传播",
          'b': "虫媒传播",
          'c': "粪-口传播",
          'd': "性传播",
        },
        correctAnswer: 'c',
        explanation: "HEV与HAV一样，经粪-口传播。"
      },
      {
        id: 'hepatitis_virus_13',
        question: "下列关于HBV结构的描述，正确的是：",
        options: {
          'a': "无包膜RNA病毒",
          'b': "有包膜DNA病毒",
          'c': "有包膜单负链RNA病毒",
          'd': "无包膜DNA病毒",
        },
        correctAnswer: 'b',
        explanation: "HBV是有包膜DNA病毒。"
      },
      {
        id: 'hepatitis_virus_14',
        question: "HBV完整具有感染性的病毒颗粒称为：",
        options: {
          'a': "Delta颗粒",
          'b': "Dane颗粒",
          'c': "小球形颗粒",
          'd': "管状颗粒",
        },
        correctAnswer: 'b',
        explanation: "Dane颗粒是完整有感染性的HBV颗粒，直径约42nm。"
      },
      {
        id: 'hepatitis_virus_15',
        question: "HBV小球形颗粒的特点是：",
        options: {
          'a': "含完整DNA",
          'b': "有感染性",
          'c': "仅由HBsAg组成",
          'd': "含HBcAg",
        },
        correctAnswer: 'c',
        explanation: "小球形颗粒和管状颗粒主要由HBsAg组成，无核心、无感染性。"
      },
      {
        id: 'hepatitis_virus_16',
        question: "HBV复制过程中最关键的酶是：",
        options: {
          'a': "RNA聚合酶",
          'b': "DNA连接酶",
          'c': "逆转录酶",
          'd': "蛋白酶",
        },
        correctAnswer: 'c',
        explanation: "HBV DNA聚合酶具有逆转录酶活性，是复制关键。"
      },
      {
        id: 'hepatitis_virus_17',
        question: "HBV进入肝细胞依赖的受体是：",
        options: {
          'a': "CD4",
          'b': "ACE2",
          'c': "NTCP",
          'd': "CCR5",
        },
        correctAnswer: 'c',
        explanation: "HBV通过NTCP受体进入肝细胞。"
      },
      {
        id: 'hepatitis_virus_18',
        question: "HBV复制过程中形成稳定存在模板的是：",
        options: {
          'a': "pgRNA",
          'b': "HBsAg",
          'c': "cccDNA",
          'd': "HBeAg",
        },
        correctAnswer: 'c',
        explanation: "cccDNA是HBV在细胞核内形成的稳定模板，是慢性感染难清除的重要原因。"
      },
      {
        id: 'hepatitis_virus_19',
        question: "HBV的前基因组RNA（pgRNA）主要作用是：",
        options: {
          'a': "编码脂多糖",
          'b': "作为逆转录模板",
          'c': "抑制补体",
          'd': "激活溶酶体",
        },
        correctAnswer: 'b',
        explanation: "pgRNA既是mRNA，也是逆转录生成DNA的模板。"
      },
      {
        id: 'hepatitis_virus_20',
        question: "HBV病毒DNA复制的直接模板是：",
        options: {
          'a': "cccDNA",
          'b': "pgRNA",
          'c': "HBsAg",
          'd': "HBcAg",
        },
        correctAnswer: 'b',
        explanation: "HBV DNA复制直接以pgRNA为模板进行逆转录。"
      },
      {
        id: 'hepatitis_virus_21',
        question: "下列哪项提示HBV复制活跃、传染性强？",
        options: {
          'a': "抗-HBs阳性",
          'b': "抗-HBe阳性",
          'c': "HBeAg阳性",
          'd': "抗-HBc IgG阳性",
        },
        correctAnswer: 'c',
        explanation: "HBeAg阳性提示病毒复制活跃、传染性强。"
      },
      {
        id: 'hepatitis_virus_22',
        question: "下列哪项提示机体已具有乙肝免疫力？",
        options: {
          'a': "HBsAg阳性",
          'b': "抗-HBs阳性",
          'c': "HBeAg阳性",
          'd': "HBV DNA阳性",
        },
        correctAnswer: 'b',
        explanation: "抗-HBs阳性说明机体已有保护性免疫。"
      },
      {
        id: 'hepatitis_virus_23',
        question: "HBV窗口期最重要的检测指标是：",
        options: {
          'a': "HBsAg",
          'b': "抗-HBs",
          'c': "抗-HBc IgM",
          'd': "HBeAg",
        },
        correctAnswer: 'c',
        explanation: "窗口期只有抗-HBc IgM能检测到。 窗口期特点：HBsAg消失，但抗-HBs尚未出现。"
      },
      {
        id: 'hepatitis_virus_24',
        question: "HBV相关肾炎主要属于：",
        options: {
          'a': "I型变态反应",
          'b': "II型变态反应",
          'c': "III型变态反应",
          'd': "IV型变态反应",
        },
        correctAnswer: 'c',
        explanation: "HBV相关肾炎属于III型变态反应，即免疫复合物沉积。"
      },
      {
        id: 'hepatitis_virus_25',
        question: "HBV感染导致肝细胞损伤最主要依赖：",
        options: {
          'a': "病毒毒素",
          'b': "CTL细胞免疫",
          'c': "中性粒细胞",
          'd': "补体直接裂解",
        },
        correctAnswer: 'b',
        explanation: "HBV主要通过CTL介导的细胞免疫损伤肝细胞。"
      },
      {
        id: 'hepatitis_virus_26',
        question: "新生儿感染HBV后容易慢性化，主要因为：",
        options: {
          'a': "病毒毒力增强",
          'b': "肝脏代谢弱",
          'c': "免疫耐受",
          'd': "补体缺乏",
        },
        correctAnswer: 'c',
        explanation: "新生儿免疫系统不成熟，容易形成免疫耐受，因此慢性化率极高。"
      },
      {
        id: 'hepatitis_virus_27',
        question: "HBV疫苗属于：",
        options: {
          'a': "灭活疫苗",
          'b': "减毒活疫苗",
          'c': "基因工程疫苗",
          'd': "核酸疫苗",
        },
        correctAnswer: 'c',
        explanation: "乙肝疫苗是酵母重组基因工程疫苗。"
      },
      {
        id: 'hepatitis_virus_28',
        question: "医护人员HBV暴露后紧急预防应使用：",
        options: {
          'a': "青霉素",
          'b': "干扰素",
          'c': "HBIG",
          'd': "阿昔洛韦",
        },
        correctAnswer: 'c',
        explanation: "HBIG（乙肝高效价免疫球蛋白）用于暴露后紧急预防。"
      },
      {
        id: 'hepatitis_virus_29',
        question: "HCV属于：",
        options: {
          'a': "无包膜DNA病毒",
          'b': "有包膜RNA病毒",
          'c': "双链RNA病毒",
          'd': "缺陷病毒",
        },
        correctAnswer: 'b',
        explanation: "HCV属于有包膜单正链RNA病毒，黄病毒科。"
      },
      {
        id: 'hepatitis_virus_30',
        question: "HCV最主要的传播途径是：",
        options: {
          'a': "呼吸道传播",
          'b': "粪-口传播",
          'c': "血液传播",
          'd': "虫媒传播",
        },
        correctAnswer: 'c',
        explanation: "HCV主要通过血液传播。"
      },
      {
        id: 'hepatitis_virus_31',
        question: "HCV感染后最常见的结局是：",
        options: {
          'a': "完全清除",
          'b': "急性暴发性肝炎",
          'c': "慢性感染",
          'd': "终身隐性感染但无肝损伤",
        },
        correctAnswer: 'c',
        explanation: "HCV最容易慢性化，约70%转为持续性感染。"
      },
      {
        id: 'hepatitis_virus_32',
        question: "HCV实验室确诊的金标准是：",
        options: {
          'a': "ELISA检测抗体",
          'b': "RT-PCR检测RNA",
          'c': "肝酶检测",
          'd': "血常规",
        },
        correctAnswer: 'b',
        explanation: "RT-PCR检测HCV RNA是确诊金标准。"
      },
      {
        id: 'hepatitis_virus_33',
        question: "HCV窗口期时最容易出现的结果是：",
        options: {
          'a': "RNA阴性、抗体阳性",
          'b': "RNA阳性、抗体阴性",
          'c': "RNA阴性、抗体阴性",
          'd': "RNA阳性、HBsAg阳性",
        },
        correctAnswer: 'b',
        explanation: "HCV窗口期特点：RNA已阳性，但抗体尚未出现，因此ELISA可能漏检。"
      },
      {
        id: 'hepatitis_virus_34',
        question: "HDV必须依赖哪种病毒辅助复制？",
        options: {
          'a': "HAV",
          'b': "HBV",
          'c': "HCV",
          'd': "HEV",
        },
        correctAnswer: 'b',
        explanation: "HDV必须依赖HBV。"
      },
      {
        id: 'hepatitis_virus_35',
        question: "HDV包膜来源于：",
        options: {
          'a': "HCV包膜蛋白",
          'b': "自身编码蛋白",
          'c': "HBsAg",
          'd': "HBcAg",
        },
        correctAnswer: 'c',
        explanation: "HDV包膜来源于HBsAg。"
      },
      {
        id: 'hepatitis_virus_36',
        question: "HDV与HBV同时感染时最容易引起：",
        options: {
          'a': "慢性携带",
          'b': "爆发性肝炎",
          'c': "无症状感染",
          'd': "肠炎",
        },
        correctAnswer: 'b',
        explanation: "HBV与HDV同时感染容易引起严重急性爆发性肝炎。"
      },
      {
        id: 'hepatitis_virus_37',
        question: "预防HDV最有效的方法是：",
        options: {
          'a': "接种HAV疫苗",
          'b': "接种HBV疫苗",
          'c': "注射抗生素",
          'd': "接种HCV疫苗",
        },
        correctAnswer: 'b',
        explanation: "预防HBV即可预防HDV，因为HDV离不开HBV。"
      },
      {
        id: 'hepatitis_virus_38',
        question: "下列哪种肝炎病毒最容易慢性化？",
        options: {
          'a': "HAV",
          'b': "HEV",
          'c': "HCV",
          'd': "HDV同时感染",
        },
        correctAnswer: 'c',
        explanation: "HCV最容易慢性化，且隐匿性强。"
      },
      {
        id: 'hepatitis_virus_39',
        question: "关于五型肝炎病毒共同点，正确的是：",
        options: {
          'a': "都有包膜",
          'b': "都可慢性化",
          'c': "都以肝脏为主要靶器官",
          'd': "都通过血液传播",
        },
        correctAnswer: 'c',
        explanation: "五种肝炎病毒共同点：主要靶器官均为肝脏。"
      },
      {
        id: 'hepatitis_virus_40',
        question: "下列关于肝炎病毒的说法，错误的是：",
        options: {
          'a': "HAV和HEV主要经粪-口传播",
          'b': "HBV可通过母婴传播",
          'c': "HCV已有广泛应用疫苗",
          'd': "HDV依赖HBV存在",
        },
        correctAnswer: 'c',
        explanation: "目前尚无广泛应用的HCV疫苗，因此这项错误。"
      }
    ]
  }
};

export { categories, questions };
