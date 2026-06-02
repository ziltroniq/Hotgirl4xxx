import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const icons = [
    { icon: 'fas fa-home', label: 'Home' },
    { icon: 'fas fa-gamepad', label: 'Games' },
    { icon: 'fas fa-fire', label: 'Trending' },
    { icon: 'fas fa-heart', label: 'Favorites' },
    { icon: 'fas fa-user', label: 'Profile' },
  ];

  return (
    <aside className="sidebar">
      {icons.map((item, index) => (
        <div key={index} className="sidebar-icon" title={item.label}>
          <i className={item.icon}></i>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;