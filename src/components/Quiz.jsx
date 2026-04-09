import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  getCategoryById,
  getCategoryQuestions,
  getRandomUnansweredQuestion,
  shuffleArray
} from '../store/quizStore';
import ProgressBar from './ProgressBar';
import './Quiz.css';

export default function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = getCategoryById(categoryId);

  const [quizProgress, setQuizProgress] = useLocalStorage('quizProgress', {
    categoryId: null,
    answeredIds: [],
    correctCount: 0
  });

  const [wrongBook, setWrongBook] = useLocalStorage('wrongBook', {});

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClickedOption, setLastClickedOption] = useState(null);
  const [shuffleOptions, setShuffleOptions] = useState(false);

  const totalQuestions = getCategoryQuestions(categoryId).length;

  // 判断是否为多选题
  const isMultipleChoice = currentQuestion?.correctAnswer && 
    (typeof currentQuestion.correctAnswer === 'string' 
      ? currentQuestion.correctAnswer.includes(',') 
      : Array.isArray(currentQuestion.correctAnswer));

  // 获取正确答案数组
  const getCorrectAnswers = () => {
    if (!currentQuestion?.correctAnswer) return [];
    if (Array.isArray(currentQuestion.correctAnswer)) {
      return currentQuestion.correctAnswer;
    }
    return currentQuestion.correctAnswer.split(',').map(s => s.trim());
  };

  // 初始化或加载新题目
  useEffect(() => {
    if (!category) {
      navigate('/');
      return;
    }

    // 如果是新分类，重置进度
    if (quizProgress.categoryId !== categoryId) {
      setQuizProgress((prev) => ({
        ...prev,
        categoryId,
        answeredIds: [],
        correctCount: 0
      }));
    }

    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // 加载新题目
  const loadNewQuestion = () => {
    const question = getRandomUnansweredQuestion(
      categoryId,
      quizProgress.categoryId === categoryId ? quizProgress.answeredIds : []
    );

    if (!question) {
      // 所有题目已答完
      setCurrentQuestion(null);
      return;
    }

    setCurrentQuestion(question);
    setSelectedAnswers([]);
    setShowResult(false);
    setIsCorrect(false);
    setLastClickTime(0);
    setLastClickedOption(null);

    // 处理选项
    const options = Object.entries(question.options).map(([key, value]) => ({
      key,
      value
    }));
    
    // 按选项键（a, b, c, d）排序
    options.sort((a, b) => a.key.localeCompare(b.key));
    
    // 如果需要打乱选项
    let finalOptions = options;
    if (shuffleOptions) {
      // 提取选项值
      const values = options.map(opt => opt.value);
      // 打乱值
      const shuffledValues = shuffleArray([...values]);
      // 重新组合选项，保持键的顺序不变
      finalOptions = options.map((opt, index) => ({
        key: opt.key,
        value: shuffledValues[index]
      }));
    }
    
    setShuffledOptions(finalOptions);
  };

  // 处理选项点击
  const handleOptionClick = (optionKey) => {
    if (showResult || !currentQuestion) return;

    const currentTime = Date.now();
    const isDoubleClick = lastClickedOption === optionKey && 
                          (currentTime - lastClickTime) < 300;

    if (isMultipleChoice) {
      // 多选题：切换选择状态
      setSelectedAnswers(prev => {
        if (prev.includes(optionKey)) {
          return prev.filter(key => key !== optionKey);
        } else {
          return [...prev, optionKey];
        }
      });
    } else {
      // 单选题
      if (isDoubleClick && selectedAnswers.includes(optionKey)) {
        // 双击已选中的选项，直接提交
        handleSubmit();
      } else {
        // 单击选择
        setSelectedAnswers([optionKey]);
      }
    }

    setLastClickTime(currentTime);
    setLastClickedOption(optionKey);
  };

  // 提交答案
  const handleSubmit = () => {
    if (showResult || !currentQuestion || selectedAnswers.length === 0) return;

    setShowResult(true);

    const correctAnswers = getCorrectAnswers();
    const selectedSorted = [...selectedAnswers].sort();
    const correctSorted = [...correctAnswers].sort();
    
    const correct = JSON.stringify(selectedSorted) === JSON.stringify(correctSorted);
    setIsCorrect(correct);

    // 更新答题进度
    setQuizProgress((prev) => ({
      ...prev,
      answeredIds: [...prev.answeredIds, currentQuestion.id],
      correctCount: correct ? prev.correctCount + 1 : prev.correctCount
    }));

    // 如果错误，加入错题本
    if (!correct) {
      setWrongBook((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          question: currentQuestion,
          wrongAnswer: selectedAnswers,
          correctAnswer: correctAnswers,
          addedAt: Date.now()
        }
      }));
    }

    // 正确答案后自动跳转（1.5 秒后）
    if (correct) {
      setTimeout(() => {
        loadNewQuestion();
      }, 1500);
    }
  };

  // 下一题
  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  // 完成所有题目
  if (!currentQuestion) {
    return (
      <div className="quiz quiz-complete">
        <div className="complete-card">
          <div className="complete-icon">🎉</div>
          <h2 className="complete-title">恭喜完成所有题目！</h2>
          <p className="complete-text">
            本分类共 {totalQuestions} 题，您已全部答完
          </p>
          <div className="complete-stats">
            <div className="stat">
              <span className="stat-value">{quizProgress.correctCount}</span>
              <span className="stat-label">正确</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {totalQuestions - quizProgress.correctCount}
              </span>
              <span className="stat-label">错误</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {Math.round((quizProgress.correctCount / totalQuestions) * 100)}%
              </span>
              <span className="stat-label">正确率</span>
            </div>
          </div>
          <div className="complete-actions">
            <Link to="/" className="btn btn-secondary">
              返回首页
            </Link>
            <button
              onClick={() => {
                setQuizProgress((prev) => ({
                  ...prev,
                  answeredIds: [],
                  correctCount: 0
                }));
                loadNewQuestion();
              }}
              className="btn btn-primary"
            >
              重新开始
            </button>
          </div>
        </div>
      </div>
    );
  }

  const correctAnswers = getCorrectAnswers();

  return (
    <div className="quiz">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="category-badge">
            <span className="category-icon">{category?.icon || '📝'}</span>
            <span className="category-name">{category?.name}</span>
          </div>
          <div className="header-controls">
            <div className="question-counter">
              第 {quizProgress.answeredIds.length + 1} / {totalQuestions} 题
            </div>
            <div className="shuffle-control">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(e) => setShuffleOptions(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                打乱选项
              </label>
            </div>
          </div>
        </div>

        <ProgressBar
          current={quizProgress.answeredIds.length}
          total={totalQuestions}
        />

        <div className="question-card">
          <div className="question-type-badge">
            {isMultipleChoice ? '多选题' : '单选题'}
          </div>
          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options-list">
            {shuffledOptions.map((option) => {
              const isSelected = selectedAnswers.includes(option.key);
              const isCorrectAnswer = correctAnswers.includes(option.key);
              const showCorrect = showResult && isCorrectAnswer;
              const showWrong = showResult && isSelected && !isCorrectAnswer;

              return (
                <button
                  key={option.key}
                  onClick={() => handleOptionClick(option.key)}
                  disabled={showResult}
                  className={`option-item ${isSelected ? 'selected' : ''} ${
                    showCorrect ? 'correct' : ''
                  } ${showWrong ? 'wrong' : ''}`}
                >
                  <span className="option-key">{option.key.toUpperCase()}</span>
                  <span className="option-value">{option.value}</span>
                  {showCorrect && <span className="status-icon">✓</span>}
                  {showWrong && <span className="status-icon">✗</span>}
                  {isSelected && !showResult && <span className="selected-indicator">●</span>}
                </button>
              );
            })}
          </div>

          {/* 提交按钮 */}
          {!showResult && (
            <div className="submit-section">
              <button
                onClick={handleSubmit}
                disabled={selectedAnswers.length === 0}
                className="submit-button"
              >
                确认提交
              </button>
              {selectedAnswers.length === 0 && (
                <span className="hint-text">请先选择答案</span>
              )}
            </div>
          )}

          {showResult && (
            <div className={`result-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
              {!isCorrect && (
                <>
                  <div className="feedback-title">
                    <span className="feedback-icon">❌</span>
                    回答错误
                  </div>
                  <div className="feedback-content">
                    <p>
                      <strong>你的答案：</strong>
                      {selectedAnswers.map(key => currentQuestion.options[key]).join(', ')}
                    </p>
                    <p>
                      <strong>正确答案：</strong>
                      {correctAnswers.map(key => currentQuestion.options[key]).join(', ')}
                    </p>
                  </div>
                </>
              )}
              <div className="explanation">
                <strong>💡 解析：</strong>
                {currentQuestion.explanation}
              </div>
              {isCorrect && (
                <div className="feedback-title correct">
                  <span className="feedback-icon">✓</span>
                  回答正确！
                </div>
              )}
              
              {/* 下一题按钮 - 仅在答错时显示 */}
              {!isCorrect && (
                <button
                  onClick={handleNextQuestion}
                  className="next-button"
                >
                  继续答题
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
