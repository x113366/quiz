export const QUESTION_BANK_TEMPLATE_HEADERS = [
  'category_id',
  'category_name',
  'category_description',
  'category_icon',
  'category_color',
  'chapter_id',
  'chapter_name',
  'chapter_description',
  'question_id',
  'question',
  'option_a',
  'option_b',
  'option_c',
  'option_d',
  'correct_answer',
  'explanation',
  'sort_order'
];

const TEMPLATE_ROWS = [
  {
    category_id: 'virus',
    category_name: '病毒学',
    category_description: '医学微生物学病毒章节',
    category_icon: '🦠',
    category_color: '#285a3a',
    chapter_id: 'hepatitis_virus',
    chapter_name: '肝炎病毒',
    chapter_description: '肝炎病毒相关题目',
    question_id: 'virus_hepatitis_001',
    question: '下列哪一种肝炎病毒属于DNA病毒？',
    option_a: 'HAV',
    option_b: 'HBV',
    option_c: 'HCV',
    option_d: 'HEV',
    correct_answer: 'b',
    explanation: 'HBV是五型肝炎病毒里唯一的DNA病毒。',
    sort_order: 1
  },
  {
    category_id: 'virus',
    category_name: '病毒学',
    category_description: '医学微生物学病毒章节',
    category_icon: '🦠',
    category_color: '#285a3a',
    chapter_id: 'hepatitis_virus',
    chapter_name: '肝炎病毒',
    chapter_description: '肝炎病毒相关题目',
    question_id: 'virus_hepatitis_002',
    question: '下列关于肝炎病毒的说法，正确的是：',
    option_a: 'HAV主要经粪-口传播',
    option_b: 'HBV可经血液传播',
    option_c: 'HCV容易慢性化',
    option_d: 'HDV依赖HBV存在',
    correct_answer: 'a,b,c,d',
    explanation: '这是一道多选题，正确答案用英文逗号分隔。',
    sort_order: 2
  },
  {
    category_id: 'parasitology',
    category_name: '寄生虫学',
    category_description: '医学寄生虫学题库',
    category_icon: '🧫',
    category_color: '#7A5C2E',
    chapter_id: 'true_false',
    chapter_name: '是非题',
    chapter_description: '寄生虫学是非判断题',
    question_id: 'parasitology_tf_001',
    question: '蝇类传病的方式主要是机械性传播疾病，而不是通过吸血将病原注入人体。（判断题）',
    option_a: '正确',
    option_b: '错误',
    correct_answer: 'a',
    explanation: '判断题可只填写 option_a 和 option_b，不需要补齐 option_c、option_d。',
    sort_order: 3
  }
];

const REQUIRED_FIELDS = [
  'category_id',
  'category_name',
  'chapter_id',
  'chapter_name',
  'question_id',
  'question'
];

const normalizeId = (value) => String(value || '').trim();

const normalizeText = (value) => String(value || '')
  .replace(/\r\n?/g, '\n')
  .replace(/\\n/g, '\n')
  .trim();

const normalizeAnswer = (value) => {
  const answers = String(value || '')
    .toLowerCase()
    .split(/[,，、\s]+/)
    .map((answer) => answer.trim())
    .filter(Boolean);

  return [...new Set(answers)];
};

const getRowNumber = (index) => index + 2;

const getOptionKeyFromHeader = (header) => {
  const normalizedHeader = String(header || '').trim();
  const englishMatch = normalizedHeader.match(/^option_([a-z]+)$/i);
  if (englishMatch) {
    return englishMatch[1].toLowerCase();
  }

  const chineseMatch = normalizedHeader.match(/^选项([a-z])$/i);
  if (chineseMatch) {
    return chineseMatch[1].toLowerCase();
  }

  return null;
};

