import React from 'react';
import './Panel.css';

const Panel = () => {
  const stats = [
    { icon: '🔥', label: '12 500 utilisateurs' },
    { icon: '⭐', label: '4.9/5 note moyenne' },
    { icon: '🚀', label: 'Nouveautés chaque semaine' },
  ];

  const handlePlayClick = () => {
    alert('Regarder des vidéos clicked!');
  };

  return (
    <div className="panel">
      <button className="play-btn" onClick={handlePlayClick}>
        Regarder des vidéos
      </button>

      <div className="stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat">
            {stat.icon} {stat.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;