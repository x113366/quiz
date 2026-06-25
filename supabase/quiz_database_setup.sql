-- Quiz database setup for Supabase SQL Editor
-- Creates the schema and keeps only the Virus question bank.

create table if not exists public.quiz_categories (
  id text primary key,
  name text not null,
  description text not null default '',
  icon text not null default '📝',
  color text not null default '#666666',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_chapters (
  id text not null,
  category_id text not null references public.quiz_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (category_id, id)
);

create table if not exists public.quiz_questions (
  id text primary key,
  category_id text not null,
  chapter_id text not null,
  question text not null,
  options jsonb not null,
  correct_answer jsonb not null,
  explanation text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (category_id, chapter_id)
    references public.quiz_chapters(category_id, id)
    on delete cascade
);

create index if not exists quiz_chapters_category_id_idx
  on public.quiz_chapters(category_id);

create index if not exists quiz_questions_category_chapter_idx
  on public.quiz_questions(category_id, chapter_id, sort_order);

alter table public.quiz_categories enable row level security;
alter table public.quiz_chapters enable row level security;
alter table public.quiz_questions enable row level security;

drop policy if exists "Public read quiz categories" on public.quiz_categories;
create policy "Public read quiz categories"
  on public.quiz_categories
  for select
  using (true);

drop policy if exists "Public read quiz chapters" on public.quiz_chapters;
create policy "Public read quiz chapters"
  on public.quiz_chapters
  for select
  using (true);

drop policy if exists "Public read quiz questions" on public.quiz_questions;
create policy "Public read quiz questions"
  on public.quiz_questions
  for select
  using (true);

-- Seed only the Virus question bank.

begin;

delete from public.quiz_questions;
delete from public.quiz_chapters;
delete from public.quiz_categories;

insert into public.quiz_categories (id, name, description, icon, color, sort_order) values ('virus', '病毒', '病毒学专门题库', '🦠', '#2E7D32', 1);
insert into public.quiz_chapters (id, category_id, name, description, sort_order) values ('hepatitis_virus', 'virus', '肝炎病毒', '肝炎病毒相关题目', 1);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_1', 'virus', 'hepatitis_virus', '下列哪一种肝炎病毒属于DNA病毒？', '{"a":"HAV","b":"HBV","c":"HCV","d":"HEV"}'::jsonb, '"b"'::jsonb, 'HBV是五型肝炎病毒里唯一的DNA病毒，为“部分双链环状DNA”。其余HAV、HCV、HDV、HEV均为RNA病毒。', 1);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_2', 'virus', 'hepatitis_virus', '下列哪组肝炎病毒均通过粪-口途径传播？', '{"a":"HBV、HCV","b":"HAV、HEV","c":"HBV、HDV","d":"HCV、HEV"}'::jsonb, '"b"'::jsonb, 'HAV和HEV都经粪-口传播，特点是无包膜、急性感染、不慢性化。', 2);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_3', 'virus', 'hepatitis_virus', 'HAV的核酸类型是：', '{"a":"双链DNA","b":"单负链RNA","c":"单正链RNA","d":"环形RNA"}'::jsonb, '"c"'::jsonb, 'HAV为单正链RNA病毒。 记忆：HAV、HCV、HEV都是“+RNA”。', 3);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_4', 'virus', 'hepatitis_virus', '下列哪种肝炎病毒属于缺陷病毒？', '{"a":"HAV","b":"HBV","c":"HCV","d":"HDV"}'::jsonb, '"d"'::jsonb, 'HDV是缺陷病毒，必须依赖HBV提供HBsAg才能复制和装配。', 4);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_5', 'virus', 'hepatitis_virus', '下列关于HAV的描述，正确的是：', '{"a":"有包膜","b":"易形成慢性感染","c":"仅有一个血清型","d":"主要经血液传播"}'::jsonb, '"c"'::jsonb, 'HAV只有一个血清型，因此疫苗保护效果稳定。HAV无包膜，经粪-口传播，不慢性化。', 5);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_6', 'virus', 'hepatitis_virus', 'HAV对下列哪种环境耐受性较强？', '{"a":"高温","b":"强碱","c":"酸性环境","d":"紫外线"}'::jsonb, '"c"'::jsonb, 'HAV耐酸，pH1环境仍可存活，因此适合经胃肠道传播。', 6);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_7', 'virus', 'hepatitis_virus', 'HAV感染后最主要的传播媒介是：', '{"a":"血液","b":"精液","c":"粪便污染的水和食物","d":"飞沫"}'::jsonb, '"c"'::jsonb, 'HAV主要通过被粪便污染的水、食物传播，尤其贝类海产品。', 7);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_8', 'virus', 'hepatitis_virus', 'HAV感染后最具有诊断意义的抗体是：', '{"a":"抗-HAV IgG","b":"抗-HAV IgM","c":"抗-HBs","d":"抗-HBc"}'::jsonb, '"b"'::jsonb, '抗-HAV IgM提示近期急性感染。IgG提示既往感染或免疫。', 8);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_9', 'virus', 'hepatitis_virus', 'HAV最主要的致病机制是：', '{"a":"病毒直接溶解肝细胞","b":"细菌毒素损伤","c":"免疫损伤","d":"血栓形成"}'::jsonb, '"c"'::jsonb, 'HAV肝损伤主要由免疫反应导致，而不是病毒直接细胞毒作用。', 9);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_10', 'virus', 'hepatitis_virus', '关于HAV感染特点，错误的是：', '{"a":"可出现隐性感染","b":"可形成慢性携带状态","c":"感染后可获得终身免疫","d":"多数预后良好"}'::jsonb, '"b"'::jsonb, 'HAV不会形成慢性感染或慢性携带状态。', 10);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_11', 'virus', 'hepatitis_virus', 'HEV感染最危险的人群是：', '{"a":"儿童","b":"老年男性","c":"孕妇","d":"糖尿病患者"}'::jsonb, '"c"'::jsonb, 'HEV对孕妇尤其危险，死亡率可高达20%。', 11);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_12', 'virus', 'hepatitis_virus', 'HEV的主要传播途径是：', '{"a":"血液传播","b":"虫媒传播","c":"粪-口传播","d":"性传播"}'::jsonb, '"c"'::jsonb, 'HEV与HAV一样，经粪-口传播。', 12);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_13', 'virus', 'hepatitis_virus', '下列关于HBV结构的描述，正确的是：', '{"a":"无包膜RNA病毒","b":"有包膜DNA病毒","c":"有包膜单负链RNA病毒","d":"无包膜DNA病毒"}'::jsonb, '"b"'::jsonb, 'HBV是有包膜DNA病毒。', 13);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_14', 'virus', 'hepatitis_virus', 'HBV完整具有感染性的病毒颗粒称为：', '{"a":"Delta颗粒","b":"Dane颗粒","c":"小球形颗粒","d":"管状颗粒"}'::jsonb, '"b"'::jsonb, 'Dane颗粒是完整有感染性的HBV颗粒，直径约42nm。', 14);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_15', 'virus', 'hepatitis_virus', 'HBV小球形颗粒的特点是：', '{"a":"含完整DNA","b":"有感染性","c":"仅由HBsAg组成","d":"含HBcAg"}'::jsonb, '"c"'::jsonb, '小球形颗粒和管状颗粒主要由HBsAg组成，无核心、无感染性。', 15);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_16', 'virus', 'hepatitis_virus', 'HBV复制过程中最关键的酶是：', '{"a":"RNA聚合酶","b":"DNA连接酶","c":"逆转录酶","d":"蛋白酶"}'::jsonb, '"c"'::jsonb, 'HBV DNA聚合酶具有逆转录酶活性，是复制关键。', 16);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_17', 'virus', 'hepatitis_virus', 'HBV进入肝细胞依赖的受体是：', '{"a":"CD4","b":"ACE2","c":"NTCP","d":"CCR5"}'::jsonb, '"c"'::jsonb, 'HBV通过NTCP受体进入肝细胞。', 17);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_18', 'virus', 'hepatitis_virus', 'HBV复制过程中形成稳定存在模板的是：', '{"a":"pgRNA","b":"HBsAg","c":"cccDNA","d":"HBeAg"}'::jsonb, '"c"'::jsonb, 'cccDNA是HBV在细胞核内形成的稳定模板，是慢性感染难清除的重要原因。', 18);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_19', 'virus', 'hepatitis_virus', 'HBV的前基因组RNA（pgRNA）主要作用是：', '{"a":"编码脂多糖","b":"作为逆转录模板","c":"抑制补体","d":"激活溶酶体"}'::jsonb, '"b"'::jsonb, 'pgRNA既是mRNA，也是逆转录生成DNA的模板。', 19);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_20', 'virus', 'hepatitis_virus', 'HBV病毒DNA复制的直接模板是：', '{"a":"cccDNA","b":"pgRNA","c":"HBsAg","d":"HBcAg"}'::jsonb, '"b"'::jsonb, 'HBV DNA复制直接以pgRNA为模板进行逆转录。', 20);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_21', 'virus', 'hepatitis_virus', '下列哪项提示HBV复制活跃、传染性强？', '{"a":"抗-HBs阳性","b":"抗-HBe阳性","c":"HBeAg阳性","d":"抗-HBc IgG阳性"}'::jsonb, '"c"'::jsonb, 'HBeAg阳性提示病毒复制活跃、传染性强。', 21);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_22', 'virus', 'hepatitis_virus', '下列哪项提示机体已具有乙肝免疫力？', '{"a":"HBsAg阳性","b":"抗-HBs阳性","c":"HBeAg阳性","d":"HBV DNA阳性"}'::jsonb, '"b"'::jsonb, '抗-HBs阳性说明机体已有保护性免疫。', 22);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_23', 'virus', 'hepatitis_virus', 'HBV窗口期最重要的检测指标是：', '{"a":"HBsAg","b":"抗-HBs","c":"抗-HBc IgM","d":"HBeAg"}'::jsonb, '"c"'::jsonb, '窗口期只有抗-HBc IgM能检测到。 窗口期特点：HBsAg消失，但抗-HBs尚未出现。', 23);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_24', 'virus', 'hepatitis_virus', 'HBV相关肾炎主要属于：', '{"a":"I型变态反应","b":"II型变态反应","c":"III型变态反应","d":"IV型变态反应"}'::jsonb, '"c"'::jsonb, 'HBV相关肾炎属于III型变态反应，即免疫复合物沉积。', 24);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_25', 'virus', 'hepatitis_virus', 'HBV感染导致肝细胞损伤最主要依赖：', '{"a":"病毒毒素","b":"CTL细胞免疫","c":"中性粒细胞","d":"补体直接裂解"}'::jsonb, '"b"'::jsonb, 'HBV主要通过CTL介导的细胞免疫损伤肝细胞。', 25);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_26', 'virus', 'hepatitis_virus', '新生儿感染HBV后容易慢性化，主要因为：', '{"a":"病毒毒力增强","b":"肝脏代谢弱","c":"免疫耐受","d":"补体缺乏"}'::jsonb, '"c"'::jsonb, '新生儿免疫系统不成熟，容易形成免疫耐受，因此慢性化率极高。', 26);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_27', 'virus', 'hepatitis_virus', 'HBV疫苗属于：', '{"a":"灭活疫苗","b":"减毒活疫苗","c":"基因工程疫苗","d":"核酸疫苗"}'::jsonb, '"c"'::jsonb, '乙肝疫苗是酵母重组基因工程疫苗。', 27);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_28', 'virus', 'hepatitis_virus', '医护人员HBV暴露后紧急预防应使用：', '{"a":"青霉素","b":"干扰素","c":"HBIG","d":"阿昔洛韦"}'::jsonb, '"c"'::jsonb, 'HBIG（乙肝高效价免疫球蛋白）用于暴露后紧急预防。', 28);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_29', 'virus', 'hepatitis_virus', 'HCV属于：', '{"a":"无包膜DNA病毒","b":"有包膜RNA病毒","c":"双链RNA病毒","d":"缺陷病毒"}'::jsonb, '"b"'::jsonb, 'HCV属于有包膜单正链RNA病毒，黄病毒科。', 29);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_30', 'virus', 'hepatitis_virus', 'HCV最主要的传播途径是：', '{"a":"呼吸道传播","b":"粪-口传播","c":"血液传播","d":"虫媒传播"}'::jsonb, '"c"'::jsonb, 'HCV主要通过血液传播。', 30);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_31', 'virus', 'hepatitis_virus', 'HCV感染后最常见的结局是：', '{"a":"完全清除","b":"急性暴发性肝炎","c":"慢性感染","d":"终身隐性感染但无肝损伤"}'::jsonb, '"c"'::jsonb, 'HCV最容易慢性化，约70%转为持续性感染。', 31);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_32', 'virus', 'hepatitis_virus', 'HCV实验室确诊的金标准是：', '{"a":"ELISA检测抗体","b":"RT-PCR检测RNA","c":"肝酶检测","d":"血常规"}'::jsonb, '"b"'::jsonb, 'RT-PCR检测HCV RNA是确诊金标准。', 32);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_33', 'virus', 'hepatitis_virus', 'HCV窗口期时最容易出现的结果是：', '{"a":"RNA阴性、抗体阳性","b":"RNA阳性、抗体阴性","c":"RNA阴性、抗体阴性","d":"RNA阳性、HBsAg阳性"}'::jsonb, '"b"'::jsonb, 'HCV窗口期特点：RNA已阳性，但抗体尚未出现，因此ELISA可能漏检。', 33);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_34', 'virus', 'hepatitis_virus', 'HDV必须依赖哪种病毒辅助复制？', '{"a":"HAV","b":"HBV","c":"HCV","d":"HEV"}'::jsonb, '"b"'::jsonb, 'HDV必须依赖HBV。', 34);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_35', 'virus', 'hepatitis_virus', 'HDV包膜来源于：', '{"a":"HCV包膜蛋白","b":"自身编码蛋白","c":"HBsAg","d":"HBcAg"}'::jsonb, '"c"'::jsonb, 'HDV包膜来源于HBsAg。', 35);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_36', 'virus', 'hepatitis_virus', 'HDV与HBV同时感染时最容易引起：', '{"a":"慢性携带","b":"爆发性肝炎","c":"无症状感染","d":"肠炎"}'::jsonb, '"b"'::jsonb, 'HBV与HDV同时感染容易引起严重急性爆发性肝炎。', 36);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_37', 'virus', 'hepatitis_virus', '预防HDV最有效的方法是：', '{"a":"接种HAV疫苗","b":"接种HBV疫苗","c":"注射抗生素","d":"接种HCV疫苗"}'::jsonb, '"b"'::jsonb, '预防HBV即可预防HDV，因为HDV离不开HBV。', 37);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_38', 'virus', 'hepatitis_virus', '下列哪种肝炎病毒最容易慢性化？', '{"a":"HAV","b":"HEV","c":"HCV","d":"HDV同时感染"}'::jsonb, '"c"'::jsonb, 'HCV最容易慢性化，且隐匿性强。', 38);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_39', 'virus', 'hepatitis_virus', '关于五型肝炎病毒共同点，正确的是：', '{"a":"都有包膜","b":"都可慢性化","c":"都以肝脏为主要靶器官","d":"都通过血液传播"}'::jsonb, '"c"'::jsonb, '五种肝炎病毒共同点：主要靶器官均为肝脏。', 39);
insert into public.quiz_questions (id, category_id, chapter_id, question, options, correct_answer, explanation, sort_order) values ('hepatitis_virus_40', 'virus', 'hepatitis_virus', '下列关于肝炎病毒的说法，错误的是：', '{"a":"HAV和HEV主要经粪-口传播","b":"HBV可通过母婴传播","c":"HCV已有广泛应用疫苗","d":"HDV依赖HBV存在"}'::jsonb, '"c"'::jsonb, '目前尚无广泛应用的HCV疫苗，因此这项错误。', 40);

commit;
