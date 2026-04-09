export const categories = [
  {
    id: 'science',
    name: '科学知识',
    description: '探索自然奥秘，测试科学素养',
    icon: '🔬',
    color: '#4CAF50'
  },
  {
    id: 'history',
    name: '历史文化',
    description: '穿越时空长河，领略文明风采',
    icon: '📜',
    color: '#2196F3'
  },
  {
    id: 'literature',
    name: '文学常识',
    description: '品味经典名著，感受文字魅力',
    icon: '📚',
    color: '#9C27B0'
  },
  {
    id: 'tech',
    name: '科技前沿',
    description: '聚焦科技发展，把握时代脉搏',
    icon: '💻',
    color: '#FF9800'
  }
];

export const questions = {
  science: [
    {
      id: 's1',
      question: '地球绕太阳公转一周需要多长时间？',
      options: {
        a: '365 天',
        b: '365.25 天',
        c: '360 天',
        d: '366 天'
      },
      correctAnswer: 'b',
      explanation: '地球绕太阳公转一周的实际时间是 365.25 天，这就是为什么每四年需要一个闰年来补偿那 0.25 天。'
    },
    {
      id: 's2',
      question: '人体最大的器官是什么？',
      options: {
        a: '肝脏',
        b: '心脏',
        c: '皮肤',
        d: '肺'
      },
      correctAnswer: 'c',
      explanation: '皮肤是人体最大的器官，成人皮肤总面积约为 1.5-2 平方米。'
    },
    {
      id: 's3',
      question: '水的化学式是什么？',
      options: {
        a: 'H2O2',
        b: 'HO2',
        c: 'H2O',
        d: 'OH'
      },
      correctAnswer: 'c',
      explanation: '水的化学式是 H2O，由两个氢原子和一个氧原子组成。'
    },
    {
      id: 's4',
      question: '光在真空中的传播速度约为多少？',
      options: {
        a: '3×10^6 km/s',
        b: '3×10^5 km/s',
        c: '3×10^4 km/s',
        d: '3×10^3 km/s'
      },
      correctAnswer: 'b',
      explanation: '光在真空中的传播速度约为 3×10^5 km/s，即每秒约 30 万公里。'
    },
    {
      id: 's5',
      question: '太阳系中最大的行星是哪一颗？',
      options: {
        a: '土星',
        b: '天王星',
        c: '木星',
        d: '海王星'
      },
      correctAnswer: 'c',
      explanation: '木星是太阳系中最大的行星，其质量是其他所有行星质量总和的 2.5 倍。'
    },
    {
      id: 's6',
      question: 'DNA 的双螺旋结构是由谁发现的？',
      options: {
        a: '达尔文',
        b: '沃森和克里克',
        c: '孟德尔',
        d: '巴斯德'
      },
      correctAnswer: 'b',
      explanation: '1953 年，詹姆斯·沃森和弗朗西斯·克里克发现了 DNA 的双螺旋结构。'
    },
    {
      id: 's7',
      question: '空气中含量最多的气体是什么？',
      options: {
        a: '氧气',
        b: '二氧化碳',
        c: '氮气',
        d: '氦气'
      },
      correctAnswer: 'c',
      explanation: '空气中氮气约占 78%，氧气约占 21%，其余为其他气体。'
    },
    {
      id: 's8',
      question: '人类的染色体有多少对？',
      options: {
        a: '22 对',
        b: '23 对',
        c: '24 对',
        d: '46 对'
      },
      correctAnswer: 'b',
      explanation: '正常人类体细胞中有 23 对染色体，共 46 条。'
    },
    {
      id: 's9',
      question: '声音在哪种介质中传播最快？',
      options: {
        a: '空气',
        b: '水',
        c: '钢铁',
        d: '真空'
      },
      correctAnswer: 'c',
      explanation: '声音在固体中传播最快，钢铁中的声速约为 5000 m/s，远高于空气和水。声音不能在真空中传播。'
    },
    {
      id: 's10',
      question: '地球的地壳中最丰富的元素是什么？',
      options: {
        a: '硅',
        b: '铝',
        c: '氧',
        d: '铁'
      },
      correctAnswer: 'c',
      explanation: '氧是地壳中含量最丰富的元素，约占地壳质量的 46.6%。'
    },
    {
      id: 's11',
      question: '哪种维生素可以通过晒太阳在人体内合成？',
      options: {
        a: '维生素 A',
        b: '维生素 B',
        c: '维生素 C',
        d: '维生素 D'
      },
      correctAnswer: 'd',
      explanation: '维生素 D 可以通过皮肤暴露在紫外线下在人体内合成。'
    }
  ],
  history: [
    {
      id: 'h1',
      question: '中国历史上第一个统一的中央集权制国家是哪个朝代？',
      options: {
        a: '汉朝',
        b: '唐朝',
        c: '秦朝',
        d: '周朝'
      },
      correctAnswer: 'c',
      explanation: '公元前 221 年，秦始皇统一六国，建立了中国历史上第一个统一的中央集权制国家——秦朝。'
    },
    {
      id: 'h2',
      question: '郑和下西洋发生在哪个朝代？',
      options: {
        a: '宋朝',
        b: '元朝',
        c: '明朝',
        d: '清朝'
      },
      correctAnswer: 'c',
      explanation: '郑和七下西洋发生在明朝永乐至宣德年间（1405-1433 年）。'
    },
    {
      id: 'h3',
      question: '第二次世界大战爆发的时间是？',
      options: {
        a: '1914 年',
        b: '1937 年',
        c: '1939 年',
        d: '1941 年'
      },
      correctAnswer: 'c',
      explanation: '第二次世界大战于 1939 年 9 月 1 日德国入侵波兰时爆发。'
    },
    {
      id: 'h4',
      question: '古埃及文明发源于哪条河流？',
      options: {
        a: '幼发拉底河',
        b: '尼罗河',
        c: '恒河',
        d: '黄河'
      },
      correctAnswer: 'b',
      explanation: '古埃及文明发源于尼罗河流域，尼罗河的定期泛滥为农业提供了肥沃的土壤。'
    },
    {
      id: 'h5',
      question: '中国历史上在位时间最长的皇帝是？',
      options: {
        a: '康熙帝',
        b: '乾隆帝',
        c: '汉武帝',
        d: '唐太宗'
      },
      correctAnswer: 'b',
      explanation: '乾隆帝在位 60 年（1735-1796 年），是中国历史上在位时间最长的皇帝。'
    },
    {
      id: 'h6',
      question: '文艺复兴运动起源于哪个国家？',
      options: {
        a: '法国',
        b: '英国',
        c: '意大利',
        d: '西班牙'
      },
      correctAnswer: 'c',
      explanation: '文艺复兴运动起源于 14 世纪的意大利，随后传播到欧洲其他国家。'
    },
    {
      id: 'h7',
      question: '秦始皇陵兵马俑位于今天的哪个省份？',
      options: {
        a: '河南省',
        b: '陕西省',
        c: '山西省',
        d: '山东省'
      },
      correctAnswer: 'b',
      explanation: '秦始皇陵兵马俑位于陕西省西安市临潼区。'
    },
    {
      id: 'h8',
      question: '美国独立宣言发表于哪一年？',
      options: {
        a: '1774 年',
        b: '1775 年',
        c: '1776 年',
        d: '1777 年'
      },
      correctAnswer: 'c',
      explanation: '美国独立宣言于 1776 年 7 月 4 日发表，这一天后来成为美国独立日。'
    },
    {
      id: 'h9',
      question: '丝绸之路的起点是哪里？',
      options: {
        a: '洛阳',
        b: '长安（今西安）',
        c: '北京',
        d: '南京'
      },
      correctAnswer: 'b',
      explanation: '丝绸之路的起点是长安（今西安），这是西汉时期张骞出使西域开辟的贸易通道。'
    },
    {
      id: 'h10',
      question: '法国大革命爆发的标志是？',
      options: {
        a: '攻占巴士底狱',
        b: '处死路易十六',
        c: '发表人权宣言',
        d: '拿破仑政变'
      },
      correctAnswer: 'a',
      explanation: '1789 年 7 月 14 日巴黎人民攻占巴士底狱，标志着法国大革命的爆发。'
    },
    {
      id: 'h11',
      question: '中国历史上唯一的正统女皇帝是？',
      options: {
        a: '吕后',
        b: '慈禧太后',
        c: '武则天',
        d: '孝庄太后'
      },
      correctAnswer: 'c',
      explanation: '武则天是中国历史上唯一的正统女皇帝，建立武周政权，在位 15 年。'
    }
  ],
  literature: [
    {
      id: 'l1',
      question: '《红楼梦》的作者是谁？',
      options: {
        a: '罗贯中',
        b: '施耐庵',
        c: '曹雪芹',
        d: '吴承恩'
      },
      correctAnswer: 'c',
      explanation: '《红楼梦》的作者是清代作家曹雪芹，后四十回一般认为是高鹗续写。'
    },
    {
      id: 'l2',
      question: '鲁迅的原名是什么？',
      options: {
        a: '周作人',
        b: '周树人',
        c: '周建人',
        d: '周平'
      },
      correctAnswer: 'b',
      explanation: '鲁迅原名周树人，字豫才，浙江绍兴人。'
    },
    {
      id: 'l3',
      question: '《哈姆雷特》的作者是谁？',
      options: {
        a: '狄更斯',
        b: '雨果',
        c: '莎士比亚',
        d: '托尔斯泰'
      },
      correctAnswer: 'c',
      explanation: '《哈姆雷特》是英国剧作家威廉·莎士比亚的著名悲剧作品。'
    },
    {
      id: 'l4',
      question: '中国第一部诗歌总集是？',
      options: {
        a: '《楚辞》',
        b: '《诗经》',
        c: '《乐府》',
        d: '《唐诗三百首》'
      },
      correctAnswer: 'b',
      explanation: '《诗经》是中国最早的诗歌总集，收录了西周初年至春秋中期的诗歌 305 篇。'
    },
    {
      id: 'l5',
      question: '《百年孤独》的作者是谁？',
      options: {
        a: '博尔赫斯',
        b: '马尔克斯',
        c: '略萨',
        d: '聂鲁达'
      },
      correctAnswer: 'b',
      explanation: '《百年孤独》是哥伦比亚作家加西亚·马尔克斯的代表作，是魔幻现实主义的经典。'
    },
    {
      id: 'l6',
      question: '《三国演义》中"桃园三结义"的三人是？',
      options: {
        a: '刘备、关羽、张飞',
        b: '刘备、诸葛亮、关羽',
        c: '曹操、刘备、孙权',
        d: '关羽、张飞、赵云'
      },
      correctAnswer: 'a',
      explanation: '桃园三结义指的是刘备、关羽、张飞三人在桃园结为异姓兄弟。'
    },
    {
      id: 'l7',
      question: '《老人与海》的作者是谁？',
      options: {
        a: '马克·吐温',
        b: '海明威',
        c: '福克纳',
        d: '菲茨杰拉德'
      },
      correctAnswer: 'b',
      explanation: '《老人与海》是美国作家欧内斯特·海明威的中篇小说，1953 年获普利策奖。'
    },
    {
      id: 'l8',
      question: '李白的字是什么？',
      options: {
        a: '子美',
        b: '太白',
        c: '乐天',
        d: '子瞻'
      },
      correctAnswer: 'b',
      explanation: '李白字太白，号青莲居士，是唐代伟大的浪漫主义诗人。'
    },
    {
      id: 'l9',
      question: '《悲惨世界》的作者是谁？',
      options: {
        a: '巴尔扎克',
        b: '福楼拜',
        c: '雨果',
        d: '莫泊桑'
      },
      correctAnswer: 'c',
      explanation: '《悲惨世界》是法国作家维克多·雨果的长篇小说。'
    },
    {
      id: 'l10',
      question: '《论语》主要记录了谁的言行？',
      options: {
        a: '孟子',
        b: '孔子',
        c: '老子',
        d: '墨子'
      },
      correctAnswer: 'b',
      explanation: '《论语》是记录孔子及其弟子言行的语录体著作，是儒家经典之一。'
    },
    {
      id: 'l11',
      question: '《傲慢与偏见》的作者是谁？',
      options: {
        a: '夏洛蒂·勃朗特',
        b: '艾米莉·勃朗特',
        c: '简·奥斯汀',
        d: '乔治·艾略特'
      },
      correctAnswer: 'c',
      explanation: '《傲慢与偏见》是英国女作家简·奥斯汀的代表作。'
    }
  ],
  tech: [
    {
      id: 't1',
      question: '世界上第一台电子计算机诞生于哪一年？',
      options: {
        a: '1942 年',
        b: '1946 年',
        c: '1950 年',
        d: '1955 年'
      },
      correctAnswer: 'b',
      explanation: '世界上第一台电子计算机 ENIAC 于 1946 年在美国宾夕法尼亚大学诞生。'
    },
    {
      id: 't2',
      question: '互联网的前身是什么？',
      options: {
        a: 'NSFNET',
        b: 'ARPANET',
        c: 'CSNET',
        d: 'BITNET'
      },
      correctAnswer: 'b',
      explanation: 'ARPANET（阿帕网）是互联网的前身，由美国国防部高级研究计划局于 1969 年建立。'
    },
    {
      id: 't3',
      question: 'HTTP 协议默认使用的端口是？',
      options: {
        a: '21',
        b: '22',
        c: '80',
        d: '443'
      },
      correctAnswer: 'c',
      explanation: 'HTTP 协议默认使用 80 端口，HTTPS 默认使用 443 端口。'
    },
    {
      id: 't4',
      question: 'CPU 的主要功能是什么？',
      options: {
        a: '存储数据',
        b: '显示图像',
        c: '处理指令和数据',
        d: '网络连接'
      },
      correctAnswer: 'c',
      explanation: 'CPU（中央处理器）是计算机的核心部件，主要负责处理指令和数据运算。'
    },
    {
      id: 't5',
      question: '以下哪种不是操作系统？',
      options: {
        a: 'Windows',
        b: 'Linux',
        c: 'Python',
        d: 'macOS'
      },
      correctAnswer: 'c',
      explanation: 'Python 是一种编程语言，不是操作系统。其他三个都是操作系统。'
    },
    {
      id: 't6',
      question: '5G 网络中的"G"代表什么？',
      options: {
        a: 'Generation（代）',
        b: 'Gigabit（千兆）',
        c: 'Global（全球）',
        d: 'Gateway（网关）'
      },
      correctAnswer: 'a',
      explanation: '5G 中的"G"代表 Generation（代），5G 即第五代移动通信技术。'
    },
    {
      id: 't7',
      question: '人工智能的英文缩写是？',
      options: {
        a: 'AR',
        b: 'VR',
        c: 'AI',
        d: 'MR'
      },
      correctAnswer: 'c',
      explanation: '人工智能的英文是 Artificial Intelligence，缩写为 AI。'
    },
    {
      id: 't8',
      question: '区块链技术的核心特征是？',
      options: {
        a: '集中式存储',
        b: '去中心化',
        c: '匿名访问',
        d: '高速传输'
      },
      correctAnswer: 'b',
      explanation: '区块链的核心特征是去中心化，数据分布在多个节点上，没有中央控制机构。'
    },
    {
      id: 't9',
      question: 'IPv6 地址的长度是多少位？',
      options: {
        a: '32 位',
        b: '64 位',
        c: '128 位',
        d: '256 位'
      },
      correctAnswer: 'c',
      explanation: 'IPv6 地址长度为 128 位，相比 IPv4 的 32 位提供了更多的地址空间。'
    },
    {
      id: 't10',
      question: '量子计算机的基本计算单元是？',
      options: {
        a: '比特（bit）',
        b: '字节（byte）',
        c: '量子比特（qubit）',
        d: '字（word）'
      },
      correctAnswer: 'c',
      explanation: '量子计算机的基本计算单元是量子比特（qubit），它可以同时处于 0 和 1 的叠加态。'
    },
    {
      id: 't11',
      question: '以下哪种编程语言主要用于网页前端开发？',
      options: {
        a: 'Java',
        b: 'Python',
        c: 'JavaScript',
        d: 'C++'
      },
      correctAnswer: 'c',
      explanation: 'JavaScript 是网页前端开发的主要编程语言，用于实现网页的交互功能。'
    }
  ]
};
