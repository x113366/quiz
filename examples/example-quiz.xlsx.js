import fs from 'node:fs';
import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';

const sourcePath = fileURLToPath(new URL('../题库材料/寄生虫', import.meta.url));
const outputPath = fileURLToPath(new URL('./example-quiz.xlsx', import.meta.url));

const normalizeText = (value) =>
  String(value || '')
    .replace(/\r/g, '')
    .replace(/\*\*/g, '')
    .replace(/先判断对错\s*在简单解析/g, '')
    .trim();

const sourceText = fs.readFileSync(sourcePath, 'utf8');
const [questionSection = '', answerSection = ''] = sourceText.split('# 寄生虫学是非题答案+简要解析');

const questionsByNumber = new Map();
questionSection
  .split('\n')
  .map((line) => normalizeText(line))
  .forEach((line) => {
    const match = line.match(/^(\d+)[.．]\s*(.+)$/);

    if (!match) {
      return;
    }

    questionsByNumber.set(Number(match[1]), normalizeText(match[2]));
  });

const answerPattern = /(\d+)[.．]\s*\*\*([√×])\*\*\s*\n解析：([\s\S]*?)(?=\n\d+[.．]\s*\*\*[√×]\*\*|\s*$)/g;
const answersByNumber = new Map();
let answerMatch;

while ((answerMatch = answerPattern.exec(answerSection)) !== null) {
  answersByNumber.set(Number(answerMatch[1]), {
    correctAnswer: answerMatch[2] === '√' ? 'a' : 'b',
    explanation: normalizeText(answerMatch[3])
  });
}

const questionRows = Array.from(questionsByNumber.entries()).map(([number, question]) => {
  const answer = answersByNumber.get(number);

  if (!answer) {
    throw new Error(`第 ${number} 题缺少答案或解析`);
  }

  return {
    category_id: 'parasitology',
    category_name: '寄生虫学',
    category_description: '医学寄生虫学题库',
    category_icon: '🧫',
    category_color: '#7A5C2E',
    chapter_id: 'true_false',
    chapter_name: '是非题',
    chapter_description: '寄生虫学是非判断题',
    question_id: `parasitology_tf_${String(number).padStart(3, '0')}`,
    question: `${question}（判断题）`,
    option_a: '正确',
    option_b: '错误',
    correct_answer: answer.correctAnswer,
    explanation: answer.explanation,
    sort_order: number
  };
});

if (questionRows.length !== 80) {
  throw new Error(`寄生虫题目数量应为 80，当前解析到 ${questionRows.length}`);
}

const workbook = XLSX.utils.book_new();
const questionSheet = XLSX.utils.json_to_sheet(questionRows, {
  header: [
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
    'correct_answer',
    'explanation',
    'sort_order'
  ]
});

const guideSheet = XLSX.utils.aoa_to_sheet([
  ['字段', '说明'],
  ['category_id', '分类 ID，同一分类保持一致'],
  ['category_name', '分类名称'],
  ['chapter_id', '章节 ID，同一章节保持一致'],
  ['chapter_name', '章节名称'],
  ['question_id', '题目唯一 ID，不能重复'],
  ['option_a / option_b / ...', '选项内容；选项数不限，是非题使用 A=正确、B=错误'],
  ['correct_answer', '正确答案；是非题中 a 表示正确，b 表示错误'],
  ['explanation', '题目解析'],
  ['sort_order', '题目排序']
]);

XLSX.utils.book_append_sheet(workbook, questionSheet, '题目');
XLSX.utils.book_append_sheet(workbook, guideSheet, '填写说明');
XLSX.writeFile(workbook, outputPath);

console.log(`Excel文件创建成功：${outputPath}`);
console.log(`已整理寄生虫学是非题 ${questionRows.length} 题`);
