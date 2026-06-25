import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentClientId } from '../auth/authStore';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import './WrongBook.css';

const getItemCategoryId = (item) => item.categoryId || 'uncategorized';
const getItemChapterId = (item) => item.chapterId || 'unknown-chapter';

const getAnswerList = (answer) => (
  Array.isArray(answer) ? answer : [answer]
).filter(Boolean);

const getAnswerText = (question, answer) => {
  return getAnswerList(answer)
    .map((key) => question.options[key])
    .filter(Boolean)
    .join('、');
};

export default function WrongBook() {
  const wrongBookKey = `wrongBook:${getCurrentClientId()}`;
  const [wrongBook, setWrongBook] = useLocalStorage(wrongBookKey, {});
  const [reviewMode, setReviewMode] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedScope, setSelectedScope] = useState({ type: 'all' });

  const wrongQuestions = useMemo(() => Object.values(wrongBook), [wrongBook]);

  const directory = useMemo(() => {
    const categories = new Map();

    wrongQuestions.forEach((item) => {
      const categoryId = getItemCategoryId(item);
      const chapterId = getItemChapterId(item);

      if (!categories.has(categoryId)) {
        categories.set(categoryId, {
          id: categoryId,
          name: item.categoryName || '题库',
          count: 0,
          chapters: new Map()
        });
      }

      const category = categories.get(categoryId);
      category.count += 1;

      if (!category.chapters.has(chapterId)) {
        category.chapters.set(chapterId, {
          id: chapterId,
          name: item.chapterName || '未知章节',
          count: 0
        });
      }

      category.chapters.get(chapterId).count += 1;
    });

    return Array.from(categories.values()).map((category) => ({
      ...category,
      chapters: Array.from(category.chapters.values())
    }));
  }, [wrongQuestions]);

  const filteredWrongQuestions = useMemo(() => {
    if (selectedScope.type === 'category') {
      return wrongQuestions.filter((item) => getItemCategoryId(item) === selectedScope.categoryId);
    }

    if (selectedScope.type === 'chapter') {
      return wrongQuestions.filter((item) => (
        getItemCategoryId(item) === selectedScope.categoryId &&
        getItemChapterId(item) === selectedScope.chapterId
      ));
    }

    return wrongQuestions;
  }, [selectedScope, wrongQuestions]);

  const selectedScopeTitle = useMemo(() => {
    if (selectedScope.type === 'category') {
      return directory.find((category) => category.id === selectedScope.categoryId)?.name || '题库';
    }

    if (selectedScope.type === 'chapter') {
      const category = directory.find((item) => item.id === selectedScope.categoryId);
      const chapter = category?.chapters.find((item) => item.id === selectedScope.chapterId);
      return chapter ? `${category.name} · ${chapter.name}` : '未知章节';
    }

    return '全部错题';
  }, [directory, selectedScope]);

  const chooseScope = (scope) => {
    setSelectedScope(scope);
    setCurrentReviewIndex(0);
    setShowAnswer(false);
  };

  const removeWrongQuestion = (questionId) => {
    setWrongBook((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  const clearWrongBook = () => {
    if (window.confirm('确定要清空所有错题吗？')) {
      setWrongBook({});
      setReviewMode(false);
      setCurrentReviewIndex(0);
      setShowAnswer(false);
      setSelectedScope({ type: 'all' });
    }
  };

  const startReview = () => {
    if (filteredWrongQuestions.length > 0) {
      setReviewMode(true);
      setCurrentReviewIndex(0);
      setShowAnswer(false);
    }
  };

  const nextReview = () => {
    if (currentReviewIndex < filteredWrongQuestions.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
      setShowAnswer(false);
    } else {
      setReviewMode(false);
      setCurrentReviewIndex(0);
      setShowAnswer(false);
    }
  };

  const markAsMastered = (questionId) => {
    removeWrongQuestion(questionId);
    if (filteredWrongQuestions.length === 1) {
      setReviewMode(false);
    } else if (currentReviewIndex >= filteredWrongQuestions.length - 1) {
      setCurrentReviewIndex(currentReviewIndex - 1);
      setShowAnswer(false);
    }
  };

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

  if (reviewMode && filteredWrongQuestions[currentReviewIndex]) {
    const currentWrong = filteredWrongQuestions[currentReviewIndex];
    const categoryName = currentWrong.categoryName || '题库';
    const chapterName = currentWrong.chapterName || '未知章节';
    const correctAnswers = getAnswerList(currentWrong.correctAnswer);
    const wrongAnswers = getAnswerList(currentWrong.wrongAnswer);

    return (
      <div className="wrong-book">
        <div className="review-container">
          <div className="review-header">
            <button onClick={() => setReviewMode(false)} className="back-btn">
              ← 退出复习
            </button>
            <span className="review-counter">
              {selectedScopeTitle} · {currentReviewIndex + 1} / {filteredWrongQuestions.length}
            </span>
          </div>

          <div className="review-card">
            <div className="review-category">
              {categoryName} · {chapterName}
            </div>
            <h3 className="review-question">{currentWrong.question.question}</h3>

            <div className="review-options">
              {Object.entries(currentWrong.question.options).map(([key, value]) => {
                const isCorrect = correctAnswers.includes(key);
                const isWrong = wrongAnswers.includes(key);

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
              })}
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
                    {currentReviewIndex < filteredWrongQuestions.length - 1
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

  return (
    <div className="wrong-book">
      <div className="wrong-header">
        <h1 className="wrong-title">错题本</h1>
        <p className="wrong-subtitle">
          共 {wrongQuestions.length} 道错题，按题库分类和章节复习
        </p>
      </div>

      <div className="wrong-actions">
        <button
          onClick={startReview}
          className="btn btn-primary"
          disabled={filteredWrongQuestions.length === 0}
        >
          📖 开始复习
        </button>
        <button onClick={clearWrongBook} className="btn btn-danger">
          🗑️ 清空错题
        </button>
      </div>

      <div className="wrong-book-layout">
        <aside className="wrong-directory">
          <button
            type="button"
            className={`directory-item directory-all ${selectedScope.type === 'all' ? 'active' : ''}`}
            onClick={() => chooseScope({ type: 'all' })}
          >
            <span>全部错题</span>
            <strong>{wrongQuestions.length}</strong>
          </button>

          {directory.map((category) => (
            <div key={category.id} className="directory-category">
              <button
                type="button"
                className={`directory-item ${
                  selectedScope.type === 'category' && selectedScope.categoryId === category.id
                    ? 'active'
                    : ''
                }`}
                onClick={() => chooseScope({ type: 'category', categoryId: category.id })}
              >
                <span>{category.name}</span>
                <strong>{category.count}</strong>
              </button>
              <div className="directory-chapters">
                {category.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    type="button"
                    className={`directory-item directory-chapter ${
                      selectedScope.type === 'chapter' &&
                      selectedScope.categoryId === category.id &&
                      selectedScope.chapterId === chapter.id
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => chooseScope({
                      type: 'chapter',
                      categoryId: category.id,
                      chapterId: chapter.id
                    })}
                  >
                    <span>{chapter.name}</span>
                    <strong>{chapter.count}</strong>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <section className="wrong-list-panel">
          <div className="wrong-list-heading">
            <h2>{selectedScopeTitle}</h2>
            <span>{filteredWrongQuestions.length} 题</span>
          </div>

          {filteredWrongQuestions.length === 0 ? (
            <div className="wrong-filter-empty">这个目录下暂时没有错题</div>
          ) : (
            <div className="wrong-list">
              {filteredWrongQuestions.map((item) => {
                const questionId = item.question.id;
                const addedDate = new Date(item.addedAt);

                return (
                  <div key={questionId} className="wrong-item">
                    <div className="wrong-content">
                      <div className="wrong-category">
                        <span className="category-icon">🦠</span>
                        <span className="category-name">
                          {item.categoryName || '题库'} · {item.chapterName || '未知章节'}
                        </span>
                      </div>
                      <h3 className="wrong-question">{item.question.question}</h3>
                      <div className="wrong-answer">
                        <span className="your-answer">
                          你的答案：
                          <strong>{getAnswerText(item.question, item.wrongAnswer)}</strong>
                        </span>
                        <span className="correct-answer">
                          正确答案：
                          <strong>{getAnswerText(item.question, item.correctAnswer)}</strong>
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
          )}
        </section>
      </div>
    </div>
  );
}
