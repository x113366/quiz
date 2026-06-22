// 合并后的总题库

// 分类数据
const categories = [
  {
    id: 'pathogen_biology',
    name: '病原生物学',
    description: '病原生物学题库',
    icon: '🦠',
    color: '#4CAF50',
    chapters: [
      {
        id: '10',
        name: '弧菌属',
        description: '弧菌属相关题目'
      },
      {
        id: '11',
        name: '肠杆菌科',
        description: '肠杆菌科相关题目'
      },
      {
        id: '12',
        name: '厌氧性细菌',
        description: '厌氧性细菌相关题目'
      },
      {
        id: '13',
        name: '分枝杆菌属',
        description: '分枝杆菌属相关题目'
      },
      {
        id: '14',
        name: '动物源性细菌',
        description: '动物源性细菌相关题目'
      },
      {
        id: '15',
        name: '其他细菌',
        description: '其他细菌相关题目'
      },
      {
        id: '16',
        name: '放线菌与诺卡菌',
        description: '放线菌与诺卡菌相关题目'
      },
      {
        id: '17',
        name: '支原体',
        description: '支原体相关题目'
      },
      {
        id: '18',
        name: '立克次体',
        description: '立克次体相关题目'
      },
      {
        id: '19',
        name: '衣原体',
        description: '衣原体相关题目'
      },
      {
        id: '20',
        name: '螺旋体',
        description: '螺旋体相关题目'
      }
    ]
  }
];

