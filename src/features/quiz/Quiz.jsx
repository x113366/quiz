import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getCategoryById,
  getCategoryQuestions,
  shuffleArray,
  updateQuizQuestion
} from '../question-bank/quizStore';
import {
  clearLegacyLocalProgress,
  fetchQuizProgress,
  getChapterProgress,
  getSyncQueueSize,
  saveChapterProgressLocally,
  syncQueuedProgress,
  syncQueuedProgressIfNeeded
} from '../progress/progressStore';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { canEditQuestions, getCurrentClientId, getCurrentUser } from '../auth/authStore';
import { copyQuestionToClipboard } from '../../shared/services/clipboardService';
import ProgressBar from './ProgressBar';
import './Quiz.css';

const sortOptions = (options) => {
  return Object.entries(options)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.key.localeCompare(b.key));
};

const getCorrectAnswerList = (question) => {
  if (!question?.correctAnswer) return [];
  if (Array.isArray(question.correctAnswer)) return question.correctAnswer;
  return String(question.correctAnswer).split(',').map((answer) => answer.trim());
};

const isFillBlankQuestion = (question) => {
  return question?.questionType === 'fill_blank';
};

const getFillBlankAnswerContent = (question) => {
  if (!question) return '';
  return question.filledQuestion || question.answerText || question.explanation || String(question.correctAnswer || '');
};

const splitAnswerText = (answerText) => {
  return String(answerText || '')
    .split(/[；;,，、]/)
    .map((part) => part.trim())
    .filter(Boolean);
};

const renderFillBlankAnswer = (question, isRevealed) => {
  const questionText = String(question?.question || '');
  const answers = splitAnswerText(question?.answerText || question?.correctAnswer);
  const parts = questionText.split(/____/g);

  if (parts.length <= 1 || answers.length === 0) {
    return getFillBlankAnswerContent(question);
  }

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && (
        <span className={`inline-fill-answer ${isRevealed ? 'revealed' : 'concealed'}`}>
          {answers[index] || '待补充'}
        </span>
      )}
    </span>
  ));
};

const pickRandomQuestion = (questions, answeredIds, excludedIds = []) => {
  const excluded = new Set([...answeredIds, ...excludedIds]);
  const remaining = questions.filter((question) => !excluded.has(question.id));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
};

const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(remainingSeconds).padStart(2, '0');

  return hours > 0
    ? `${hours}:${paddedMinutes}:${paddedSeconds}`
    : `${paddedMinutes}:${paddedSeconds}`;
};

