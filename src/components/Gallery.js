import React from 'react';
import './Gallery.css';
import Card from './Card';

const Gallery = () => {
  const projects = [
    { id: 1, title: 'Projet 1', image: 'https://picsum.photos/500/300?1' },
    { id: 2, title: 'Projet 2', image: 'https://picsum.photos/500/300?2' },
    { id: 3, title: 'Projet 3', image: 'https://picsum.photos/500/300?3' },
    { id: 4, title: 'Projet 4', image: 'https://picsum.photos/500/300?4' },
    { id: 5, title: 'Projet 5', image: 'https://picsum.photos/500/300?5' },
    { id: 6, title: 'Projet 6', image: 'https://picsum.photos/500/300?6' },
  ];

  return (
    <div className="gallery">
      {projects.map((project) => (
        <Card
          key={project.id}
          title={project.title}
          image={project.image}
        />
      ))}
    </div>
  );
};

export default Gallery;