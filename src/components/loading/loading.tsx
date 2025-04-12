import React from 'react';
import './Loading.css';

export default function Loading({ message = 'Cargando...' }) {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
      <p className="loading-message">{message}</p>
    </div>
  );
}