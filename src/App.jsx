import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './features/auth';
import { ChapterSelect, Home } from './features/home';
import { flushQueuedProgressWithKeepAlive } from './features/progress';
import { Quiz } from './features/quiz';
import { QuizManager } from './features/quiz-admin';
import { WrongBook } from './features/wrong-book';
import { Header } from './shared/layout';
import './App.css';

function App() {
  useEffect(() => {
    const flushProgress = () => {
      flushQueuedProgressWithKeepAlive();
    };

    window.addEventListener('pagehide', flushProgress);
    window.addEventListener('beforeunload', flushProgress);

    return () => {
      window.removeEventListener('pagehide', flushProgress);
      window.removeEventListener('beforeunload', flushProgress);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters/:categoryId" element={<ChapterSelect />} />
            <Route path="/quiz/:categoryId" element={<Quiz />} />
            <Route path="/quiz/:categoryId/:chapterId" element={<Quiz />} />
            <Route path="/wrong-book" element={<WrongBook />} />
            <Route path="/quiz-manager" element={<QuizManager />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