export default function Quiz() {
  const { categoryId, chapterId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [progress, setProgress] = useState({ answeredIds: [], correctCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submittedProgress, setSubmittedProgress] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClickedOption, setLastClickedOption] = useState(null);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isReviewingHistory, setIsReviewingHistory] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editDraft, setEditDraft] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [isSavingQuestion, setIsSavingQuestion] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const wrongBookKey = `wrongBook:${getCurrentClientId()}`;
  const [, setWrongBook] = useLocalStorage(wrongBookKey, {});

  const activeChapterId = chapterId || category?.chapters?.[0]?.id || null;
  const totalQuestions = questions.length;
  const correctAnswers = useMemo(() => getCorrectAnswerList(currentQuestion), [currentQuestion]);
  const isFillBlank = isFillBlankQuestion(currentQuestion);
  const isMultipleChoice = correctAnswers.length > 1;
  const canEditCurrentQuestion = canEditQuestions(currentUser);
  const elapsedTimeText = useMemo(() => formatElapsedTime(elapsedSeconds), [elapsedSeconds]);
  const baseProgress = submittedProgress || progress;
  const visibleProgress = useMemo(() => {
    const shouldCountCurrentResult = showResult &&
      currentQuestion &&
      !isReviewingHistory &&
      !baseProgress.answeredIds.includes(currentQuestion.id);

    if (!shouldCountCurrentResult) {
      return baseProgress;
    }

    return {
      answeredIds: [...baseProgress.answeredIds, currentQuestion.id],
      correctCount: isCorrect
        ? Math.min(baseProgress.correctCount + 1, totalQuestions)
        : baseProgress.correctCount
    };
  }, [baseProgress, currentQuestion, isCorrect, isReviewingHistory, showResult, totalQuestions]);
  const currentQuestionNumber = showResult && !isReviewingHistory
    ? visibleProgress.answeredIds.length
    : visibleProgress.answeredIds.length + 1;

  useEffect(() => {
    const handleAuthChange = () => setCurrentUser(getCurrentUser());
    window.addEventListener('quiz-auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('quiz-auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const prepareQuestion = useCallback((question) => {
    if (!question) {
      setCurrentQuestion(null);
      setShuffledOptions([]);
      return;
    }

    let options = isFillBlankQuestion(question) ? [] : sortOptions(question.options);
    if (shuffleOptions && !isFillBlankQuestion(question)) {
      options = shuffleArray(options);
    }

    setCurrentQuestion(question);
    setSelectedAnswers([]);
    setSubmittedProgress(null);
    setShowResult(false);
    setIsCorrect(false);
    setIsReviewingHistory(false);
    setLastClickTime(0);
    setLastClickedOption(null);
    setIsEditingQuestion(false);
    setEditDraft(null);
    setEditMessage('');
    setShuffledOptions(options);
  }, [shuffleOptions]);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    setElapsedSeconds(0);
    setIsTimerRunning(false);

    try {
      clearLegacyLocalProgress();
      const loadedCategory = await getCategoryById(categoryId);
      if (!loadedCategory) {
        navigate('/');
        return;
      }

      const resolvedChapterId = chapterId || loadedCategory.chapters?.[0]?.id;
      if (!resolvedChapterId) {
        throw new Error('本地题库没有可用章节');
      }

      const [loadedQuestions, remoteProgress] = await Promise.all([
        getCategoryQuestions(categoryId, resolvedChapterId),
        fetchQuizProgress()
      ]);

      const chapterProgress = getChapterProgress(remoteProgress, categoryId, resolvedChapterId);
      const firstQuestion = pickRandomQuestion(loadedQuestions, chapterProgress.answeredIds);

      setCategory(loadedCategory);
      setQuestions(loadedQuestions);
      setProgress(chapterProgress);
      setPendingSyncCount(getSyncQueueSize());
      prepareQuestion(firstQuestion);
    } catch (error) {
      setErrorMessage(error.message || '本地题库加载失败');
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, chapterId, navigate, prepareQuestion]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (isLoading || errorMessage || !currentQuestion || !isTimerRunning) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [currentQuestion, errorMessage, isLoading, isTimerRunning]);

  useEffect(() => {
    if (currentQuestion) {
      prepareQuestion(currentQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffleOptions]);

  const loadNewQuestion = useCallback((
    nextProgress = progress,
    addToHistory = true,
    attemptOverride = {}
  ) => {
    const historyIds = addToHistory && currentQuestion ? [currentQuestion.id] : [];
    const nextQuestion = pickRandomQuestion(questions, nextProgress.answeredIds, historyIds);

    if (addToHistory && currentQuestion) {
      setQuestionHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          selectedAnswers: attemptOverride.selectedAnswers || selectedAnswers,
          isCorrect: attemptOverride.isCorrect ?? isCorrect,
          shuffledOptions: attemptOverride.shuffledOptions || shuffledOptions
        }
      ]);
    }

    prepareQuestion(nextQuestion);
  }, [
    currentQuestion,
    isCorrect,
    prepareQuestion,
    progress,
    questions,
    selectedAnswers,
    shuffledOptions
  ]);

  const handleSyncNow = useCallback(async () => {
    setIsSyncing(true);
    setSyncMessage('');

    try {
      const result = await syncQueuedProgress();
      setPendingSyncCount(result.pending);
      setSyncMessage(result.synced > 0 ? `已同步 ${result.synced} 条进度` : '没有待同步进度');
    } catch (error) {
      setPendingSyncCount(getSyncQueueSize());
      setSyncMessage(`进度同步失败：${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const recordQuestionProgress = async (wasCorrect) => {
    const progressBeforeSubmit = submittedProgress || progress;
    const alreadyAnswered = progressBeforeSubmit.answeredIds.includes(currentQuestion.id);
    const nextProgress = alreadyAnswered
      ? progressBeforeSubmit
      : {
          answeredIds: [...progressBeforeSubmit.answeredIds, currentQuestion.id],
          correctCount: wasCorrect
            ? Math.min(progressBeforeSubmit.correctCount + 1, totalQuestions)
            : progressBeforeSubmit.correctCount
        };

    setProgress(nextProgress);
    setSubmittedProgress(nextProgress);
    saveChapterProgressLocally(categoryId, activeChapterId, nextProgress);
    setPendingSyncCount(getSyncQueueSize());

    try {
      const result = await syncQueuedProgressIfNeeded();
      setPendingSyncCount(result.pending);
      setSyncMessage(result.skipped ? '进度已保存本地，待批量同步' : '进度已批量同步云端');
    } catch (error) {
      setSyncMessage(`进度同步失败：${error.message}`);
      setPendingSyncCount(getSyncQueueSize());
    }

    return nextProgress;
  };

  const handleOptionClick = (optionKey) => {
    if (showResult || !currentQuestion || isFillBlank) return;

    const currentTime = Date.now();
    const isDoubleClick = lastClickedOption === optionKey &&
      (currentTime - lastClickTime) < 300;

    if (isMultipleChoice) {
      setSelectedAnswers((prev) => (
        prev.includes(optionKey)
          ? prev.filter((key) => key !== optionKey)
          : [...prev, optionKey]
      ));
    } else if (isDoubleClick && selectedAnswers.includes(optionKey)) {
      handleSubmit();
    } else {
      setSelectedAnswers([optionKey]);
    }

    setLastClickTime(currentTime);
    setLastClickedOption(optionKey);
  };

  const handleSubmit = async () => {
    if (showResult || !currentQuestion || selectedAnswers.length === 0 || !activeChapterId || isFillBlank) return;

    setShowResult(true);
    setSyncMessage('');

    const selectedSorted = [...selectedAnswers].sort();
    const correctSorted = [...correctAnswers].sort();
    const correct = JSON.stringify(selectedSorted) === JSON.stringify(correctSorted);
    setIsCorrect(correct);

    if (correct) {
      const nextProgress = await recordQuestionProgress(true);

      setTimeout(() => {
        loadNewQuestion(nextProgress, true, {
          selectedAnswers,
          isCorrect: correct,
          shuffledOptions
        });
      }, 800);
    } else {
      setSyncMessage('');
      setWrongBook((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          question: currentQuestion,
          wrongAnswer: selectedAnswers,
          correctAnswer: correctAnswers,
          addedAt: Date.now(),
          categoryId,
          categoryName: category?.name || '题库',
          chapterId: activeChapterId,
          chapterName: category?.chapters?.find((chapter) => chapter.id === activeChapterId)?.name || '未知章节'
        }
      }));
      const nextProgress = await recordQuestionProgress(false);
      setSubmittedProgress(nextProgress);
    }
  };

  const revealFillBlankAnswer = async () => {
    if (showResult || !currentQuestion || !activeChapterId || !isFillBlank) return;

    setShowResult(true);
    setIsCorrect(true);
    setSyncMessage('');

    const alreadyAnswered = progress.answeredIds.includes(currentQuestion.id);
    const nextProgress = alreadyAnswered
      ? progress
      : {
          answeredIds: [...progress.answeredIds, currentQuestion.id],
          correctCount: Math.min(progress.correctCount + 1, totalQuestions)
        };

    setProgress(nextProgress);
    setSubmittedProgress(nextProgress);
    saveChapterProgressLocally(categoryId, activeChapterId, nextProgress);
    setPendingSyncCount(getSyncQueueSize());

    try {
      const result = await syncQueuedProgressIfNeeded();
      setPendingSyncCount(result.pending);
      setSyncMessage(result.skipped ? '进度已保存本地，待批量同步' : '进度已批量同步云端');
    } catch (error) {
      setSyncMessage(`进度同步失败：${error.message}`);
      setPendingSyncCount(getSyncQueueSize());
    }
  };

  const handlePreviousQuestion = () => {
    if (questionHistory.length === 0) return;

    const previousAttempt = questionHistory[questionHistory.length - 1];
    setQuestionHistory((prev) => prev.slice(0, -1));
    setCurrentQuestion(previousAttempt.question);
    setSelectedAnswers(previousAttempt.selectedAnswers);
    setShowResult(true);
    setIsCorrect(previousAttempt.isCorrect);
    setIsReviewingHistory(true);
    setSyncMessage('');
    setIsEditingQuestion(false);
    setEditDraft(null);
    setEditMessage('');
    setLastClickTime(0);
    setLastClickedOption(null);
    setShuffledOptions(previousAttempt.shuffledOptions);
  };

  const startEditingQuestion = () => {
    if (!currentQuestion || !canEditCurrentQuestion) return;

    setEditDraft({
      options: { ...currentQuestion.options },
      correctAnswer: getCorrectAnswerList(currentQuestion),
      explanation: currentQuestion.explanation || ''
    });
    setEditMessage('');
    setIsEditingQuestion(true);
  };

  const cancelEditingQuestion = () => {
    setIsEditingQuestion(false);
    setEditDraft(null);
    setEditMessage('');
  };

  const updateDraftOption = (optionKey, value) => {
    setEditDraft((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [optionKey]: value
      }
    }));
  };

  const toggleDraftCorrectAnswer = (optionKey) => {
    setEditDraft((prev) => {
      const isSelected = prev.correctAnswer.includes(optionKey);
      return {
        ...prev,
        correctAnswer: isSelected
          ? prev.correctAnswer.filter((key) => key !== optionKey)
          : [...prev.correctAnswer, optionKey].sort()
      };
    });
  };

  const saveQuestionEdits = async () => {
    if (!currentQuestion || !editDraft || !canEditCurrentQuestion) return;

    setIsSavingQuestion(true);
    setEditMessage('');

    try {
      const updatedQuestion = await updateQuizQuestion({
        userId: currentUser.id,
        questionId: currentQuestion.id,
        options: editDraft.options,
        correctAnswer: editDraft.correctAnswer,
        explanation: editDraft.explanation
      });

      setCurrentQuestion(updatedQuestion);
      setQuestions((prev) => prev.map((question) => (
        question.id === updatedQuestion.id ? updatedQuestion : question
      )));
      setQuestionHistory((prev) => prev.map((attempt) => (
        attempt.question.id === updatedQuestion.id
          ? { ...attempt, question: updatedQuestion }
          : attempt
      )));
      setShuffledOptions(sortOptions(updatedQuestion.options));
      setSelectedAnswers((prev) => prev.filter((answer) => (
        Object.prototype.hasOwnProperty.call(updatedQuestion.options, answer)
      )));
      setIsEditingQuestion(false);
      setEditDraft(null);
      setEditMessage('题目已保存，本地题库已同步更新');
    } catch (error) {
      setEditMessage(error.message || '云端保存失败');
    } finally {
      setIsSavingQuestion(false);
    }
  };

  const resetProgress = async () => {
    if (!activeChapterId) return;

    const emptyProgress = { answeredIds: [], correctCount: 0 };
    setProgress(emptyProgress);
    setQuestionHistory([]);
    setElapsedSeconds(0);
    setIsTimerRunning(false);
    saveChapterProgressLocally(categoryId, activeChapterId, emptyProgress);
    try {
      const result = await syncQueuedProgress();
      setPendingSyncCount(result.pending);
      setSyncMessage('进度已重置并同步云端');
    } catch (error) {
      setPendingSyncCount(getSyncQueueSize());
      setSyncMessage(`重置已保存本地，同步失败：${error.message}`);
    }
    prepareQuestion(pickRandomQuestion(questions, []));
  };

  if (isLoading) {
    return (
      <div className="quiz">
        <div className="quiz-container">正在读取本地题目...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="quiz">
        <div className="quiz-container">加载失败：{errorMessage}</div>
      </div>
    );
  }

  if (!currentQuestion) {
    const wrongCount = totalQuestions - progress.correctCount;
    const accuracy = totalQuestions > 0
      ? `${Math.round((progress.correctCount / totalQuestions) * 100)}%`
      : '0%';

    return (
      <div className="quiz quiz-complete">
        <div className="complete-card">
          <div className="complete-icon">🎉</div>
          <h2 className="complete-title">恭喜完成所有题目！</h2>
          <p className="complete-text">
            本章节共 {totalQuestions} 题，您已全部答完
          </p>
          <div className="complete-stats">
            <div className="stat">
              <span className="stat-value">{progress.correctCount}</span>
              <span className="stat-label">正确</span>
            </div>
            <div className="stat">
              <span className="stat-value">{wrongCount}</span>
              <span className="stat-label">错误</span>
            </div>
            <div className="stat">
              <span className="stat-value">{accuracy}</span>
              <span className="stat-label">正确率</span>
            </div>
          </div>
          <div className="complete-actions">
            <Link to="/" className="btn btn-secondary">
              返回首页
            </Link>
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="btn btn-secondary"
            >
              {isSyncing ? '同步中...' : '立即同步进度'}
            </button>
            <button onClick={resetProgress} className="btn btn-primary">
              重新开始
            </button>
          </div>
          {syncMessage && <div className="sync-status">{syncMessage}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-container compact-paper">
        <div className={`quiz-layout ${isFillBlank ? 'fill-blank-layout' : ''}`}>
          <aside className="quiz-side quiz-side-left">
            <div className="category-badge">
              <span className="category-icon">{category?.icon || '📝'}</span>
              <span className="category-name">{category?.name}</span>
            </div>
            <div className="question-counter">
              第 {Math.min(currentQuestionNumber, totalQuestions)} / {totalQuestions} 题
            </div>
            <div className="quiz-timer" aria-label={`本次用时 ${elapsedTimeText}`}>
              <div className="quiz-timer-readout">
                <span className="quiz-timer-label">本次用时</span>
                <span className="quiz-timer-value">{elapsedTimeText}</span>
              </div>
              <button
                type="button"
                className="quiz-timer-button"
                onClick={() => setIsTimerRunning((running) => !running)}
              >
                {isTimerRunning ? '停止' : '开始'}
              </button>
            </div>
            <ProgressBar current={visibleProgress.answeredIds.length} total={totalQuestions} />
            <div className="status-details compact">
              <div className="status-item">
                <span className="status-label">已答</span>
                <span className="status-value">{visibleProgress.answeredIds.length}</span>
              </div>
              <div className="status-item">
                <span className="status-label">正确</span>
                <span className="status-value">{visibleProgress.correctCount}</span>
              </div>
              <div className="status-item">
                <span className="status-label">正确率</span>
                <span className="status-value">
                  {visibleProgress.answeredIds.length > 0
                    ? `${Math.round((visibleProgress.correctCount / visibleProgress.answeredIds.length) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="sync-progress-button"
            >
              {isSyncing ? '同步中...' : '立即同步进度'}
            </button>
            <div className="sync-queue-hint">
              待同步 {pendingSyncCount} 条
            </div>
          </aside>

          <section className="question-card">
            <div className="quiz-toolbar">
              <div className="question-type-badge">
                {isFillBlank ? '填空题' : isMultipleChoice ? '多选题' : '单选题'}
              </div>
              {!isFillBlank && (
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(event) => setShuffleOptions(event.target.checked)}
                />
                <span className="toggle-slider"></span>
                打乱选项
              </label>
              )}
            </div>

            <h2 className="question-text">{currentQuestion.question}</h2>

            {!isFillBlank && (
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
            )}

            <div className="action-buttons">
              <div className="submit-section">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={questionHistory.length === 0}
                  className="previous-button"
                >
                  ← 返回上一题
                </button>
                {isFillBlank ? (
                  <>
                    <button
                      onClick={revealFillBlankAnswer}
                      disabled={showResult || isReviewingHistory}
                      className="submit-button"
                    >
                      显示答案
                    </button>
                    {(showResult || isReviewingHistory) && (
                      <button
                        onClick={() => loadNewQuestion(visibleProgress, false)}
                        className="submit-button"
                      >
                        继续答题
                      </button>
                    )}
                  </>
                ) : (
                  <>
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length === 0 || showResult || isReviewingHistory}
                  className="submit-button"
                >
                  确认提交
                </button>
                {isReviewingHistory && (
                  <button
                    onClick={() => loadNewQuestion(visibleProgress, false)}
                    className="submit-button"
                  >
                    继续答题
                  </button>
                )}
                {selectedAnswers.length === 0 && !showResult && (
                  <span className="hint-text">请先选择答案</span>
                )}
                  </>
                )}
              </div>
            </div>
          </section>

          <aside className="quiz-side quiz-side-right">
            <button
              onClick={async () => {
                const result = await copyQuestionToClipboard(currentQuestion, {
                  includeSelectedAnswer: showResult && !isFillBlank,
                  selectedAnswers
                });
                setCopyMessage(result.message);
                setTimeout(() => setCopyMessage(''), 2000);
              }}
              className="copy-button"
            >
              📋 复制题目和答案
            </button>
            {copyMessage && <span className="copy-message">{copyMessage}</span>}

            <div className={`result-feedback ${!showResult ? 'empty' : ''} ${isCorrect ? 'correct' : 'wrong'} ${isFillBlank ? 'fill-blank-answer' : ''}`}>
              {isFillBlank ? (
                <>
                  <div className="fill-answer-title">带答案版</div>
                  <div className={`fill-answer-content ${!showResult ? 'masked' : ''}`}>
                    <div className="fill-answer-text">
                      {renderFillBlankAnswer(currentQuestion, showResult)}
                    </div>
                    {!showResult && (
                      <button
                        type="button"
                        className="answer-mask"
                        onClick={revealFillBlankAnswer}
                      >
                        点击显示答案
                      </button>
                    )}
                  </div>
                  {showResult && (
                    <div className="explanation">
                      <strong>💡 解析：</strong>
                      {currentQuestion.explanation}
                    </div>
                  )}
                  {showResult && syncMessage && <span className="copy-message">{syncMessage}</span>}
                </>
              ) : (
              <>
                {!showResult && (
                <div className="feedback-placeholder">
                  提交后在这里查看正误、答案和解析
                </div>
                )}
                {showResult && !isCorrect && (
                <>
                  <div className="feedback-title wrong">
                    <span className="feedback-icon">❌</span>
                    回答错误
                  </div>
                  <div className="feedback-content">
                    <p>
                      <strong>你的答案：</strong>
                      {selectedAnswers.map((key) => currentQuestion.options[key]).join(', ')}
                    </p>
                    <p>
                      <strong>正确答案：</strong>
                      {correctAnswers.map((key) => currentQuestion.options[key]).join(', ')}
                    </p>
                  </div>
                </>
                )}
                {showResult && (
                <div className="explanation">
                  <strong>💡 解析：</strong>
                  {currentQuestion.explanation}
                </div>
                )}

                {showResult && isCorrect && (
                <div className="feedback-title correct">
                  <span className="feedback-icon">✓</span>
                  回答正确！{syncMessage && <span className="copy-message">{syncMessage}</span>}
                </div>
                )}
              </>
              )}

              {showResult && canEditCurrentQuestion && !isFillBlank && (
                <div className="question-editor">
                  {!isEditingQuestion ? (
                    <button
                      type="button"
                      className="edit-question-button"
                      onClick={startEditingQuestion}
                    >
                      编辑答案和解析
                    </button>
                  ) : (
                    <div className="question-editor-form">
                      <div className="editor-title">编辑本题</div>
                      {sortOptions(editDraft.options).map((option) => (
                        <label key={option.key} className="editor-option-row">
                          <input
                            type="checkbox"
                            checked={editDraft.correctAnswer.includes(option.key)}
                            onChange={() => toggleDraftCorrectAnswer(option.key)}
                          />
                          <span className="editor-option-key">{option.key.toUpperCase()}</span>
                          <input
                            type="text"
                            value={option.value}
                            onChange={(event) => updateDraftOption(option.key, event.target.value)}
                            className="editor-option-input"
                          />
                        </label>
                      ))}
                      <label className="editor-explanation">
                        <span>解析</span>
                        <textarea
                          value={editDraft.explanation}
                          onChange={(event) => setEditDraft((prev) => ({
                            ...prev,
                            explanation: event.target.value
                          }))}
                          rows={5}
                        />
                      </label>
                      <div className="editor-actions">
                        <button
                          type="button"
                          className="editor-cancel-button"
                          onClick={cancelEditingQuestion}
                          disabled={isSavingQuestion}
                        >
                          取消
                        </button>
                        <button
                          type="button"
                          className="editor-save-button"
                          onClick={saveQuestionEdits}
                          disabled={isSavingQuestion}
                        >
                          {isSavingQuestion ? '保存中...' : '保存修改'}
                        </button>
                      </div>
                    </div>
                  )}
                  {editMessage && <div className="editor-message">{editMessage}</div>}
                </div>
              )}

              {showResult && !isCorrect && !isReviewingHistory && !isFillBlank && (
                <>
                  {syncMessage && <div className="copy-message">{syncMessage}</div>}
                  <button onClick={() => loadNewQuestion(visibleProgress)} className="next-button">
                    继续答题
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
