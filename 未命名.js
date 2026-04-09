// 医学微生物学 - 肠道杆菌 题库
const questionBank = {
  // 分类信息
  categories: [
    {
      id: "C002",
      name: "医学微生物学-肠道杆菌",
      description: "涵盖链球菌、大肠杆菌、志贺菌、沙门菌、伤寒杆菌等肠道致病菌的分类、鉴定、致病、诊断与预防",
      icon: "enterobacteria",
      color: "#4CAF50"
    }
  ],
  // 题目列表
  questions: {
    C002: [
      {
        id: "Q001",
        question: "引起人类疾病的链球菌中90%属于",
        options: {
          a: "甲型溶血性链球菌",
          b: "A群链球菌",
          c: "B群链球菌",
          d: "肺炎链球菌",
          e: "D群链球菌"
        },
        correctAnswer: "b",
        explanation: "引起人类疾病的链球菌90%为A群链球菌（化脓性链球菌）"
      },
      {
        id: "Q002",
        question: "鉴别肠道致病菌与非致病菌的主要依据",
        options: {
          a: "是否发酵葡萄糖",
          b: "是否分解乳糖",
          c: "是否具有鞭毛",
          d: "是否具有菌毛",
          e: "是否具有芽胞"
        },
        correctAnswer: "b",
        explanation: "肠道非致病菌多分解乳糖，致病菌一般不分解乳糖"
      },
      {
        id: "Q003",
        question: "发酵乳糖的肠道杆菌是",
        options: {
          a: "大肠杆菌",
          b: "志贺菌",
          c: "沙门菌",
          d: "变形杆菌",
          e: "耶尔森菌"
        },
        correctAnswer: "a",
        explanation: "大肠杆菌可快速发酵乳糖，其余多不发酵或迟缓发酵"
      },
      {
        id: "Q004",
        question: "迟缓发酵乳糖的志贺菌为",
        options: {
          a: "痢疾志贺菌",
          b: "福氏志贺菌",
          c: "鲍氏志贺菌",
          d: "宋内志贺菌",
          e: "以上都不是"
        },
        correctAnswer: "d",
        explanation: "宋内志贺菌可迟缓发酵乳糖，其他志贺菌均不发酵乳糖"
      },
      {
        id: "Q005",
        question: "大肠杆菌IMVIC试验的结果应为",
        options: {
          a: "+、-、+、-",
          b: "-、+、-、+",
          c: "+、+、-、-",
          d: "-、-、+、+",
          e: "+、-、-、-"
        },
        correctAnswer: "c",
        explanation: "大肠埃希菌IMViC结果：++--（吲哚+、甲基红+、VP-、枸橼酸盐-）"
      },
      {
        id: "Q006",
        question: "急性中毒性菌痢的主要临床症状表现有",
        options: {
          a: "全身中毒症状",
          b: "腹痛、腹泻",
          c: "剧烈呕吐",
          d: "脓血黏液便",
          e: "相对缓脉"
        },
        correctAnswer: "a",
        explanation: "急性中毒性菌痢以全身严重中毒症状为主，肠道症状轻微或缺如"
      },
      {
        id: "Q007",
        question: "伤寒的恢复主要依赖于",
        options: {
          a: "体液免疫",
          b: "细胞免疫",
          c: "补体的作用",
          d: "WBC的吞噬作用",
          e: "抗生素的作用"
        },
        correctAnswer: "b",
        explanation: "伤寒沙门菌为胞内寄生菌，恢复主要依赖细胞免疫"
      },
      {
        id: "Q008",
        question: "肠热症第2—3周肠壁淋巴结坏死，形成溃疡的原因是",
        options: {
          a: "外毒素的作用",
          b: "内毒素的作用",
          c: "细菌的侵袭力",
          d: "肠毒素的作用",
          e: "变态反应"
        },
        correctAnswer: "e",
        explanation: "肠热症肠道溃疡由Ⅳ型超敏反应（变态反应）导致"
      },
      {
        id: "Q009",
        question: "志贺菌属常引起",
        options: {
          a: "细菌性痢疾",
          b: "阿米巴痢疾",
          c: "慢性肠炎",
          d: "假膜性肠炎",
          e: "肠热症"
        },
        correctAnswer: "a",
        explanation: "志贺菌是细菌性痢疾（菌痢）的病原菌"
      },
      {
        id: "Q010",
        question: "疑为肠热症的病人常需抽血做细菌学检查，最好的采血样时期是",
        options: {
          a: "发病第1周",
          b: "发病第2周",
          c: "发病第4周",
          d: "疾病全程",
          e: "恢复期"
        },
        correctAnswer: "a",
        explanation: "肠热症第1周血液细菌阳性率最高，适合采血培养"
      },
      {
        id: "Q011",
        question: "Widal test 可诊断的疾病是",
        options: {
          a: "斑疹伤寒",
          b: "肠热症",
          c: "中毒性痢疾",
          d: "鼠伤寒沙门菌所至的食物中毒",
          e: "恙虫病"
        },
        correctAnswer: "b",
        explanation: "肥达试验（Widal test）用于辅助诊断肠热症（伤寒、副伤寒）"
      },
      {
        id: "Q012",
        question: "肠热症并发症之一是肠穿孔，其原因是",
        options: {
          a: "细菌的直接作用",
          b: "毒素的直接作用",
          c: "肠壁组织发生变态反应",
          d: "肠梗阻所至",
          e: "机体免疫功能下降"
        },
        correctAnswer: "c",
        explanation: "肠穿孔由肠壁淋巴组织超敏反应坏死、溃疡加深所致"
      },
      {
        id: "Q013",
        question: "预防伤寒应选",
        options: {
          a: "类毒素",
          b: "氯霉素",
          c: "菌苗",
          d: "抗毒素",
          e: "Vi抗体"
        },
        correctAnswer: "c",
        explanation: "伤寒预防采用伤寒Vi菌苗等活菌/死菌苗"
      },
      {
        id: "Q014",
        question: "下列症状中，与伤寒病表现不符的是",
        options: {
          a: "持续性高热",
          b: "相对缓脉",
          c: "皮肤出现玫瑰疹",
          d: "表情淡漠",
          e: "口腔黏膜出现柯氏斑"
        },
        correctAnswer: "e",
        explanation: "柯氏斑是麻疹特征，伤寒无此表现"
      },
      {
        id: "Q015",
        question: "对痢疾病人做微生物学检查，下列各项错误的是",
        options: {
          a: "分离培养细菌作生化鉴定",
          b: "取粘液性或脓血便涂片，革兰染色镜检",
          c: "取粪便标本增菌培养",
          d: "取标本接种于肠道选择培养基培养",
          e: "最后进行血清学鉴定"
        },
        correctAnswer: "b",
        explanation: "粪便标本直接涂片革兰染色无诊断意义，需分离培养"
      },
      {
        id: "Q016",
        question: "在致病过程中，可引起两次菌血症的细菌是",
        options: {
          a: "霍乱弧菌",
          b: "伤寒沙门菌",
          c: "淋球菌",
          d: "痢疾志贺菌",
          e: "结核分支杆菌"
        },
        correctAnswer: "b",
        explanation: "伤寒沙门菌可引发两次菌血症，依次导致全身扩散与肠道定植"
      },
      {
        id: "Q017",
        question: "与立克次体有交叉抗原的肠道杆菌是",
        options: {
          a: "沙门菌的某些菌株",
          b: "志贺菌的某些菌株",
          c: "埃希菌的某些菌株",
          d: "变形杆菌的某些菌株",
          e: "克雷伯菌的某些菌株"
        },
        correctAnswer: "d",
        explanation: "变形杆菌OX株与立克次体有共同抗原，用于外斐试验"
      },
      {
        id: "Q018",
        question: "致病性大肠杆菌致病特点是",
        options: {
          a: "只引起肠道感染",
          b: "不引起泌尿生殖系感染",
          c: "内、外毒素同时致病",
          d: "外毒素可引起严重毒血症",
          e: "不引起败血症"
        },
        correctAnswer: "c",
        explanation: "致病性大肠埃希菌可同时产生内毒素与外毒素致病"
      },
      {
        id: "Q019",
        question: "伤寒慢性携带者的致病菌检出率最高的标本是",
        options: {
          a: "血液",
          b: "粪便",
          c: "尿液",
          d: "痰",
          e: "胆汁"
        },
        correctAnswer: "e",
        explanation: "伤寒慢性携带者细菌多储留于胆囊，胆汁检出率最高"
      },
      {
        id: "Q020",
        question: "能产生志贺样毒素的大肠埃希菌是",
        options: {
          a: "ETEC",
          b: "EIEC",
          c: "EPEC",
          d: "EHEC",
          e: "EAggEC"
        },
        correctAnswer: "d",
        explanation: "肠出血性大肠埃希菌（EHEC）产生志贺样毒素Vero毒素"
      },
      {
        id: "Q021",
        question: "Culture media for isolation of S.typhi from stool is",
        options: {
          a: "blood plate",
          b: "S.S plate",
          c: "Korthof media",
          d: "chocolate plate",
          e: "common plate"
        },
        correctAnswer: "b",
        explanation: "SS平板（沙门志贺琼脂）是粪便分离伤寒沙门菌的选择培养基"
      },
      {
        id: "Q022",
        question: "The specimen for isolating enteric fever pathogen in first week of the disease is",
        options: {
          a: "stool",
          b: "urine",
          c: "blood",
          d: "vomitus",
          e: "salivary fluid"
        },
        correctAnswer: "c",
        explanation: "肠热症第1周取血液标本分离病原菌阳性率最高"
      },
      {
        id: "Q023",
        question: "Which one of the following bacteria can produce both endotocin and exotoxin",
        options: {
          a: "M.tuberculosis",
          b: "C.diphtheriae",
          c: "staphylococcus",
          d: "N.meningitidis",
          e: "shigella"
        },
        correctAnswer: "e",
        explanation: "志贺菌可同时产生内毒素与志贺外毒素"
      }
    ]
  }
};

// 导出供前端/考试系统使用
export default questionBank;