const getOptionsFromRow = (row) => {
  const options = {};

  Object.entries(row).forEach(([header, value]) => {
    const optionKey = getOptionKeyFromHeader(header);
    const optionValue = normalizeText(value);

    if (optionKey && optionValue) {
      options[optionKey] = optionValue;
    }
  });

  return Object.fromEntries(
    Object.entries(options).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  );
};

let xlsxModulePromise = null;

const normalizeXlsxModule = (module) => {
  if (module?.read && module?.utils) {
    return module;
  }

  if (module?.default?.read && module?.default?.utils) {
    return module.default;
  }

  return module;
};

const loadXlsx = () => {
  if (!xlsxModulePromise) {
    xlsxModulePromise = import('xlsx')
      .catch(async (error) => {
        console.warn('Failed to load local xlsx bundle, falling back to CDN:', error);
        try {
          return await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm');
        } catch (fallbackError) {
          console.warn('Failed to load xlsx CDN fallback:', fallbackError);
          throw new Error('Excel 解析模块加载失败，请刷新页面后重试，或重启本地开发服务器');
        }
      })
      .then(normalizeXlsxModule);
  }

  return xlsxModulePromise;
};

const IMPORT_QUESTION_TYPES = {
  choice: 'choice',
  true_false: 'true_false',
  fill_blank: 'fill_blank'
};

const getFillBlankAnswerText = (row) => (
  normalizeText(row.answer_text || row.correct_answer || row.answer || row['答案'])
);

const getFilledQuestion = (row, answerText) => (
  normalizeText(row.filled_question || row.answer_question || row['带答案题干']) ||
  (answerText ? `${normalizeText(row.question)}\n\n答案：${answerText}` : '')
);

const rowsToQuestionBank = (rows, { questionType = IMPORT_QUESTION_TYPES.choice } = {}) => {
  const categoriesById = new Map();
  const chaptersByCategory = new Map();
  const questions = {};
  const seenQuestionIds = new Set();
  const errors = [];

  rows.forEach((rawRow, index) => {
    const rowNumber = getRowNumber(index);
    const row = { ...rawRow };
    const isFillBlank = questionType === IMPORT_QUESTION_TYPES.fill_blank;

    REQUIRED_FIELDS.forEach((field) => {
      if (!String(row[field] || '').trim()) {
        errors.push(`第 ${rowNumber} 行缺少 ${field}`);
      }
    });
    if (!isFillBlank && !String(row.correct_answer || '').trim()) {
      errors.push(`第 ${rowNumber} 行缺少 correct_answer`);
    }

    const categoryId = normalizeId(row.category_id);
    const chapterId = normalizeId(row.chapter_id);
    const questionId = normalizeId(row.question_id);
    const options = getOptionsFromRow(row);
    const optionKeys = Object.keys(options);
    const fillBlankAnswerText = getFillBlankAnswerText(row);
    const correctAnswer = isFillBlank ? [] : normalizeAnswer(row.correct_answer);

    if (seenQuestionIds.has(questionId)) {
      errors.push(`第 ${rowNumber} 行 question_id 重复：${questionId}`);
    }
    seenQuestionIds.add(questionId);

    if (!isFillBlank && optionKeys.length === 0) {
      errors.push(`第 ${rowNumber} 行至少需要填写一个 option_ 开头的选项列`);
    }

    if (isFillBlank && !fillBlankAnswerText && !String(row.explanation || '').trim()) {
      errors.push(`第 ${rowNumber} 行填空题需要填写 correct_answer、answer_text 或 explanation 作为答案区内容`);
    }

    const invalidAnswers = isFillBlank
      ? []
      : correctAnswer.filter((answer) => !optionKeys.includes(answer));
    if (invalidAnswers.length > 0) {
      errors.push(`第 ${rowNumber} 行 correct_answer 只能填写已有选项：${optionKeys.join(',')}`);
    }

    if (!categoryId || !chapterId || !questionId) {
      return;
    }

    if (!categoriesById.has(categoryId)) {
      categoriesById.set(categoryId, {
        id: categoryId,
        name: normalizeText(row.category_name || '未命名分类'),
        description: normalizeText(row.category_description || '暂无描述'),
        icon: normalizeText(row.category_icon || '📝'),
        color: normalizeText(row.category_color || '#666666'),
        chapters: []
      });
      chaptersByCategory.set(categoryId, new Map());
      questions[categoryId] = {};
    }

    const chapterMap = chaptersByCategory.get(categoryId);
    if (!chapterMap.has(chapterId)) {
      const chapter = {
        id: chapterId,
        name: normalizeText(row.chapter_name || '未命名章节'),
        description: normalizeText(row.chapter_description || '暂无描述')
      };
      chapterMap.set(chapterId, chapter);
      categoriesById.get(categoryId).chapters.push(chapter);
      questions[categoryId][chapterId] = [];
    }

    questions[categoryId][chapterId].push({
      id: questionId,
      question: normalizeText(row.question),
      options,
      correctAnswer: isFillBlank
        ? fillBlankAnswerText
        : correctAnswer.length === 1 ? correctAnswer[0] : correctAnswer,
      explanation: normalizeText(row.explanation || '暂无解释'),
      questionType: isFillBlank ? IMPORT_QUESTION_TYPES.fill_blank : questionType,
      filledQuestion: isFillBlank ? getFilledQuestion(row, fillBlankAnswerText) : '',
      answerText: isFillBlank ? fillBlankAnswerText : '',
      sortOrder: Number(row.sort_order || index + 1)
    });
  });

  if (errors.length > 0) {
    throw new Error(errors.slice(0, 8).join('；'));
  }

  Object.values(questions).forEach((chapters) => {
    Object.values(chapters).forEach((chapterQuestions) => {
      chapterQuestions.sort((a, b) => a.sortOrder - b.sortOrder);
      chapterQuestions.forEach((question) => {
        delete question.sortOrder;
      });
    });
  });

  return {
    categories: Array.from(categoriesById.values()),
    questions
  };
};

