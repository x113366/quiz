import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCategoryById } from '../store/quizStore';
import './WrongBook.css';

export default function WrongBook() {
  const [wrongBook, setWrongBook] = useLocalStorage('wrongBook', {});
  const [reviewMode, setReviewMode] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const wrongQuestions = Object.values(wrongBook);

  // 删除错题
  const removeWrongQuestion = (questionId) => {
    setWrongBook((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  // 清空错题本
  const clearWrongBook = () => {
    if (window.confirm('确定要清空所有错题吗？')) {
      setWrongBook({});
      setReviewMode(false);
      setCurrentReviewIndex(0);
      setShowAnswer(false);
    }
  };

  // 开始复习
  const startReview = () => {
    if (wrongQuestions.length > 0) {
      setReviewMode(true);
      setCurrentReviewIndex(0);
      setShowAnswer(false);
    }
  };

  // 复习模式：下一题
  const nextReview = () => {
    if (currentReviewIndex < wrongQuestions.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
      setShowAnswer(false);
    } else {
      setReviewMode(false);
      setCurrentReviewIndex(0);
      setShowAnswer(false);
    }
  };

  // 复习模式：掌握此题（从错题本移除）
  const markAsMastered = (questionId) => {
    removeWrongQuestion(questionId);
    if (wrongQuestions.length === 1) {
      setReviewMode(false);
    } else if (currentReviewIndex >= wrongQuestions.length - 1) {
      setCurrentReviewIndex(currentReviewIndex - 1);
      setShowAnswer(false);
    }
  };

  // 空的错题本
  if (wrongQuestions.length === 0) {
    return (
      <div className="wrong-book">
        <div className="empty-state">
          <div className="empty-icon">🎉</div>
          <h2 className="empty-title">太棒了！</h2>
          <p className="empty-text">目前没有错题，继续保持！</p>
          <Link to="/" className="btn btn-primary">
            去答题
          </Link>
        </div>
      </div>
    );
  }

  // 复习模式
  if (reviewMode && wrongQuestions[currentReviewIndex]) {
    const currentWrong = wrongQuestions[currentReviewIndex];
    const category = getCategoryById(
      Object.keys(wrongBook).find(
        (key) => wrongBook[key].question.id === currentWrong.question.id
      )?.split('')?.[0] ||
        Object.keys(wrongBook)[currentReviewIndex]?.split('')?.[0]
    );

    // 查找分类
    const questionId = currentWrong.question.id;
    let foundCategory = null;
    if (questionId.startsWith('s')) foundCategory = getCategoryById('science');
    else if (questionId.startsWith('h')) foundCategory = getCategoryById('history');
    else if (questionId.startsWith('l')) foundCategory = getCategoryById('literature');
    else if (questionId.startsWith('t')) foundCategory = getCategoryById('tech');

    return (
      <div className="wrong-book">
        <div className="review-container">
          <div className="review-header">
            <button onClick={() => setReviewMode(false)} className="back-btn">
              ← 退出复习
            </button>
            <span className="review-counter">
              {currentReviewIndex + 1} / {wrongQuestions.length}
            </span>
          </div>

          <div className="review-card">
            <div className="review-category">
              {foundCategory?.icon} {foundCategory?.name}
            </div>
            <h3 className="review-question">{currentWrong.question.question}</h3>

            <div className="review-options">
              {Object.entries(currentWrong.question.options).map(
                ([key, value]) => {
                  const isCorrect = key === currentWrong.correctAnswer;
                  const isWrong = key === currentWrong.wrongAnswer;

                  return (
                    <div
                      key={key}
                      className={`review-option ${isCorrect ? 'correct' : ''} ${
                        isWrong ? 'wrong' : ''
                      }`}
                    >
                      <span className="option-key">{key.toUpperCase()}</span>
                      <span className="option-value">{value}</span>
                      {isCorrect && <span className="status-icon">✓</span>}
                      {isWrong && <span className="status-icon">✗</span>}
                    </div>
                  );
                }
              )}
            </div>

            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="btn btn-primary show-answer-btn"
              >
                查看答案
              </button>
            ) : (
              <div className="review-feedback">
                <div className="explanation">
                  <strong>💡 解析：</strong>
                  {currentWrong.question.explanation}
                </div>
                <div className="review-actions">
                  <button
                    onClick={() => markAsMastered(currentWrong.question.id)}
                    className="btn btn-success"
                  >
                    ✓ 已掌握
                  </button>
                  <button onClick={nextReview} className="btn btn-primary">
                    {currentReviewIndex < wrongQuestions.length - 1
                      ? '下一题 →'
                      : '完成复习'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 错题列表模式
  return (
    <div className="wrong-book">
      <div className="wrong-header">
        <h1 className="wrong-title">错题本</h1>
        <p className="wrong-subtitle">
          共 {wrongQuestions.length} 道错题，及时复习巩固
        </p>
      </div>

      <div className="wrong-actions">
        <button onClick={startReview} className="btn btn-primary">
          📖 开始复习
        </button>
        <button onClick={clearWrongBook} className="btn btn-danger">
          🗑️ 清空错题
        </button>
      </div>

      <div className="wrong-list">
        {wrongQuestions.map((item, index) => {
          const questionId = item.question.id;
          let category = null;
          if (questionId.startsWith('s'))
            category = getCategoryById('science');
          else if (questionId.startsWith('h'))
            category = getCategoryById('history');
          else if (questionId.startsWith('l'))
            category = getCategoryById('literature');
          else if (questionId.startsWith('t'))
            category = getCategoryById('tech');

          const addedDate = new Date(item.addedAt);

          return (
            <div key={questionId} className="wrong-item">
              <div className="wrong-content">
                <div className="wrong-category">
                  <span className="category-icon">{category?.icon}</span>
                  <span className="category-name">{category?.name}</span>
                </div>
                <h3 className="wrong-question">{item.question.question}</h3>
                <div className="wrong-answer">
                  <span className="your-answer">
                    你的答案：
                    <strong>
                      {item.question.options[item.wrongAnswer]}
                    </strong>
                  </span>
                  <span className="correct-answer">
                    正确答案：
                    <strong>
                      {item.question.options[item.correctAnswer]}
                    </strong>
                  </span>
                </div>
                <div className="wrong-date">
                  加入时间：{addedDate.toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => removeWrongQuestion(questionId)}
                className="remove-btn"
                title="移除错题"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
