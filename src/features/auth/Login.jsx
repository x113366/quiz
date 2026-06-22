import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  loginUser,
  registerUser,
  subscribeToAuthChanges
} from './authStore';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return subscribeToAuthChanges(setCurrentUser);
  }, []);

  const isRegistering = mode === 'register';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (isRegistering && password !== confirmPassword) {
      setMessage('两次输入的密码不一致');
      return;
    }

    setIsSubmitting(true);
    try {
      await (isRegistering ? registerUser(username, password) : loginUser(username, password));
      navigate('/');
    } catch (error) {
      setMessage(error.message || '操作失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentUser) {
    return (
      <div className="login-page">
        <section className="login-panel">
          <p className="login-eyebrow">当前账号</p>
          <h1 className="login-title">{currentUser.username}</h1>
          <p className="login-copy">你的答题进度会同步到这个用户名下。</p>
          <Link to="/" className="login-primary-link">
            返回首页
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="login-page">
      <section className="login-panel">
        <p className="login-eyebrow">{isRegistering ? '创建账号' : '用户登录'}</p>
        <h1 className="login-title">{isRegistering ? '注册用户名' : '登录答题账号'}</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>用户名</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              placeholder="3-32位字母、数字或下划线"
              required
            />
          </label>

          <label className="login-field">
            <span>密码</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              placeholder="至少6位"
              required
            />
          </label>

          {isRegistering && (
            <label className="login-field">
              <span>确认密码</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </label>
          )}

          {message && <div className="login-message">{message}</div>}

          <button className="login-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? '处理中...' : isRegistering ? '注册并登录' : '登录'}
          </button>
        </form>

        <button
          type="button"
          className="login-mode-button"
          onClick={() => {
            setMode(isRegistering ? 'login' : 'register');
            setMessage('');
          }}
        >
          {isRegistering ? '已有账号，去登录' : '没有账号，注册一个'}
        </button>
      </section>
    </div>
  );
}