export const parseQuestionBankWorkbook = async (file, options = {}) => {
  const XLSX = await loadXlsx();
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets['题目'] || workbook.Sheets[workbook.SheetNames[0]];

  if (!sheet) {
    throw new Error('Excel 中没有可读取的工作表');
  }

  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: '',
    raw: false
  });

  if (rows.length === 0) {
    throw new Error('Excel 中没有题目数据');
  }

  return rowsToQuestionBank(rows, options);
};

export const downloadQuestionBankTemplate = async () => {
  const XLSX = await loadXlsx();
  const workbook = XLSX.utils.book_new();
  const questionSheet = XLSX.utils.json_to_sheet(TEMPLATE_ROWS, {
    header: QUESTION_BANK_TEMPLATE_HEADERS
  });
  const guideSheet = XLSX.utils.aoa_to_sheet([
    ['字段', '说明'],
    ['category_id', '分类英文或拼音 ID，同一分类保持一致'],
    ['category_name', '分类名称，例如：病毒学'],
    ['chapter_id', '章节英文或拼音 ID，同一章节保持一致'],
    ['chapter_name', '章节名称，例如：肝炎病毒'],
    ['question_id', '题目唯一 ID，不能重复'],
    ['option_a / option_b / ...', '选项内容，数量不限；判断题可只填 option_a=正确、option_b=错误'],
    ['correct_answer', '选择题填 a 或 a,b,c；填空题导入时可作为答案文本'],
    ['explanation', '题目解析，可为空'],
    ['sort_order', '题目排序数字，可为空'],
    ['填空题导入', '在网页导入前手动选择“填空题”；question 填带空原题，可额外添加 filled_question 或 answer_text 列']
  ]);

  XLSX.utils.book_append_sheet(workbook, questionSheet, '题目');
  XLSX.utils.book_append_sheet(workbook, guideSheet, '填写说明');
  XLSX.writeFile(workbook, '题库导入模板.xlsx');
};
