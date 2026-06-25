import './ProgressBar.css';

export default function ProgressBar({ current, total, color = '#667eea' }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span className="progress-text">进度：{current} / {total}</span>
        <span className="progress-percentage">{percentage.toFixed(0)}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`
          }}
        />
      </div>
    </div>
  );
}
