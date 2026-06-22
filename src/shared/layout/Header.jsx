import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser, subscribeToAuthChanges } from '../../features/auth/authStore';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [isQuizHeaderHidden, setIsQuizHeaderHidden] = useState(false);

  useEffect(() => {
    return subscribeToAuthChanges(setCurrentUser);
  }, []);

  const isQuizPage = location.pathname.startsWith('/quiz/');

  useEffect(() => {
    if (!isQuizPage) {
      return undefined;
    }

    let lastScrollY = window.scrollY;
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const handleScroll = () => {
      if (!mobileQuery.matches) {
        setIsQuizHeaderHidden(false);
        return;
      }

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      setIsQuizHeaderHidden(isScrollingDown && currentScrollY > 48);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isQuizPage]);

  const handleZoomChange = (change) => {
    const newZoom = Math.max(70, Math.min(130, zoomLevel + change));
    setZoomLevel(newZoom);
    document.documentElement.style.fontSize = `${newZoom / 100}em`;
  };

  return (
    <header className={`header ${isQuizPage ? 'quiz-mobile-header' : ''} ${
      isQuizHeaderHidden ? 'is-hidden' : ''
    }`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">📝</span>
          <span className="logo-text">答题挑战</span>
        </Link>
        <div className="header-right">
          <div className="zoom-control">
            <button
              onClick={() => handleZoomChange(-10)}
              className="zoom-btn"
              aria-label="缩小"
            >
              −
            </button>
            <span className="zoom-level">{zoomLevel}%</span>
            <button
              onClick={() => handleZoomChange(10)}
              className="zoom-btn"
              aria-label="放大"
            >
              +
            </button>
          </div>
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              首页
            </Link>
            <Link
              to="/wrong-book"
              className={`nav-link ${location.pathname === '/wrong-book' ? 'active' : ''}`}
            >
              错题本
            </Link>
            <Link
              to="/quiz-manager"
              className={`nav-link ${location.pathname === '/quiz-manager' ? 'active' : ''}`}
            >
              题库管理
            </Link>
          </nav>
          <div className="auth-control">
            {currentUser ? (
              <>
                <span className="auth-user">{currentUser.username}</span>
                <button type="button" className="auth-button" onClick={logoutUser}>
                  退出
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`auth-button ${location.pathname === '/login' ? 'active' : ''}`}
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
