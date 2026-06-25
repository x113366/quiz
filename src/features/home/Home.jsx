import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../question-bank/quizStore';
import {
  clearLegacyLocalProgress,
  fetchQuizProgress
} from '../progress/progressStore';
import './Home.css';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [quizProgress, setQuizProgress] = useState({ chapters: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      try {
        clearLegacyLocalProgress();
        const [remoteCategories, remoteProgress] = await Promise.all([
          getAllCategories(),
          fetchQuizProgress()
        ]);

        if (isMounted) {
          setCategories(remoteCategories);
          setQuizProgress(remoteProgress);
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

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const continueTarget = useMemo(() => {
    for (const category of categories) {
      for (const chapter of category.chapters || []) {
        const progress = quizProgress.chapters?.[category.id]?.[chapter.id];
        if (progress?.answeredIds?.length > 0) {
          return `/quiz/${category.id}/${chapter.id}`;
        }
      }
    }
    return null;
  }, [categories, quizProgress]);

  const getCategoryProgress = (category) => {
    const chapterProgress = quizProgress.chapters?.[category.id] || {};
    return Object.values(chapterProgress).reduce((total, progress) => ({
      answered: total.answered + (progress.answeredIds?.length || 0),
      correct: total.correct + (progress.correctCount || 0)
    }), { answered: 0, correct: 0 });
  };

  const getCategoryTarget = (category) => {
    return category.chapters?.length > 0
      ? `/chapters/${category.id}`
      : `/quiz/${category.id}`;
  };

  if (isLoading) {
    return (
      <div className="home">
        <div className="home-state">正在读取本地题库...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="home">
        <div className="home-state error">加载失败：{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">选择分类开始答题</h1>
        <p className="home-subtitle">先选分类，再按章节进入题目</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          const progress = getCategoryProgress(category);
          return (
            <Link
              to={getCategoryTarget(category)}
              key={category.id}
              className="category-card"
              style={{ '--category-color': category.color }}
            >
              <div className="category-heading">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
              </div>
              <p className="category-description">{category.description}</p>
              {category.chapters?.length > 0 && (
                <p className="category-description">
                  {category.chapters.length} 个章节，点击选择章节
                </p>
              )}
              {progress.answered > 0 && (
                <div className="category-progress">
                  <span className="progress-badge">
                    已答 {progress.answered} 题 · 正确 {progress.correct} 题
                  </span>
                </div>
              )}
              <div className="category-arrow">
                {category.chapters?.length > 0 ? '选章节 →' : '开始 →'}
              </div>
            </Link>
          );
        })}
      </div>

      {continueTarget && (
        <div className="continue-section">
          <Link to={continueTarget} className="continue-button">
            继续答题
          </Link>
        </div>
      )}
    </div>
  );
}