// 题目数据
const questions = {
  'pathogen_biology': {
    '10': [
    {
      id: '10_1',
      question: '弧菌主要分布于____________。',
      options: {
        'a': '空气',
        'b': '土壤',
        'c': '水',
        'd': '人体肠道',
        'e': '动物体肠道',
      },
      correctAnswer: 'c',
      explanation: '弧菌为需氧或兼性厌氧菌，主要分布于水中，尤其是海水和淡水交界处。'
    },
    {
      id: '10_2',
      question: '适宜霍乱弧菌生长的培养基是____________。',
      options: {
        'a': '血清肉汤',
        'b': '肉浸液',
        'c': '碱性蛋白胨水',
        'd': '庖肉培养基',
        'e': '葡萄糖蛋白胨水',
      },
      correctAnswer: 'c',
      explanation: '霍乱弧菌为碱性菌，在pH8.4-9.2的碱性蛋白胨水中生长良好。'
    },
    {
      id: '10_3',
      question: '霍乱弧菌肠毒素作用于小肠黏膜上皮细胞，使胞内腺苷酸环化酶活性增加，促进胞内____________。',
      options: {
        'a': 'cAMP含量升高',
        'b': 'ATP含量升高',
        'c': 'cAMP含量降低',
        'd': 'cGMP含量升高',
        'e': 'cAMP含量降低',
      },
      correctAnswer: 'a',
      explanation: '霍乱弧菌肠毒素激活腺苷酸环化酶，使细胞内cAMP浓度升高，导致肠黏膜细胞分泌功能亢进，引起剧烈腹泻。'
    },
    {
      id: '10_4',
      question: '霍乱弧菌的主要致病物质不包括____________。',
      options: {
        'a': '鞭毛',
        'b': '菌毛',
        'c': '毒素共调菌毛',
        'd': '外毒素',
        'e': '内毒素',
      },
      correctAnswer: 'e',
      explanation: '霍乱弧菌的主要致病物质包括鞭毛（运动）、菌毛（黏附）、毒素共调菌毛（定植）和外毒素（肠毒素），内毒素不是其主要致病物质。'
    },
    {
      id: '10_5',
      question: '霍乱弧菌能黏附于宿主细胞是因为具有____________。',
      options: {
        'a': '鞭毛',
        'b': '菌毛',
        'c': '荚膜',
        'd': 'K抗原',
        'e': '脂多糖',
      },
      correctAnswer: 'b',
      explanation: '霍乱弧菌通过菌毛（特别是毒素共调菌毛）黏附于小肠黏膜上皮细胞，是其定植和致病的重要步骤。'
    },
    {
      id: '10_6',
      question: '引起第7次世界性霍乱大流行的细菌是____________。',
      options: {
        'a': '古典生物型',
        'b': 'El Tor生物型',
        'c': 'O139群霍乱弧菌',
        'd': 'O-1群霍乱弧菌',
        'e': 'O-2群霍乱弧菌',
      },
      correctAnswer: 'b',
      explanation: '第7次世界性霍乱大流行始于1961年，由El Tor生物型霍乱弧菌引起，该型比古典生物型更具抵抗力。'
    },
    {
      id: '10_7',
      question: '副溶血性弧菌引起的食物中毒常由于食海产品或盐腌食品有关，这是因为该菌____________。',
      options: {
        'a': '耐盐',
        'b': '耐酸',
        'c': '嗜盐',
        'd': '耐高渗',
        'e': '嗜温',
      },
      correctAnswer: 'c',
      explanation: '副溶血性弧菌是嗜盐菌，在3-3.5%的盐水中生长良好，常存在于海产品中，食用未煮熟的海产品或盐腌食品易引起食物中毒。'
    },
    {
      id: '10_8',
      question: '副溶血性弧菌所至疾病是____________。',
      options: {
        'a': '霍乱',
        'b': '食物中毒',
        'c': '肺炎',
        'd': '败血症',
        'e': '胃十二指溃疡',
      },
      correctAnswer: 'b',
      explanation: '副溶血性弧菌主要引起食物中毒，表现为腹痛、腹泻、呕吐等胃肠道症状，多因食用未煮熟的海产品或盐腌食品引起。'
    },
    {
      id: '10_9',
      question: '下列试验中鉴定副溶血性弧菌有无致病性的是____________。',
      options: {
        'a': '血凝试验',
        'b': '神奈川试验',
        'c': '50%溶血试验',
        'd': '凝固酶试验',
        'e': 'Ascoli试验',
      },
      correctAnswer: 'b',
      explanation: '神奈川试验是检测副溶血性弧菌是否产生溶血毒素的试验，阳性结果表明该菌株具有致病性。'
    },
  ],
    '11': [

    {
      id: '11_1',
      question: '厌氧芽胞梭菌与无芽胞厌氧菌具有的共性是____________。',
      options: {
        'a': '形态染色性',
        'b': '专性厌氧',
        'c': '在人体的分布',
        'd': '致病性',
        'e': '对人体的危害',
      },
      correctAnswer: 'b',
      explanation: '两者均为专性厌氧菌，需要在无氧环境中生长。'
    },
    {
      id: '11_2',
      question: '厌氧芽胞梭菌能耐受恶劣环境条件是因为有____________。',
      options: {
        'a': '菌毛',
        'b': '鞭毛',
        'c': '荚膜',
        'd': '芽胞',
        'e': '内毒素',
      },
      correctAnswer: 'd',
      explanation: '芽胞对热、干燥、化学消毒剂等理化因素抵抗力极强。'
    },
    {
      id: '11_3',
      question: '破伤风梭菌除致破伤风外还能引起____________。',
      options: {
        'a': '菌血症',
        'b': '食物中毒',
        'c': '组织坏死',
        'd': '坏死性肠炎',
        'e': '以上都不是',
      },
      correctAnswer: 'e',
      explanation: '破伤风梭菌主要引起破伤风，不引起其他疾病。'
    },
    {
      id: '11_4',
      question: '关于破伤风梭菌的致病性，叙述正确的是____________。',
      options: {
        'a': '该菌污染意外创伤部位或手术伤口而感染',
        'b': '该菌及其产生的毒素入血引起脓毒血症',
        'c': '毒素入血产生全身中毒症状',
        'd': '毒素通过神经、淋巴液、血液到达中枢与周围神经系统',
        'e': '毒素通过重链与脊髓及脑干组织细胞表面受体结合，通过轻链毒性作用而使肌肉痉挛',
      },
      correctAnswer: 'a',
      explanation: '破伤风梭菌通过污染伤口感染，产生的毒素作用于神经系统。'
    },
    {
      id: '11_5',
      question: '破伤风痉挛毒素作用于____________。',
      options: {
        'a': '神经细胞',
        'b': '红细胞',
        'c': '粒细胞',
        'd': '巨噬细胞',
        'e': '成纤维细胞',
      },
      correctAnswer: 'a',
      explanation: '破伤风痉挛毒素主要作用于神经细胞，导致肌肉痉挛。'
    },
    {
      id: '11_6',
      question: '破伤风梭菌感染的重要条件是____________。',
      options: {
        'a': '该菌芽胞污染伤口',
        'b': '菌群失调',
        'c': '伤口厌氧微环境',
        'd': '该菌的繁殖体污染伤口',
        'e': '机体无免疫力',
      },
      correctAnswer: 'c',
      explanation: '破伤风梭菌是厌氧菌，需要在无氧环境中才能生长繁殖。'
    },
    {
      id: '11_7',
      question: '关于破伤风痉挛毒素的特性，叙述正确的是____________。',
      options: {
        'a': '属神经毒素',
        'b': '属肠毒素',
        'c': '属细胞毒素',
        'd': '仅作用于外周神经',
        'e': '毒性不强',
      },
      correctAnswer: 'a',
      explanation: '破伤风痉挛毒素是一种神经毒素，作用于神经系统导致肌肉痉挛。'
    },
    {
      id: '11_8',
      question: '当一民工因铁钉深刺足底送医院急诊时，医生应首先考虑注射____________。',
      options: {
        'a': '破伤风类毒素',
        'b': '破伤风抗毒素',
        'c': '白百破三联疫苗',
        'd': '丙种球蛋白',
        'e': '破伤风菌苗',
      },
      correctAnswer: 'b',
      explanation: '破伤风抗毒素可以中和游离的破伤风毒素，用于紧急预防。'
    },
    {
      id: '11_9',
      question: '用破伤风抗毒素治疗破伤风，其目的是____________。',
      options: {
        'a': '抑制破伤风梭菌的生长',
        'b': '阻止细菌产生毒素',
        'c': '中和结合神经细胞上的外毒素',
        'd': '中和游离在神经细胞外的外毒素',
        'e': '中和进入血液中的外毒素',
      },
      correctAnswer: 'd',
      explanation: '破伤风抗毒素只能中和游离的毒素，不能中和已结合到神经细胞上的毒素。'
    },
    {
      id: '11_10',
      question: '产气荚膜梭菌可分为多个血清型，对人致病的主要为____________。',
      options: {
        'a': 'E型',
        'b': 'D型',
        'c': 'C型',
        'd': 'B型',
        'e': 'A型',
      },
      correctAnswer: 'e',
      explanation: 'A型产气荚膜梭菌是对人致病的主要血清型。'
    },
    {
      id: '11_11',
      question: '产气荚膜梭菌除可引起气性坏疽外，还可引起____________。',
      options: {
        'a': '食物中毒',
        'b': '肺炎',
        'c': '败血症',
        'd': '尿道炎',
        'e': '以上都不是',
      },
      correctAnswer: 'a',
      explanation: '产气荚膜梭菌可产生肠毒素，引起食物中毒，表现为腹痛、腹泻等症状。'
    },
    {
      id: '11_12',
      question: '能引起食物中毒，但很少有胃肠炎症状的细菌是____________。',
      options: {
        'a': '金黄色葡萄球菌',
        'b': '副溶血性弧菌',
        'c': '肠炎沙门菌',
        'd': '肉毒梭菌',
        'e': '产气荚膜梭菌',
      },
      correctAnswer: 'd',
      explanation: '肉毒梭菌引起的食物中毒主要表现为神经麻痹症状，很少有胃肠炎症状。'
    },
    {
      id: '11_13',
      question: '产生肠毒素并引起食物中毒的厌氧菌是____________。',
      options: {
        'a': '肉毒梭菌',
        'b': '艰难梭菌',
        'c': '脆弱类杆菌',
        'd': '产气荚膜梭菌',
        'e': '败血梭菌',
      },
      correctAnswer: 'd',
      explanation: '产气荚膜梭菌产生的肠毒素可引起食物中毒，表现为腹痛、腹泻等症状。'
    },
    {
      id: '11_14',
      question: '肉毒毒素作用的主要部位是____________。',
      options: {
        'a': '胃粘膜细胞',
        'b': '肠上皮细胞',
        'c': '脊髓前角细胞',
        'd': '脑神经细胞',
        'e': '运动神经末梢',
      },
      correctAnswer: 'e',
      explanation: '肉毒毒素主要作用于运动神经末梢，阻止乙酰胆碱的释放，导致肌肉麻痹。'
    },
    {
      id: '11_15',
      question: '关于肉毒毒素的作用机制，叙述正确的是____________。',
      options: {
        'a': '使脑神经和外周神经兴奋性增加',
        'b': '使自主神经兴奋性增加',
        'c': '使自主神经兴奋性麻痹',
        'd': '阻碍乙酰胆碱的释放',
        'e': '释放抑制性神经介质',
      },
      correctAnswer: 'd',
      explanation: '肉毒毒素通过阻碍乙酰胆碱的释放，导致肌肉麻痹，这是其主要作用机制。'
    },
    {
      id: '11_16',
      question: '引起抗生素相关性假膜性肠炎的细菌是____________。',
      options: {
        'a': '破伤风梭菌',
        'b': '产气荚膜梭菌',
        'c': '艰难梭菌',
        'd': '肉毒梭菌',
        'e': '挪威梭菌',
      },
      correctAnswer: 'c',
      explanation: '艰难梭菌是引起抗生素相关性假膜性肠炎的主要病原菌，常发生在长期使用抗生素导致肠道菌群失调后。'
    },
    {
      id: '11_17',
      question: '在无芽胞厌氧菌感染中，最常见的是____________。',
      options: {
        'a': '脆弱类杆菌',
        'b': '消化链球菌',
        'c': '丙酸杆菌',
        'd': '梭状杆菌',
        'e': '双歧杆菌',
      },
      correctAnswer: 'a',
      explanation: '脆弱类杆菌是无芽胞厌氧菌中最常见的病原菌，可引起多种感染。'
    },
    {
      id: '11_18',
      question: '在人体肠道正常菌群中，占绝对优势的是____________。',
      options: {
        'a': '链球菌',
        'b': '大肠杆菌',
        'c': '变形杆菌',
        'd': '白色念珠菌',
        'e': '无芽胞厌氧菌',
      },
      correctAnswer: 'e',
      explanation: '无芽胞厌氧菌在人体肠道正常菌群中占绝对优势，数量远超过其他细菌。'
    },
    {
      id: '11_19',
      question: '无芽胞厌氧菌引起的感染不包括____________。',
      options: {
        'a': '脓肿',
        'b': '败血症',
        'c': '组织坏死',
        'd': '食物中毒',
        'e': '局部炎症',
      },
      correctAnswer: 'd',
      explanation: '无芽胞厌氧菌主要引起脓肿、败血症、组织坏死和局部炎症等感染，一般不引起食物中毒。'
    },
    {
      id: '11_20',
      question: '引起气性坏疽的病原菌是____________。',
      options: {
        'a': '炭疽杆菌',
        'b': '变形杆菌',
        'c': '产气杆菌',
        'd': '鼠疫杆菌',
        'e': '产气荚膜梭菌',
      },
      correctAnswer: 'e',
      explanation: '产气荚膜梭菌是引起气性坏疽的主要病原菌，常发生在严重创伤后。'
    },
    {
      id: '11_21',
      question: '目前已知的细菌毒素中毒性最强的是____________。',
      options: {
        'a': '肉毒毒素',
        'b': '破伤风毒素',
        'c': '霍乱肠毒素',
        'd': '志贺毒素',
        'e': '以上都不是',
      },
      correctAnswer: 'a',
      explanation: '肉毒毒素是目前已知的细菌毒素中毒性最强的，对人的致死量极低。'
    },
    {
      id: '11_22',
      question: '可疑肉毒毒素中毒的患者，采集的标本应该是____________。',
      options: {
        'a': '粪便',
        'b': '血液',
        'c': '脑脊液',
        'd': '伤口渗出液',
        'e': '剩余食物',
      },
      correctAnswer: 'e',
      explanation: '肉毒毒素中毒多由食用被污染的食物引起，因此采集剩余食物标本进行检测最为重要。'
    },
    {
      id: '11_23',
      question: '血平板上可形成双层溶血环的细菌是____________。',
      options: {
        'a': '产气荚膜梭菌',
        'b': '肉毒梭菌',
        'c': '炭疽杆菌',
        'd': '白喉杆菌',
        'e': '鼠疫杆菌',
      },
      correctAnswer: 'a',
      explanation: '产气荚膜梭菌在血平板上可形成双层溶血环，内层为β溶血，外层为α溶血。'
    },
    {
      id: '11_24',
      question: '芽胞呈“鼓槌状”的厌氧菌为____________。',
      options: {
        'a': '产气荚膜梭菌',
        'b': '肉毒梭菌',
        'c': '破伤风梭菌',
        'd': '艰难梭菌',
        'e': '枯草杆菌',
      },
      correctAnswer: 'c',
      explanation: '破伤风梭菌的芽胞位于菌体一端，呈“鼓槌状”，是其重要的形态特征。'
    },
    {
      id: '11_25',
      question: '肉毒梭菌污染食物，目前我国最多见的是____________。',
      options: {
        'a': '腊肉',
        'b': '香肠',
        'c': '罐头',
        'd': '发酵豆制品',
        'e': '发酵面制品',
      },
      correctAnswer: 'd',
      explanation: '在我国，肉毒梭菌污染食物最多见的是发酵豆制品，如臭豆腐、豆瓣酱等。'
    },
    {
      id: '11_26',
      question: 'Which one of the following bacterial spore is round,terminal and larger than vegetative cell____________。',
      options: {
        'a': 'C.perfringes',
        'b': 'pneumococcus',
        'c': 'C.botulinum',
        'd': 'B.fragilis',
        'e': 'C.tetani',
      },
      correctAnswer: 'e',
      explanation: '破伤风梭菌（C.tetani）的芽胞是圆形的，位于菌体末端，且大于营养细胞，呈"鼓槌状"。'
    },
    {
      id: '11_27',
      question: 'The most correct treatment of patient with tetanus in clinic is injection of ____________。',
      options: {
        'a': 'tetanus toxoid',
        'b': 'tetanus antitoxin',
        'c': 'pertusis-diphtheria-tetanus vaccine',
        'd': 'penicillin and streptomycin',
        'e': 'tetanus antitoxin and antibiotics',
      },
      correctAnswer: 'e',
      explanation: '破伤风的治疗需要同时注射破伤风抗毒素（中和毒素）和抗生素（杀灭细菌）。'
    },
  ],
    '12': [

    {
      id: '12_1',
      question: '放线菌与真菌在生物学性状上的相同点是____________。',
      options: {
        'a': '属原核细胞型微生物',
        'b': '为单细胞',
        'c': '厌氧或微需氧',
        'd': '分枝生长，不形成孢子',
        'e': '生长慢',
      },
      correctAnswer: 'e',
      explanation: '放线菌和真菌的生长速度都比较慢，需要较长时间才能形成可见菌落。'
    },
    {
      id: '12_2',
      question: '放线菌最主要和简单的诊断方法是____________。',
      options: {
        'a': '病灶在病灶中找到“硫磺样颗粒”',
        'b': '测凝集素',
        'c': '测沉淀素',
        'd': '测补体结合抗体',
        'e': '厌氧培养',
      },
      correctAnswer: 'a',
      explanation: '放线菌感染的病灶中常形成特征性的硫磺样颗粒，这是最主要和简单的诊断方法。'
    },
    {
      id: '12_3',
      question: '诺卡菌引起人类主要的疾病市____________。',
      options: {
        'a': '肺炎',
        'b': '脑膜炎',
        'c': '脑脓肿',
        'd': '败血症',
        'e': '腹膜炎',
      },
      correctAnswer: 'a',
      explanation: '诺卡菌主要引起肺部感染，表现为肺炎，也可引起其他部位的感染。'
    },
    {
      id: '12_4',
      question: '衣氏放线菌主要引起的疾病是____________。',
      options: {
        'a': '上呼吸道感染',
        'b': '肺炎',
        'c': '龋齿和牙周炎',
        'd': '腹膜炎',
        'e': '盆腔炎',
      },
      correctAnswer: 'c',
      explanation: '衣氏放线菌是口腔正常菌群的一部分，主要引起龋齿和牙周炎等口腔感染。'
    },
    {
      id: '12_5',
      question: 'Which one of the following abcteria can be diagnosed with sulfur granules____________。',
      options: {
        'a': 'M.tuberculosis',
        'b': 'M.leproma',
        'c': 'chlamydia',
        'd': 'actinomyces',
        'e': 'proteus',
      },
      correctAnswer: 'd',
      explanation: '放线菌（actinomyces）感染的病灶中可形成特征性的硫磺样颗粒，这是其重要的诊断依据。'
    },
  ],
    '13': [

    {
      id: '13_1',
      question: '白喉杆菌在形态学上的主要特征是____________。',
      options: {
        'a': '菌体细长弯曲，一端或两端膨大呈棒状',
        'b': '菌体着色不均匀，出现异染颗粒',
        'c': '无荚膜',
        'd': '无鞭毛',
        'e': '不产生芽胞',
      },
      correctAnswer: 'b',
      explanation: '白喉杆菌的形态学特征是菌体着色不均匀，出现异染颗粒，这是其重要的鉴别特征。'
    },
    {
      id: '13_2',
      question: '白喉感染的主要途径是____________。',
      options: {
        'a': '呼吸道',
        'b': '消化道',
        'c': '直接接触',
        'd': '通过用具间接接触',
        'e': '蚊虫叮咬',
      },
      correctAnswer: 'a',
      explanation: '白喉主要通过呼吸道飞沫传播，是其主要的感染途径。'
    },
    {
      id: '13_3',
      question: '白喉杆菌致病的最主要物质是____________。',
      options: {
        'a': '内毒素',
        'b': '外毒素',
        'c': '菌毛',
        'd': '侵袭性酶',
        'e': '棒状杆菌噬菌体',
      },
      correctAnswer: 'b',
      explanation: '白喉杆菌的主要致病物质是外毒素，由溶原性白喉杆菌产生，具有强烈的毒性。'
    },
    {
      id: '13_4',
      question: '关于白喉的叙述，下列各项正确的是____________。',
      options: {
        'a': '白喉杆菌非唯一病原菌',
        'b': '白喉病人和带菌者为其传染源',
        'c': '细菌侵入鼻咽部和血流引起相应症状',
        'd': '假膜和心肌炎是细菌和毒素共同作用的结果',
        'e': '假膜引起呼吸道阻塞是疾病晚期死亡的最主要原因',
      },
      correctAnswer: 'b',
      explanation: '白喉的传染源是白喉病人和带菌者，主要通过呼吸道飞沫传播。'
    },
    {
      id: '13_5',
      question: '白喉局部病变的特征是____________。',
      options: {
        'a': '假膜',
        'b': '脓肿',
        'c': '红肿',
        'd': '溃疡',
        'e': '水肿',
      },
      correctAnswer: 'a',
      explanation: '白喉局部病变的特征是形成假膜，由坏死组织、炎症细胞和细菌组成，不易脱落。'
    },
    {
      id: '13_6',
      question: '白喉病人早期死亡的主要原因是____________。',
      options: {
        'a': '假膜阻塞呼吸道',
        'b': '败血症',
        'c': '毒血症',
        'd': '心肌炎',
        'e': '肾上腺功能障碍',
      },
      correctAnswer: 'a',
      explanation: '白喉病人早期死亡的主要原因是假膜阻塞呼吸道，导致窒息。'
    },
    {
      id: '13_7',
      question: '白喉病人晚期死亡的主要原因是____________。',
      options: {
        'a': '呼吸道阻塞窒息',
        'b': '心肌炎',
        'c': '软腭麻痹',
        'd': '膈肌麻痹',
        'e': '毒血症',
      },
      correctAnswer: 'b',
      explanation: '白喉病人晚期死亡的主要原因是心肌炎，由白喉毒素对心肌的损害引起。'
    },
    {
      id: '13_8',
      question: '锡克试验的原理为____________。',
      options: {
        'a': '毒素与抗毒素中和反应',
        'b': '沉淀反应',
        'c': '变态反应',
        'd': '毒素对细胞的毒性作用',
        'e': '凝集反应',
      },
      correctAnswer: 'a',
      explanation: '锡克试验的原理是毒素与抗毒素中和反应，用于测定机体对白喉的免疫力。'
    },
    {
      id: '13_9',
      question: '白喉毒素用于治疗肿瘤的根据为____________。',
      options: {
        'a': '该毒素对肿瘤有高度的亲和力',
        'b': '该毒素对肿瘤有特异杀伤作用',
        'c': '该毒素剧毒',
        'd': '肿瘤组织对白喉毒素高度敏感',
        'e': '该毒素能使细胞内EF-2灭活而杀伤肿瘤细胞',
      },
      correctAnswer: 'e',
      explanation: '白喉毒素能使细胞内EF-2灭活，抑制蛋白质合成，从而杀伤肿瘤细胞。'
    },
    {
      id: '13_10',
      question: '用亚碲酸盐血平板选择鉴别培养的细菌是____________。',
      options: {
        'a': '霍乱弧菌',
        'b': '肠炎沙门菌',
        'c': '白喉杆菌',
        'd': '艰难梭菌',
        'e': '肉毒梭菌',
      },
      correctAnswer: 'c',
      explanation: '白喉杆菌能在亚碲酸盐血平板上生长，并使亚碲酸盐还原为碲，形成黑色菌落，用于鉴别培养。'
    },
    {
      id: '13_11',
      question: '白喉毒素作用的组织不累及____________。',
      options: {
        'a': '上呼吸道',
        'b': '肺',
        'c': '心肌',
        'd': '肾上腺',
        'e': '外周神经',
      },
      correctAnswer: 'b',
      explanation: '白喉毒素主要作用于上呼吸道、心肌、肾上腺和外周神经，一般不累及肺组织。'
    },
    {
      id: '13_12',
      question: '关于白喉免疫的叙述，错误的是____________。',
      options: {
        'a': '体液免疫中和外毒素毒性',
        'b': '细胞免疫杀菌',
        'c': '感染后可获得免疫',
        'd': '预防接种后可获得免疫',
        'e': '可用锡克试验测定',
      },
      correctAnswer: 'b',
      explanation: '白喉免疫主要依靠体液免疫中和外毒素毒性，而不是细胞免疫杀菌。'
    },
    {
      id: '13_13',
      question: '关于白喉毒素的特性，错误的是____________。',
      options: {
        'a': '是溶原性白喉杆菌产生的外毒素',
        'b': '其编码基因在棒状杆菌噬菌体上',
        'c': '有1条多肽链组成',
        'd': '属细胞毒素',
        'e': '有剧毒，尤其成人有关组织对其敏感',
      },
      correctAnswer: 'e',
      explanation: '白喉毒素有剧毒，但儿童比成人更敏感，而不是成人更敏感。'
    },
    {
      id: '13_14',
      question: 'Which one of the following bacteria after infection with dis the patients have the strong and persistent immunity____________。',
      options: {
        'a': 'staphylococcus',
        'b': 'shigella',
        'c': 'gonococcus',
        'd': 'c.diphtheriae',
        'e': 'c.tetani',
      },
      correctAnswer: 'd',
      explanation: '白喉杆菌（c.diphtheriae）感染后，患者可获得 strong and persistent immunity（强烈而持久的免疫力）。'
    },
  ],
    '14': [

    {
      id: '14_1',
      question: '分枝杆菌属最主要的特点是____________。',
      options: {
        'a': '胞壁含大量脂质',
        'b': '无特殊结构',
        'c': '有分枝生长趋势',
        'd': '一般不易着色',
        'e': '抵抗酸性酒精脱色',
      },
      correctAnswer: 'a',
      explanation: '分枝杆菌属最主要的特点是胞壁含大量脂质，占细胞壁干重的60%以上，这是其抗酸性的基础。'
    },
    {
      id: '14_2',
      question: '结核分枝杆菌常用的培养基是____________。',
      options: {
        'a': '沙保培养基',
        'b': '罗氏培养基',
        'c': '庖肉培养基',
        'd': '巧克力色培养基',
        'e': '亚碲酸盐培养基',
      },
      correctAnswer: 'b',
      explanation: '结核分枝杆菌常用的培养基是罗氏培养基，含有蛋黄、甘油、马铃薯等成分，有利于其生长。'
    },
    {
      id: '14_3',
      question: '与结核分枝杆菌抗酸性有关的成分是____________。',
      options: {
        'a': '磷脂',
        'b': '蜡质D',
        'c': '分枝菌酸',
        'd': '索状因子',
        'e': '硫酸脑苷脂',
      },
      correctAnswer: 'c',
      explanation: '分枝菌酸是结核分枝杆菌细胞壁的主要成分，与抗酸性有关，能抵抗酸性酒精的脱色作用。'
    },
    {
      id: '14_4',
      question: '在无芽胞细菌中，最耐干燥的细菌是____________。',
      options: {
        'a': '葡萄球菌',
        'b': '溶血性链球菌',
        'c': '肺炎球菌',
        'd': '白喉杆菌',
        'e': '结核杆菌',
      },
      correctAnswer: 'e',
      explanation: '结核杆菌在无芽胞细菌中最耐干燥，在干燥的痰中可存活6-8个月。'
    },
    {
      id: '14_5',
      question: '结核杆菌的哪种变异可用于制备疫苗____________。',
      options: {
        'a': '形态',
        'b': '结构',
        'c': '毒力',
        'd': '耐药性',
        'e': '菌落',
      },
      correctAnswer: 'c',
      explanation: '结核杆菌的毒力变异可用于制备疫苗，如BCG疫苗就是通过毒力变异获得的减毒活疫苗。'
    },
    {
      id: '14_6',
      question: '以下疾病中属感染免疫的是____________。',
      options: {
        'a': '风湿热',
        'b': '急性肾小球肾炎',
        'c': '白喉',
        'd': '结核',
        'e': '肠热症',
      },
      correctAnswer: 'd',
      explanation: '结核属于感染免疫（有菌免疫），只有当体内有结核分枝杆菌存在时，机体才保持对其的免疫力。'
    },
    {
      id: '14_7',
      question: 'BCG属于____________。',
      options: {
        'a': '死菌苗',
        'b': '减毒活疫苗',
        'c': '类毒素',
        'd': '抗毒素',
        'e': '荚膜多糖疫苗',
      },
      correctAnswer: 'b',
      explanation: 'BCG（卡介苗）属于减毒活疫苗，是由牛型结核分枝杆菌经减毒处理制成的。'
    },
    {
      id: '14_8',
      question: 'BCG接种的对象主要是____________。',
      options: {
        'a': '年老体弱者',
        'b': '结核性脑膜炎患者',
        'c': '结核菌素试验阳性者',
        'd': '新生儿和结核菌素试验阴性的儿童',
        'e': '严重结核病人，结核菌素试验阴性患者',
      },
      correctAnswer: 'd',
      explanation: 'BCG接种的主要对象是新生儿和结核菌素试验阴性的儿童，以预防结核病。'
    },
    {
      id: '14_9',
      question: '麻风的传播方式主要是____________。',
      options: {
        'a': '同病人的皮肤接触',
        'b': '消化道',
        'c': '呼吸道',
        'd': '带菌小鼠',
        'e': '带菌猪',
      },
      correctAnswer: 'c',
      explanation: '麻风的主要传播方式是呼吸道飞沫传播，也可通过直接接触传播。'
    },
    {
      id: '14_10',
      question: '结核分枝杆菌侵入机体的途径，不可能的是____________。',
      options: {
        'a': '呼吸道',
        'b': '消化道',
        'c': '破损皮肤',
        'd': '泌尿道',
        'e': '节肢动物叮咬',
      },
      correctAnswer: 'e',
      explanation: '结核分枝杆菌不会通过节肢动物叮咬传播，主要通过呼吸道、消化道和破损皮肤侵入机体。'
    },
    {
      id: '14_11',
      question: '人体对结核分枝杆菌的免疫特点是____________。',
      options: {
        'a': '以体液和细胞免疫并重',
        'b': '以体液免疫为主',
        'c': '为有菌免疫',
        'd': '不能通过人工主动免疫获得',
        'e': '可引起I型超敏反应',
      },
      correctAnswer: 'c',
      explanation: '人体对结核分枝杆菌的免疫特点是有菌免疫，即只有当体内有结核分枝杆菌存在时，机体才保持对其的免疫力。'
    },
    {
      id: '14_12',
      question: '有关结核菌素试验，下述错误的是____________。',
      options: {
        'a': '属于迟发型超敏反应',
        'b': '可检测机体对结核分枝杆菌的免疫状态',
        'c': '试验结果以局部红肿、硬结的直径为标准',
        'd': '可检测机体细胞免疫功能状况',
        'e': '12-18小时观察结果',
      },
      correctAnswer: 'e',
      explanation: '结核菌素试验应在48-72小时观察结果，而不是12-18小时。'
    },
    {
      id: '14_13',
      question: '结核菌素试验为阳性反应，下述可能情况错误的是____________。',
      options: {
        'a': '表明机体已感染过结核分枝杆菌',
        'b': '表明机体接种BCG成功',
        'c': '表明机体对结核分枝杆菌有一定的特异性免疫力',
        'd': '表明机体对结核分枝杆菌有迟发型超敏反应',
        'e': '表明机体对结核分枝杆菌无免疫力',
      },
      correctAnswer: 'e',
      explanation: '结核菌素试验阳性反应表明机体对结核分枝杆菌有免疫力，而不是无免疫力。'
    },
    {
      id: '14_14',
      question: '麻风病的临床类型不包括 ____________。',
      options: {
        'a': '瘤型',
        'b': '结核样型',
        'c': '亚临床感染型',
        'd': '界限型',
        'e': '未定型',
      },
      correctAnswer: 'c',
      explanation: '麻风病的临床类型包括瘤型、结核样型、界限型和未定型，不包括亚临床感染型。'
    },
    {
      id: '14_15',
      question: '结核菌素试验的应用价值不包括____________。',
      options: {
        'a': '用于选择卡介苗的接种对象',
        'b': '用于接种卡介苗免疫效果的测定',
        'c': '作为结核病诊断的依据',
        'd': '测定肿瘤病人的非特异性细胞免疫功能',
        'e': '在未接种过卡介苗的人群中调查结核病的流行情况',
      },
      correctAnswer: 'c',
      explanation: '结核菌素试验不能作为结核病诊断的唯一依据，需要结合临床症状和其他检查结果。'
    },
    {
      id: '14_16',
      question: '下列不属于专性需氧的细菌是____________。',
      options: {
        'a': '结核分枝杆菌',
        'b': '麻风分枝杆菌',
        'c': '炭疽杆菌',
        'd': '布氏杆菌',
        'e': '霍乱弧菌',
      },
      correctAnswer: 'd',
      explanation: '布氏杆菌是兼性厌氧菌，而不是专性需氧菌。'
    },
    {
      id: '14_17',
      question: '结核分枝杆菌培养基不具备____________。',
      options: {
        'a': '营养作用',
        'b': '选择作用',
        'c': '鉴别作用',
        'd': '利于长期培养',
        'e': '因含脂质因子而刺激生长',
      },
      correctAnswer: 'b',
      explanation: '结核分枝杆菌培养基主要提供营养作用，有利于其生长，但不具备选择作用。'
    },
    {
      id: '14_18',
      question: '关于结核分枝杆菌抵抗力的叙述，错误的是____________。',
      options: {
        'a': '耐干燥，在干燥的痰内可存活6-8天',
        'b': '对湿热敏感，用巴氏消毒法可将其杀死',
        'c': '对紫外线敏感，直接日光照射数小时可被杀灭',
        'd': '对酸碱有抵抗力',
        'e': '对抗痨药物易产生抗药性',
      },
      correctAnswer: 'a',
      explanation: '结核分枝杆菌在干燥的痰内可存活6-8个月，而不是6-8天。'
    },
    {
      id: '14_19',
      question: '结核分枝杆菌的变异不包括____________。',
      options: {
        'a': '形态',
        'b': '菌落',
        'c': '毒力',
        'd': '对氧的需要',
        'e': '耐药性',
      },
      correctAnswer: 'd',
      explanation: '结核分枝杆菌是专性需氧菌，其对氧的需要不会发生变异。'
    },
    {
      id: '14_20',
      question: '以下细菌不属于胞内寄生菌的是____________。',
      options: {
        'a': '结核分枝杆菌',
        'b': '麻风分枝杆菌',
        'c': '伤寒沙门菌',
        'd': '布鲁菌',
        'e': '百日咳杆菌',
      },
      correctAnswer: 'e',
      explanation: '百日咳杆菌主要在呼吸道黏膜表面生长繁殖，不属于胞内寄生菌。'
    },
    {
      id: '14_21',
      question: '从痰中检出具有临床诊断意义的细菌是____________。',
      options: {
        'a': '伤寒沙门菌',
        'b': '布鲁菌',
        'c': '肺炎链球菌',
        'd': '霍乱弧菌',
        'e': '结核分枝杆菌',
      },
      correctAnswer: 'e',
      explanation: '从痰中检出结核分枝杆菌对结核病的诊断具有重要临床意义。'
    },
    {
      id: '14_22',
      question: '在人工培养基上常形成竹节状长链的细菌是____________。',
      options: {
        'a': '结核分枝杆菌',
        'b': '破伤风梭菌',
        'c': '麻风分枝杆菌',
        'd': '炭疽杆菌',
        'e': '伤寒沙门菌',
      },
      correctAnswer: 'd',
      explanation: '炭疽杆菌在人工培养基上常形成竹节状长链，这是其重要的形态特征。'
    },
    {
      id: '14_23',
      question: '需氧和产生芽胞的细菌是____________。',
      options: {
        'a': '结核分枝杆菌',
        'b': '破伤风梭菌',
        'c': '炭疽杆菌',
        'd': '产气荚膜梭菌',
        'e': '肉毒梭菌',
      },
      correctAnswer: 'c',
      explanation: '炭疽杆菌是需氧菌，能产生芽胞，而其他选项中只有厌氧菌或不产生芽胞的细菌。'
    },
    {
      id: '14_24',
      question: '引起波浪热的病原体是____________。',
      options: {
        'a': '布鲁菌',
        'b': '钩端螺旋体',
        'c': '结核分枝杆菌',
        'd': '脑膜炎奈瑟菌',
        'e': '沙门菌',
      },
      correctAnswer: 'a',
      explanation: '布鲁菌感染可引起波浪热，其特点是体温呈波浪式起伏。'
    },
    {
      id: '14_25',
      question: '人类历史上第一个被发现的病原菌是____________。',
      options: {
        'a': '破伤风梭菌',
        'b': '炭疽杆菌',
        'c': '鼠疫杆菌',
        'd': '布鲁菌',
        'e': '葡萄球菌',
      },
      correctAnswer: 'b',
      explanation: '炭疽杆菌是人类历史上第一个被发现的病原菌，由德国科学家科赫于1876年发现。'
    },
    {
      id: '14_26',
      question: '致病菌中最大的细菌是____________。',
      options: {
        'a': '破伤风梭菌',
        'b': '产气荚膜梭菌',
        'c': '肉毒梭菌',
        'd': '炭疽杆菌',
        'e': '枯草杆菌',
      },
      correctAnswer: 'd',
      explanation: '炭疽杆菌是致病菌中最大的细菌，菌体较大，两端平截。'
    },
    {
      id: '14_27',
      question: '炭疽毒素的毒性作用主要是直接损伤____________。',
      options: {
        'a': '白细胞',
        'b': '红细胞',
        'c': '微血管内皮细胞',
        'd': '肝细胞',
        'e': '脾细胞',
      },
      correctAnswer: 'c',
      explanation: '炭疽毒素的毒性作用主要是直接损伤微血管内皮细胞，导致血管通透性增加，引起组织水肿和出血。'
    },
    {
      id: '14_28',
      question: '感染后引起母畜流产的病原菌是____________。',
      options: {
        'a': '布鲁菌',
        'b': '炭疽杆菌',
        'c': '鼠疫杆菌',
        'd': '钩端螺旋体',
        'e': '空肠弯曲菌',
      },
      correctAnswer: 'a',
      explanation: '布鲁菌感染可引起母畜流产，这是其重要的临床特征之一。'
    },
    {
      id: '14_29',
      question: '蜡样芽胞杆菌引起的疾病是____________。',
      options: {
        'a': '结核样肉芽肿',
        'b': '阑尾炎',
        'c': '食物中毒',
        'd': '肺炎',
        'e': '败血症',
      },
      correctAnswer: 'c',
      explanation: '蜡样芽胞杆菌主要引起食物中毒，尤其是食用被其污染的米饭等食物后。'
    },
    {
      id: '14_30',
      question: 'The principle of OTtest is ____________。',
      options: {
        'a': 'type I allergy',
        'b': 'delayed hypersensitivity reaction',
        'c': 'neutralization',
        'd': 'antigen-antibody complex reaction',
        'e': 'non-specific inflammation',
      },
      correctAnswer: 'b',
      explanation: 'OT试验（结核菌素试验）的原理是迟发型超敏反应（delayed hypersensitivity reaction）。'
    },
  ],
    '15': [

    {
      id: '15_1',
      question: '下列属于动物源性细菌的是____________。',
      options: {
        'a': '麻风分枝杆菌',
        'b': '伤寒沙门菌',
        'c': '布鲁菌',
        'd': '破伤风梭菌',
        'e': '肉毒梭菌',
      },
      correctAnswer: 'c',
      explanation: '布鲁菌是动物源性细菌，主要通过接触感染动物或其产品传播给人类。'
    },
    {
      id: '15_2',
      question: '在我国引起疾病最常见的布鲁菌是____________。',
      options: {
        'a': '牛布鲁菌',
        'b': '猪布鲁菌',
        'c': '鼠布鲁菌',
        'd': '羊布鲁菌',
        'e': '犬布鲁菌',
      },
      correctAnswer: 'd',
      explanation: '在我国，羊布鲁菌是引起布鲁菌病最常见的病原体。'
    },
    {
      id: '15_3',
      question: '目前预防百日咳主要采用注射 ____________。',
      options: {
        'a': '类毒素',
        'b': '减毒活疫苗',
        'c': '抗毒素',
        'd': '白百破三联疫苗',
        'e': '白百破三联疫苗和死菌苗均可',
      },
      correctAnswer: 'e',
      explanation: '目前预防百日咳主要采用注射白百破三联疫苗（包含百日咳死菌苗、白喉类毒素和破伤风类毒素）。'
    },
  ],
    '16': [

    {
      id: '16_1',
      question: '目前控制军团菌肺炎流行的措施____________。',
      options: {
        'a': '对医院供水系统和喷雾治疗器定期监测和消毒',
        'b': '给免疫抑制患者服用免疫增强剂',
        'c': '注射亚单位疫苗',
        'd': '流行期间给易感者注射青霉素',
        'e': '流行期间用乳酸熏蒸消毒居室空气',
      },
      correctAnswer: 'a',
      explanation: '军团菌主要通过水源传播，控制措施主要是对供水系统和喷雾治疗器进行定期监测和消毒。'
    },
    {
      id: '16_2',
      question: '绿脓杆菌的特征是 ____________。',
      options: {
        'a': '专性厌氧',
        'b': '具有周鞭毛的革兰阴性菌',
        'c': '在液体培养基中混浊生长，菌液呈绿色',
        'd': '对青霉素等多种抗生索敏感',
        'e': '只引起创伤感染，较少引起败血症',
      },
      correctAnswer: 'c',
      explanation: '绿脓杆菌在液体培养基中混浊生长，菌液呈绿色，这是其产生的绿脓素所致。'
    },
    {
      id: '16_3',
      question: '下列细苗中属条件致病菌的是 ____________。',
      options: {
        'a': '金黄色葡萄球菌',
        'b': '伤寒沙门菌',
        'c': '霍乱弧菌',
        'd': '绿脓杆菌',
        'e': '结核分枝杆菌',
      },
      correctAnswer: 'd',
      explanation: '绿脓杆菌是条件致病菌，通常在机体免疫力低下时引起感染。'
    },
    {
      id: '16_4',
      question: '属于微需氧菌的有____________。',
      options: {
        'a': '空肠弯曲菌',
        'b': '绿脓杆菌',
        'c': '葡萄球菌',
        'd': '流感嗜血杆菌',
        'e': '破伤风梭菌',
      },
      correctAnswer: 'a',
      explanation: '空肠弯曲菌是微需氧菌，需要在低氧环境下生长。'
    },
    {
      id: '16_5',
      question: '百日咳杆菌的分离培养应采用 ____________。',
      options: {
        'a': '鲍金(B--G)培养基',
        'b': '巧克力培养基',
        'c': '伊红一美蓝培养基',
        'd': '罗氏培养基',
        'e': '亚碲酸钾培养基',
      },
      correctAnswer: 'a',
      explanation: '百日咳杆菌的分离培养应采用鲍金(B-G)培养基，含有血液和青霉素等成分。'
    },
    {
      id: '16_6',
      question: '百日咳免疫特点不包括 ____________。',
      options: {
        'a': '免疫力持久',
        'b': '可产生多种特异性抗体',
        'c': '细胞免疫起主要作用',
        'd': '抵抗再感染的主要因素是SIgA',
        'e': '母体血清IgG可保护新生儿不受感染',
      },
      correctAnswer: 'e',
      explanation: '百日咳免疫特点不包括母体血清IgG可保护新生儿不受感染，因为百日咳抗体不能通过胎盘。'
    },
    {
      id: '16_7',
      question: '可以鉴别流感嗜血杆菌的实验是____________。',
      options: {
        'a': '在B-G培养基上形成珍珠样菌落',
        'b': '与金黄色葡萄球菌共同培养形成“卫星现象”',
        'c': '产生水溶性色素',
        'd': '悬滴法直接镜检可见细菌活泼运动',
        'e': '在亚碲酸钾培养基上形成黑色菌落',
      },
      correctAnswer: 'b',
      explanation: '流感嗜血杆菌与金黄色葡萄球菌共同培养时，由于金黄色葡萄球菌产生的V因子，流感嗜血杆菌会在其周围生长形成“卫星现象”。'
    },
    {
      id: '16_8',
      question: '下列细菌中，引起婴幼儿急性肠炎的常见细菌是____________。',
      options: {
        'a': '霍乱弧菌',
        'b': '伤寒沙门菌',
        'c': '痢疾志贺菌',
        'd': '空肠弯曲菌',
        'e': '绿脓杆菌',
      },
      correctAnswer: 'd',
      explanation: '空肠弯曲菌是引起婴幼儿急性肠炎的常见细菌之一。'
    },
    {
      id: '16_9',
      question: '致病性最强的流感嗜血杆菌____________。',
      options: {
        'a': 'b型',
        'b': 'f型',
        'c': 'a型',
        'd': 'c型',
        'e': 'd型',
      },
      correctAnswer: 'a',
      explanation: 'b型流感嗜血杆菌的致病性最强，可引起严重的侵袭性疾病。'
    },
    {
      id: '16_10',
      question: 'Each of the following statements concerning certain gram-negative rods is correct EXCEPT____________。',
      options: {
        'a': 'Pseudomonas aeruginosa causes wound infections that are characterized by blue-green pus as a result of pyocyanin production',
        'b': 'Invasive disease caused by Haemophilus influenzae is most often due to strains possessing a type b polysaccharide capsule',
        'c': 'Legionella pneumophila infection is acquired by inhalation of aerosols from environmental water sources',
        'd': 'Whooping cough, which is caused by Bordetella pertussis, is on the rise because changing antigenicity has made the vaccine relatively ineffective',
      },
      correctAnswer: 'd',
      explanation: '百日咳发病率上升的主要原因是疫苗接种率下降，而不是疫苗抗原性变化导致疫苗相对无效。'
    },
    {
      id: '16_11',
      question: 'Which one of the following statements concerning Legionella pneumophila is correct____________。',
      options: {
        'a': 'It is part of the normal flora of the colon',
        'b': 'it cannot be grown on laboratory media',
        'c': 'It does not have a cell wall',
        'd': 'It is an important cause of pneumonia in renal transplant patient',
      },
      correctAnswer: 'd',
      explanation: '军团菌是肾移植患者肺炎的重要原因，因为免疫抑制状态使患者更容易感染。'
    },
    {
      id: '16_12',
      question: 'Which one of the following bacteria can produce the stallite phenomenon on blood agar plate around staphylococcus aureus____________。',
      options: {
        'a': 'brucella',
        'b': 'H.influenzae',
        'c': 'B.pertussis',
        'd': 'C.diphteriae',
        'e': 'proteus',
      },
      correctAnswer: 'b',
      explanation: '流感嗜血杆菌（H.influenzae）能在金黄色葡萄球菌周围产生卫星现象，因为金黄色葡萄球菌产生的V因子可以促进其生长。'
    },
  ],
    '17': [

    {
      id: '17_1',
      question: '关于支原体的生物学性状，下述错误的是____________。',
      options: {
        'a': '无细胞壁',
        'b': '能通过滤菌器',
        'c': '多形态性',
        'd': '有独特生活周期',
        'e': '细胞膜中胆固醇含量高',
      },
      correctAnswer: 'd',
      explanation: '支原体无细胞壁，能通过滤菌器，具有多形态性，细胞膜中胆固醇含量高，但没有独特的生活周期。'
    },
    {
      id: '17_2',
      question: '引起原发性非典型性肺炎的病原体是 ____________。',
      options: {
        'a': '肺炎衣原体',
        'b': '肺炎支原体',
        'c': '普氏立克次体',
        'd': '肺炎链球菌',
        'e': '奋森螺旋体',
      },
      correctAnswer: 'b',
      explanation: '肺炎支原体是引起原发性非典型性肺炎的主要病原体。'
    },
    {
      id: '17_3',
      question: '解脲脲原体引起____________。',
      options: {
        'a': '原发性非典型肺炎',
        'b': '性病淋巴肉芽肿',
        'c': '包涵体结膜炎',
        'd': '大叶性肺炎',
        'e': '非淋菌性尿道炎',
      },
      correctAnswer: 'e',
      explanation: '解脲脲原体是引起非淋菌性尿道炎的主要病原体之一。'
    },
    {
      id: '17_4',
      question: '细菌L型与支原体的共同点不包括____________。',
      options: {
        'a': '具多形性',
        'b': '能通过滤菌器',
        'c': '在固体培养基上形成荷包蛋样菌落',
        'd': '脱离诱导因素后可恢复为原来细菌型',
        'e': '主要引起间质性炎症',
      },
      correctAnswer: 'd',
      explanation: '细菌L型脱离诱导因素后可恢复为原来细菌型，而支原体是天然无细胞壁的微生物，不会恢复为原来的细菌型。'
    },
    {
      id: '17_5',
      question: '关于支原体的叙述，错误的是____________。',
      options: {
        'a': '能在人工培养基上繁殖',
        'b': '形态上具多形性',
        'c': '具有坚韧的细胞壁',
        'd': '耐青霉素',
        'e': '胞膜由3层结构组成',
      },
      correctAnswer: 'c',
      explanation: '支原体没有细胞壁，这是其与细菌的主要区别。'
    },
    {
      id: '17_6',
      question: 'Causes primary atypical pneumonia ____________。',
      options: {
        'a': 'Bacteroides fragilis',
        'b': 'Haemophilus influenzae',
        'c': 'Mycoplasma pneumoniae',
        'd': 'Chlamydia pneumoniae',
      },
      correctAnswer: 'c',
      explanation: 'Mycoplasma pneumoniae（肺炎支原体）是引起原发性非典型性肺炎的主要病原体。'
    },
    {
      id: '17_7',
      question: 'The main differnce of mycoplasma from bacterial is ____________。',
      options: {
        'a': 'binary fission',
        'b': 'without cell wall',
        'c': 'containing both DNA and RNA',
        'd': 'growing on culutre media',
        'e': 'pleomorphologic',
      },
      correctAnswer: 'b',
      explanation: '支原体与细菌的主要区别是支原体没有细胞壁（without cell wall）。'
    },
  ],
    '18': [

    {
      id: '18_1',
      question: '立克次体与细菌的主要区别是 ____________。',
      options: {
        'a': '有细胞壁和核糖体',
        'b': '含有DNA和RNA两种核酸',
        'c': '严格的细胞内寄生',
        'd': '以二分裂方式繁殖',
        'e': '对抗生素敏感',
      },
      correctAnswer: 'c',
      explanation: '立克次体与细菌的主要区别是立克次体严格的细胞内寄生，而细菌可以在细胞外独立生长。'
    },
    {
      id: '18_2',
      question: '地方性斑疹伤寒的传播媒介是____________。',
      options: {
        'a': '蜱',
        'b': '蚊',
        'c': '鼠蚤',
        'd': '恙螨',
        'e': '鼠虱',
      },
      correctAnswer: 'c',
      explanation: '地方性斑疹伤寒的传播媒介是鼠蚤，病原体为莫氏立克次体。'
    },
    {
      id: '18_3',
      question: '普氏立克次体主要的传播途径是____________。',
      options: {
        'a': '消化道',
        'b': '呼吸道',
        'c': '虱叮咬后入血',
        'd': '蚤叮咬后入血',
        'e': '性接触',
      },
      correctAnswer: 'c',
      explanation: '普氏立克次体主要通过虱叮咬后入血传播，引起流行性斑疹伤寒。'
    },
    {
      id: '18_4',
      question: '由立克次体引起的疾病是 ____________。',
      options: {
        'a': '梅毒',
        'b': '沙眼',
        'c': '莱姆病',
        'd': '性病淋巴肉芽肿',
        'e': '恙虫病',
      },
      correctAnswer: 'e',
      explanation: '恙虫病是由恙虫病立克次体引起的疾病，其他选项中梅毒由梅毒螺旋体引起，沙眼由沙眼衣原体引起，莱姆病由伯氏疏螺旋体引起，性病淋巴肉芽肿由沙眼衣原体引起。'
    },
    {
      id: '18_5',
      question: '立克次体与普通变形杆菌有共同抗原，其化学成分是____________。',
      options: {
        'a': '肽聚糖',
        'b': '耐热性多糖',
        'c': '不耐热多糖',
        'd': '脂多糖',
        'e': '脂蛋白',
      },
      correctAnswer: 'd',
      explanation: '立克次体与普通变形杆菌有共同抗原，其化学成分是脂多糖，这是外斐反应的基础。'
    },
    {
      id: '18_6',
      question: '协助诊断立克次体病的交叉凝集试验是____________。',
      options: {
        'a': '锡克实验',
        'b': '间接血凝实验',
        'c': '肥达实验',
        'd': '外斐反应',
        'e': '旧结核菌素实验',
      },
      correctAnswer: 'd',
      explanation: '外斐反应是协助诊断立克次体病的交叉凝集试验，利用立克次体与普通变形杆菌的共同抗原。'
    },
    {
      id: '18_7',
      question: '以下哪项选作外斐反应是错误的____________。',
      options: {
        'a': 'Q热',
        'b': '地方性斑疹伤寒',
        'c': '流行性斑疹伤寒',
        'd': '普氏立克次体',
        'e': '恙虫病',
      },
      correctAnswer: 'a',
      explanation: 'Q热由柯克斯体引起，与变形杆菌无共同抗原，不能用外斐反应诊断。'
    },
    {
      id: '18_8',
      question: '关于立克次体哪项叙述不正确____________。',
      options: {
        'a': '立克次体病多为自然疫源性疾病',
        'b': '与革兰阴性菌类似',
        'c': '致病物质主要是内毒素',
        'd': '对广谱抗生素和磺胺类敏感',
        'e': '二分裂繁殖',
      },
      correctAnswer: 'd',
      explanation: '立克次体对广谱抗生素敏感，但对磺胺类药物不敏感，反而可能促进其生长。'
    },
    {
      id: '18_9',
      question: '患者有丛林接触史，腿部皮肤被叮咬，局部出现溃疡。伴有高热，皮疹。做外斐试验，患者血清与变形杆菌OXk株抗原反应的抗体，效价为1：320，可能的病原体是 ____________。',
      options: {
        'a': '普氏立克次体',
        'b': '恙虫病立克次体',
        'c': '伤寒沙门菌',
        'd': '布鲁菌',
        'e': 'Q热柯克斯体',
      },
      correctAnswer: 'b',
      explanation: '恙虫病立克次体感染后，患者血清与变形杆菌OXk株抗原反应呈阳性，且患者有丛林接触史、皮肤叮咬溃疡和高热皮疹等症状，符合恙虫病的表现。'
    },
    {
      id: '18_10',
      question: 'Which one of the following illnesses is NOT a zoonosis____________。',
      options: {
        'a': 'Typhoid fever',
        'b': 'Q fever',
        'c': 'Tularemia',
        'd': 'Rocky Mountain spotted fever',
      },
      correctAnswer: 'a',
      explanation: 'Typhoid fever（伤寒）不是人畜共患病，而是由伤寒沙门菌引起的人类特有的疾病。'
    },
    {
      id: '18_11',
      question: 'Each of the following statements concerning epidemic typhus is correct EXCEPT: ____________。',
      options: {
        'a': 'The disease is charcterized by a rash',
        'b': 'lhe Wail Felix test can aid in diagnosis of the disease',
        'c': 'The disease is caused by a rickettsia',
        'd': 'The causative organism is transmitted from rodents to humans by a tick',
      },
      correctAnswer: 'd',
      explanation: '流行性斑疹伤寒的病原体是普氏立克次体，通过人虱传播，而不是通过蜱从啮齿动物传播给人类。'
    },
    {
      id: '18_12',
      question: 'Each of thc following statements concerning Q fever is correct EXCEPT: ____________。',
      options: {
        'a': 'Rash is a prominent feature',
        'b': 'transmitted by respiratory aerosol',
        'c': 'Farm animals are an important reservoir',
        'd': 'It is caused by Coxiella burnetii',
      },
      correctAnswer: 'a',
      explanation: 'Q热的一个特点是通常不出现皮疹，其他选项都是正确的。'
    },
    {
      id: '18_13',
      question: 'Which one of the following bacteria containing the cross antigen of some rickettsiae____________。',
      options: {
        'a': 'poteus',
        'b': 'E.coli',
        'c': 'S.typhi',
        'd': 'Shigella',
        'e': 'Brucella',
      },
      correctAnswer: 'a',
      explanation: '变形杆菌（Proteus）含有与某些立克次体的交叉抗原，这是外斐反应的基础。'
    },
    {
      id: '18_14',
      question: 'The vector of Rickettsia prowazekii is ____________。',
      options: {
        'a': 'human louse',
        'b': 'flea',
        'c': 'mosquito',
        'd': 'tick',
        'e': 'mite chipper',
      },
      correctAnswer: 'a',
      explanation: '普氏立克次体（Rickettsia prowazekii）的传播媒介是人虱（human louse）。'
    },
  ],
    '19': [

    {
      id: '19_1',
      question: '有关衣原体发育周期的描述不正确的是 A．原体具有感染性 B．，有____________。',
      options: {
        'a': '原体具感染性',
        'b': '始体较原体大，有致密的核质',
        'c': '始体在发育周期中无感染性',
        'd': '始体在空泡内以二分裂形式繁殖形成子代原体',
        'e': '衣原体每个发育周期需要48-72小时',
      },
      correctAnswer: 'b',
      explanation: '始体较原体大，但始体的核质疏松，而不是致密的核质。'
    },
    {
      id: '19_2',
      question: '有关沙眼衣原体致病性的描述正确的是 ____________。',
      options: {
        'a': '沙眼生物变种的14个血清型均可引起沙眼',
        'b': '．沙眼生物变种A．B．Ba．C四个血清型可引起包涵体结膜炎',
        'c': '沙眼生物变种A．B．Ba．C四个血清型可引起泌尿生殖道感染',
        'd': '性病淋巴肉芽肿生物变种(LGV)可引起性病淋巴肉芽肿',
        'e': '沙眼生物变种D-K血清型可引起沙眼',
      },
      correctAnswer: 'd',
      explanation: '性病淋巴肉芽肿生物变种(LGV)可引起性病淋巴肉芽肿，其他选项中沙眼生物变种A、B、Ba、C四个血清型引起沙眼，D-K血清型引起泌尿生殖道感染和包涵体结膜炎。'
    },
    {
      id: '19_3',
      question: '首次成功分离培养出沙眼衣原体的学者是____________。',
      options: {
        'a': '汤飞凡',
        'b': '郭霍',
        'c': '巴斯德',
        'd': '李斯德',
        'e': '琴纳',
      },
      correctAnswer: 'a',
      explanation: '汤飞凡是中国科学家，首次成功分离培养出沙眼衣原体。'
    },
    {
      id: '19_4',
      question: '以下哪种微生物具有独特的发育周期____________。',
      options: {
        'a': '支原体',
        'b': '衣原体',
        'c': '立克次体',
        'd': '螺旋体',
        'e': '放线菌',
      },
      correctAnswer: 'b',
      explanation: '衣原体具有独特的发育周期，包括原体和始体两个阶段。'
    },
    {
      id: '19_5',
      question: '可通过眼-眼及眼-手-眼传播又可通过性接触传播的病原体是____________。',
      options: {
        'a': '沙眼衣原体沙眼亚种',
        'b': '性病淋巴肉芽肿亚种',
        'c': '鼠亚种',
        'd': '肺炎衣原体',
        'e': '鹦鹉衣原体',
      },
      correctAnswer: 'a',
      explanation: '沙眼衣原体沙眼亚种可通过眼-眼及眼-手-眼传播引起沙眼，也可通过性接触传播引起泌尿生殖道感染。'
    },
    {
      id: '19_6',
      question: 'Each of the following statements concerning Chlamydia trachomatis is correct EXCEPT: ____________。',
      options: {
        'a': 'It is an important cause of nongonococcal urethritis',
        'b': 'It is the cause of lymphograauloma venereum',
        'c': 'it is an important cause of subacute bacteriai endocarditis',
        'd': 'It is an important cause of conjunctivitis',
      },
      correctAnswer: 'c',
      explanation: '沙眼衣原体不是亚急性细菌性心内膜炎的重要原因，亚急性细菌性心内膜炎主要由链球菌等细菌引起。'
    },
    {
      id: '19_7',
      question: 'The soil is the natural habitat for certain microorganisms of medical importance. Which one of the following is LEAST likely to reside there?____________。',
      options: {
        'a': 'Clostridium tetani',
        'b': 'Mycobacterium intracellulare',
        'c': 'Bacillus anthracis',
        'd': 'Chlamydia trachomatis',
      },
      correctAnswer: 'd',
      explanation: '沙眼衣原体是严格的细胞内寄生微生物，不能在土壤中生存，而其他选项中的微生物都可以在土壤中存在。'
    },
    {
      id: '19_8',
      question: 'Several pathogens are transmitted either during gestation or at birth.Which one of the following is LEAST likely to be transmitted at these times____________。',
      options: {
        'a': 'Haemophilus influenzae',
        'b': 'Treponema pallidum',
        'c': 'Neisseria gonorrhoeae',
        'd': 'Chlamydia trachomatis',
      },
      correctAnswer: 'a',
      explanation: '流感嗜血杆菌主要通过呼吸道飞沫传播，较少通过母婴传播，而其他选项中的病原体都可以在妊娠或分娩时传播。'
    },
  ],
    '20': [

    {
      id: '20_1',
      question: '与钩端螺旋体不相符合的叙述是____________。',
      options: {
        'a': '暗视野显微镜观察形似细小珍珠排列的细链，一端或两端呈钩状',
        'b': '电镜观察最外层为细胞壁构成',
        'c': '用Fontana镀银染色法染成棕褐色',
        'd': '制备疫苗时可用无蛋白的培养基培养',
        'e': '抵抗力强，可在湿土或水中存活数月',
      },
      correctAnswer: 'b',
      explanation: '钩端螺旋体的最外层是外膜，而不是细胞壁。'
    },
    {
      id: '20_2',
      question: '人畜共患的螺旋体病是____________。',
      options: {
        'a': '钩端螺旋体病',
        'b': '回归热',
        'c': '梅毒',
        'd': '雅司病',
        'e': '奋森咽喉炎',
      },
      correctAnswer: 'a',
      explanation: '钩端螺旋体病是人畜共患的螺旋体病，其他选项中回归热、梅毒、雅司病和奋森咽喉炎主要是人类疾病。'
    },
    {
      id: '20_3',
      question: '关于钩端螺旋体病的描述，错误的是 ____________。',
      options: {
        'a': '人主要是通过接触钩端螺旋体污染的水或土壤而被感染',
        'b': '钩端螺旋体致病与其产生的内毒素样物质有关',
        'c': '钩端螺旋体可进入血液引起钩端螺旋体血症',
        'd': '钩端螺旋体病可累及全身多个脏器',
        'e': '钩端螺旋体病患者病后可获得以细胞免疫为主的特异性免疫力',
      },
      correctAnswer: 'e',
      explanation: '钩端螺旋体病患者病后可获得的是体液免疫为主的特异性免疫力，而不是细胞免疫为主。'
    },
    {
      id: '20_4',
      question: '关于梅毒螺旋体致病性与免疫性的描述，错误的是____________。',
      options: {
        'a': '人是梅毒的唯一传染源',
        'b': '．梅毒螺旋体是通过内毒素和外毒素致病',
        'c': '一、二期梅毒传染性强，而对机体的破坏性小',
        'd': '三期梅毒传染性小，而对机体的破坏性大',
        'e': '梅毒的免疫力为感染性免疫',
      },
      correctAnswer: 'b',
      explanation: '梅毒螺旋体没有内毒素和外毒素，其致病机制主要与螺旋体的侵袭力和宿主的免疫反应有关。'
    },
    {
      id: '20_5',
      question: '梅毒患者出现一期临床症状，检查梅毒螺旋体的最适标本是 ____________。',
      options: {
        'a': '局部淋巴结抽出液',
        'b': '梅毒疹渗出液',
        'c': '硬下疳渗出液',
        'd': '动脉瘤组织',
        'e': '脊髓痨组织',
      },
      correctAnswer: 'c',
      explanation: '梅毒一期的典型表现是硬下疳，此时硬下疳渗出液中含有大量梅毒螺旋体，是检查梅毒螺旋体的最适标本。'
    },
    {
      id: '20_6',
      question: '国内较常用的检测梅毒的USR试验使用的抗原是 ____________。',
      options: {
        'a': '梅毒螺旋体抗原',
        'b': '非致病性螺旋体抗原',
        'c': '变形杆菌OXK抗原',
        'd': '类脂质抗原',
        'e': '绵羊红细胞',
      },
      correctAnswer: 'd',
      explanation: 'USR试验使用的是类脂质抗原，这是一种非特异性的梅毒血清学试验。'
    },
    {
      id: '20_7',
      question: '螺旋体在分类学上属于____________。',
      options: {
        'a': 'chlamydia',
        'b': 'mycoplasma',
        'c': 'rickettsia',
        'd': 'bacterium',
        'e': 'fungus',
      },
      correctAnswer: 'd',
      explanation: '螺旋体在分类学上属于细菌（bacterium），是一类特殊的细菌。'
    },
    {
      id: '20_8',
      question: '伯氏疏螺旋体引起的疾病是____________。',
      options: {
        'a': '莱姆病',
        'b': '回归热',
        'c': '梅毒',
        'd': '恙虫病',
        'e': '钩体病',
      },
      correctAnswer: 'a',
      explanation: '伯氏疏螺旋体是引起莱姆病的病原体。'
    },
    {
      id: '20_9',
      question: '钩体的主要感染途径是____________。',
      options: {
        'a': '呼吸道',
        'b': '泌尿道',
        'c': '皮肤微小伤口',
        'd': '昆虫叮咬',
        'e': '消化道',
      },
      correctAnswer: 'c',
      explanation: '钩体的主要感染途径是通过皮肤微小伤口进入人体。'
    },
    {
      id: '20_10',
      question: '钩端螺旋体主要的传染源是____________。',
      options: {
        'a': '病人',
        'b': '带菌者',
        'c': '鸟类',
        'd': '鼠类和猪',
        'e': '犬',
      },
      correctAnswer: 'd',
      explanation: '钩端螺旋体主要的传染源是鼠类和猪。'
    },
    {
      id: '20_11',
      question: 'Which one of the following types of organisms is NOT an obligate intracellular parasite and therefore can replicate on bacteriologic media ____________。',
      options: {
        'a': 'chlamydia',
        'b': 'Mycoplasma',
        'c': 'Adenovirus',
        'd': 'Rickettsia',
      },
      correctAnswer: 'b',
      explanation: '支原体（Mycoplasma）不是严格的细胞内寄生微生物，可以在细菌培养基上生长繁殖。'
    },
    {
      id: '20_12',
      question: 'Each of the following statements concerning spirochetes is correct EXCEPT:____________。',
      options: {
        'a': 'Species of Borrelia are part of the normal flora of the mouth',
        'b': 'Species of Borrelia cause a tick-home disease called relapsing fever',
        'c': 'The species of Leptospira that cause leptospirosis grow primarily in humans and are usually transmitted by human-to human contact',
        'd': 'Species of Treponema cause syphilis and yaws',
      },
      correctAnswer: 'c',
      explanation: '引起钩端螺旋体病的钩端螺旋体主要在动物体内生长，通常通过接触污染的水或土壤传播，而不是通过人传人的方式传播。'
    },
    {
      id: '20_13',
      question: 'Which one of the following conditions is not suitable for leptospirosis____________。',
      options: {
        'a': 'nature-original disease',
        'b': 'water transmission',
        'c': 'many clinical symptomes and signs',
        'd': 'rat and pig as main infectious sources',
        'e': 'treatment with antitoxin',
      },
      correctAnswer: 'e',
      explanation: '钩端螺旋体病的治疗不需要使用抗毒素，而是使用抗生素治疗。'
    },
    {
      id: '20_14',
      question: 'The main infectious source of leptospira is ____________。',
      options: {
        'a': 'patient',
        'b': 'carrier',
        'c': 'bird',
        'd': 'rat and pig',
        'e': 'dog',
      },
      correctAnswer: 'd',
      explanation: '钩端螺旋体的主要传染源是鼠类和猪（rat and pig）。'
    },
  ]
  }
};

export { categories, questions };
