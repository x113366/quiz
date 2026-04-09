import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Quiz from './components/Quiz';
import WrongBook from './components/WrongBook';
import QuizManager from './components/QuizManager';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:categoryId" element={<Quiz />} />
            <Route path="/wrong-book" element={<WrongBook />} />
            <Route path="/quiz-manager" element={<QuizManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
