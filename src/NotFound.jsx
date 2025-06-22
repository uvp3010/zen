// src/pages/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111',
      color: '#fff',
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem' }}>😵 404 - Lost in Space!</h1>
      <p>Looks like this page took a vacation. Or maybe Render timed out again(hosted on free service).</p>
      <p>Either way, there's nothing here but cosmic silence.</p>
      <a href="/" style={{ marginTop: '20px', color: '#00ffcc', fontSize: '1.2rem' }}>
        🛸 Beam me back home
      </a>
    </div>
  );
};

export default NotFound;
