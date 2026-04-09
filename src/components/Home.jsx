import { Link } from 'react-router-dom';
import { getAllCategories } from '../store/quizStore';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './Home.css';

export default function Home() {
  const categories = getAllCategories();
  const [quizProgress] = useLocalStorage('quizProgress', {
    categoryId: null,
    answeredIds: [],
    correctCount: 0
  });

  // 获取每个分类的答题进度
  const getCategoryProgress = (categoryId) => {
    if (quizProgress.categoryId !== categoryId) {
      return { answered: 0, correct: 0 };
    }
    return {
      answered: quizProgress.answeredIds.length,
      correct: quizProgress.correctCount
    };
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">选择分类开始答题</h1>
        <p className="home-subtitle">学习知识，挑战自我</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          const progress = getCategoryProgress(category.id);
          return (
            <Link
              to={`/quiz/${category.id}`}
              key={category.id}
              className="category-card"
              style={{ '--category-color': category.color }}
            >
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              {progress.answered > 0 && (
                <div className="category-progress">
                  <span className="progress-badge">
                    已答 {progress.answered} 题 · 正确 {progress.correct} 题
                  </span>
                </div>
              )}
              <div className="category-arrow">→</div>
            </Link>
          );
        })}
      </div>

      {quizProgress.categoryId && (
        <div className="continue-section">
          <Link
            to={`/quiz/${quizProgress.categoryId}`}
            className="continue-button"
          >
            继续答题
          </Link>
        </div>
      )}
    </div>
  );
}
