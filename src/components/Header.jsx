import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomChange = (change) => {
    const newZoom = Math.max(70, Math.min(130, zoomLevel + change));
    setZoomLevel(newZoom);
    document.documentElement.style.fontSize = `${newZoom / 100}em`;
  };

  return (
    <header className="header">
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
        </div>
      </div>
    </header>
  );
}
