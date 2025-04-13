import React from 'react';
import './Alert.css';

export default function Alert({ type = 'error', message, onClose }) {
  return (
    <div className={`alert alert-${type} animate__animated animate__fadeInRight`}>
      <div className='title-alert'>
        <small className="alert-icon">{
          type === 'success' ? '✅ Operacion Exisota' :
            type === 'warning' ? '⚠️ Advertencia' :
              '❌ Error'
        }</small>
        <button className="alert-close" onClick={onClose}>✕</button>
      </div>
      <p className="alert-message">{message}</p>
    </div>
  );
}