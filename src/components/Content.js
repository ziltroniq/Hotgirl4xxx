import React from 'react';
import './Content.css';
import Gallery from './Gallery';
import Panel from './Panel';

const Content = () => {
  return (
    <div className="content">
      <Gallery />
      <Panel />
    </div>
  );
};

export default Content;