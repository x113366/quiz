import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, getCategoryQuestions } from '../question-bank/quizStore';
import {
  clearLegacyLocalProgress,
  fetchQuizProgress,
  getChapterProgress
} from '../progress/progressStore';
import './ChapterSelect.css';

export default function ChapterSelect() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [chapterCounts, setChapterCounts] = useState({});
  const [quizProgress, setQuizProgress] = useState({ chapters: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadChapters = async () => {
      try {
        clearLegacyLocalProgress();
        const loadedCategory = await getCategoryById(categoryId);
        if (!loadedCategory) {
          navigate('/');
          return;
        }

        const counts = {};
        for (const chapter of loadedCategory.chapters || []) {
          const questions = await getCategoryQuestions(categoryId, chapter.id);
          counts[chapter.id] = questions.length;
        }

        const remoteProgress = await fetchQuizProgress();

        if (isMounted) {
          setCategory(loadedCategory);
          setChapterCounts(counts);
          setQuizProgress(remoteProgress);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || '章节加载失败');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadChapters();

    return () => {
      isMounted = false;
    };
  }, [categoryId, navigate]);

  const totalQuestions = useMemo(() => {
    return Object.values(chapterCounts).reduce((sum, count) => sum + count, 0);
  }, [chapterCounts]);

  if (isLoading) {
    return (
      <div className="chapter-select">
        <div className="chapter-state">正在读取章节...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="chapter-select">
        <div className="chapter-state error">加载失败：{errorMessage}</div>
      </div>
    );
  }

  const chapters = category?.chapters || [];

  return (
    <div className="chapter-select">
      <div className="chapter-header">
        <Link to="/" className="chapter-back">← 返回分类</Link>
        <div className="chapter-title-row">
          <span className="chapter-category-icon">{category?.icon || '📝'}</span>
          <div>
            <h1 className="chapter-title">{category?.name}</h1>
            <p className="chapter-subtitle">
              选择章节开始答题，共 {chapters.length} 章 · {totalQuestions} 题
            </p>
          </div>
        </div>
      </div>

      {chapters.length === 0 ? (
        <div className="chapter-state">当前分类暂无章节。</div>
      ) : (
        <div className="chapter-grid">
          {chapters.map((chapter, index) => {
            const progress = getChapterProgress(quizProgress, categoryId, chapter.id);
            const count = chapterCounts[chapter.id] || 0;
            const answered = progress.answeredIds.length;
            const percent = count > 0 ? Math.round((answered / count) * 100) : 0;

            return (
              <Link
                key={chapter.id}
                to={`/quiz/${categoryId}/${chapter.id}`}
                className="chapter-card"
              >
                <div className="chapter-card-index">第 {index + 1} 章</div>
                <h2 className="chapter-card-title">{chapter.name}</h2>
                <p className="chapter-card-description">{chapter.description}</p>
                <div className="chapter-card-meta">
                  <span>{count} 题</span>
                  <span>已答 {answered} 题</span>
                  <span>正确 {progress.correctCount} 题</span>
                </div>
                <div className="chapter-progress-track">
                  <span style={{ width: `${percent}%` }} />
                </div>
                <div className="chapter-card-action">开始答题 →</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
