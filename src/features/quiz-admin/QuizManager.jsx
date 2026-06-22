import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getAllCategories,
  getCategoryQuestions,
  loadQuizData,
  mergeLocalQuestionBank,
  uploadLocalQuestionBankToCloud
} from '../question-bank/quizStore';
import { canEditQuestions, getCurrentUser, subscribeToAuthChanges } from '../auth/authStore';
import {
  downloadQuestionBankTemplate,
  parseQuestionBankWorkbook
} from './excelQuestionBankService';
import './QuizManager.css';

export default function QuizManager() {
  const [categories, setCategories] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isUploadingCloud, setIsUploadingCloud] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [syncMessage, setSyncMessage] = useState('');
  const [importMessage, setImportMessage] = useState('');
  const [cloudMessage, setCloudMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [importQuestionType, setImportQuestionType] = useState('choice');
  const canUploadCloud = canEditQuestions(currentUser);

  const refreshLocalSummary = useCallback(async () => {
    const localCategories = await getAllCategories();
    const counts = {};

    for (const category of localCategories) {
      const questions = await getCategoryQuestions(category.id);
      counts[category.id] = questions.length;
    }

    setCategories(localCategories);
    setQuestionCounts(counts);
  }, []);

  useEffect(() => {
    return subscribeToAuthChanges(setCurrentUser);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadQuestionBank = async () => {
      try {
        if (isMounted) {
          await refreshLocalSummary();
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || '本地题库加载失败');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadQuestionBank();

    return () => {
      isMounted = false;
    };
  }, [refreshLocalSummary]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setErrorMessage('');
    setSyncMessage('');

    try {
      await loadQuizData({ force: true });
      await refreshLocalSummary();
      setSyncMessage('云端题库已合并到本地');
    } catch (error) {
      setErrorMessage(error.message || '题库同步失败');
    } finally {
      setIsSyncing(false);
      setIsLoading(false);
    }
  };

  const handleCloudUpload = async () => {
    if (!canUploadCloud || !currentUser?.id) return;

    setIsUploadingCloud(true);
    setErrorMessage('');
    setSyncMessage('');
    setImportMessage('');
    setCloudMessage('');

    try {
      const result = await uploadLocalQuestionBankToCloud(currentUser.id);
      setCloudMessage(
        `已上传云端：${result.category_count} 个分类，${result.chapter_count} 个章节，${result.question_count} 道题`
      );
    } catch (error) {
      setErrorMessage(error.message || '云端上传失败');
    } finally {
      setIsUploadingCloud(false);
    }
  };

  const handleLocalImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setErrorMessage('');
    setImportMessage('');
    setSyncMessage('');

    try {
      const importedQuestionBank = await parseQuestionBankWorkbook(file, {
        questionType: importQuestionType
      });
      mergeLocalQuestionBank(importedQuestionBank);
      await refreshLocalSummary();
      const importedTotal = Object.values(importedQuestionBank.questions)
        .flatMap((chapters) => Object.values(chapters))
        .reduce((sum, chapterQuestions) => sum + chapterQuestions.length, 0);
      const typeText = importQuestionType === 'fill_blank' ? '填空题' : '选择题/判断题';
      setImportMessage(`已按${typeText}合并导入本地题库：${importedQuestionBank.categories.length} 个分类，${importedTotal} 道题`);
    } catch (error) {
      setErrorMessage(error.message || 'Excel 导入失败');
    } finally {
      setIsImporting(false);
      setIsLoading(false);
      event.target.value = '';
    }
  };

  const totalQuestions = useMemo(() => {
    return Object.values(questionCounts).reduce((sum, count) => sum + count, 0);
  }, [questionCounts]);

  return (
    <div className="quiz-manager">
      <h1>题库管理</h1>

      <div className="upload-section">
        <h2>题库同步</h2>
        <p>题库正文保存在本地缓存，手动同步会把 Supabase 题库合并到本地，不会删除本地导入的题目。</p>
        <button
          type="button"
          onClick={handleManualSync}
          disabled={isSyncing}
          className="manual-sync-button"
        >
          {isSyncing ? '同步中...' : '手动同步题库'}
        </button>
      </div>

      <div className="upload-section import-section">
        <h2>本地题库导入</h2>
        <p>下载 Excel 模板后填写题目，再合并导入为本地题库。相同题目 ID 会以本次导入内容为准。</p>
        <div className="import-actions">
          <label className="import-type-field">
            <span>导入题型</span>
            <select
              value={importQuestionType}
              onChange={(event) => setImportQuestionType(event.target.value)}
              disabled={isImporting}
            >
              <option value="choice">选择题/判断题</option>
              <option value="fill_blank">填空题</option>
            </select>
          </label>
          <button
            type="button"
            onClick={downloadQuestionBankTemplate}
            className="template-button"
          >
            下载示例 Excel 模板
          </button>
          <a
            href="/题库导入模板.xlsx"
            className="template-link"
            target="_blank"
            rel="noreferrer"
          >
            打开模板文件
          </a>
          <label className={`excel-import-button ${isImporting ? 'disabled' : ''}`}>
            {isImporting ? '导入中...' : '选择 Excel 并导入'}
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleLocalImport}
              disabled={isImporting}
            />
          </label>
        </div>
      </div>

      <div className="upload-section cloud-upload-section">
        <h2>上传本地题库到云端</h2>
        <p>将当前浏览器中的本地题库上传到 Supabase。相同 ID 的分类、章节和题目会更新，云端额外题目不会被删除。</p>
        <button
          type="button"
          onClick={handleCloudUpload}
          disabled={!canUploadCloud || isUploadingCloud || totalQuestions === 0}
          className="cloud-upload-button"
        >
          {isUploadingCloud ? '上传中...' : '上传本地题库到云端'}
        </button>
        {!canUploadCloud && (
          <p className="permission-hint">仅账号 x113366 可以上传云端题库。</p>
        )}
      </div>

      {isLoading && (
        <div className="upload-status">正在读取本地题库...</div>
      )}

      {syncMessage && (
        <div className="upload-status success">{syncMessage}</div>
      )}

      {importMessage && (
        <div className="upload-status success">{importMessage}</div>
      )}

      {cloudMessage && (
        <div className="upload-status success">{cloudMessage}</div>
      )}

      {errorMessage && (
        <div className="upload-status error">加载失败：{errorMessage}</div>
      )}

      {!isLoading && !errorMessage && (
        <div className="categories-list">
          <h2>现有题库</h2>
          <p className="question-count">本地总题数：{totalQuestions}</p>
          {categories.length === 0 ? (
            <p>本地暂无题库，请先手动同步。</p>
          ) : (
            <ul>
              {categories.map((category) => (
                <li key={category.id} className="category-item">
                  <div className="category-info">
                    <span className="category-icon">{category.icon}</span>
                    <div>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                      <p className="question-count">
                        题目数量：{questionCounts[category.id] || 0}
                      </p>
                      {category.chapters?.length > 0 && (
                        <p className="question-count">
                          章节：{category.chapters.map((chapter) => chapter.name).join('、')}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
