// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for notification
  const [notification, setNotification] = useState(null);
  
  // Projects data
  const projects = [
    { id: 1, title: "Projet 1", img: "https://picsum.photos/500/300?1" },
    { id: 2, title: "Projet 2", img: "https://picsum.photos/500/300?2" },
    { id: 3, title: "Projet 3", img: "https://picsum.photos/500/300?3" },
    { id: 4, title: "Projet 4", img: "https://picsum.photos/500/300?4" },
    { id: 5, title: "Projet 5", img: "https://picsum.photos/500/300?5" },
    { id: 6, title: "Projet 6", img: "https://picsum.photos/500/300?6" }
  ];
  
  // Filter projects based on search
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };
  
  // Handlers
  const handlePlayClick = () => {
    showNotification("🎬 Vidéos en direct ! Bienvenue sur Hotgirl4xxx.");
  };
  
  const handleCardClick = (projectTitle) => {
    showNotification(`✨ Vous avez cliqué sur "${projectTitle}" - Contenu exclusif !`);
  };
  
  const handleSidebarClick = (iconName) => {
    showNotification(`📁 Navigation: ${iconName} (démo interactive)`);
  };
  
  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <i className="fas fa-home" onClick={() => handleSidebarClick("Accueil")}></i>
        <i className="fas fa-gamepad" onClick={() => handleSidebarClick("Jeux")}></i>
        <i className="fas fa-fire" onClick={() => handleSidebarClick("Tendances")}></i>
        <i className="fas fa-heart" onClick={() => handleSidebarClick("Favoris")}></i>
        <i className="fas fa-user" onClick={() => handleSidebarClick("Profil")}></i>
      </div>
      
      {/* Main Content */}
      <div className="main">
        {/* Header */}
        <header className="header">
          <div className="logo">HOTGIRL4XXX</div>
          <input
            className="search"
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>
        
        {/* Hero Section */}
        <section className="hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <h1>Hotgirl4xxx</h1>
            <p>Découvrez les meilleurs jeux et projets.</p>
          </div>
        </section>
        
        {/* Content Grid */}
        <div className="content">
          {/* Gallery */}
          <div className="gallery">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="card"
                onClick={() => handleCardClick(project.title)}
              >
                <img src={project.img} alt={project.title} />
                <h3>{project.title}</h3>
              </div>
            ))}
          </div>
          
          {/* Panel */}
          <div className="panel">
            <button className="play-btn" onClick={handlePlayClick}>
              Regarder des vidéos
            </button>
            
            <div className="stats">
              <div className="stat">🔥 12 500 utilisateurs</div>
              <div className="stat">⭐ 4.9/5 note moyenne</div>
              <div className="stat">🚀 Nouveautés chaque semaine</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification Toast */}
      {notification && (
        <div className="toast-notify">
          <i className="fas fa-bell" style={{ marginRight: '8px' }}></i> {notification}
        </div>
      )}
    </div>
  );
}

export default App;
