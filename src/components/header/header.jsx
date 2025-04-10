import React from 'react';
import logo from '../../assets/logo-without-letter.png';
import login from '../../assets/login.png';
import './header.css';
import Navegation from '../navegation/nagegation';
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className='logoContainer'>
        <img src={logo} alt="Logo" className="logo"/>
        </div>
        <Navegation/>
        <div className='loginContainer'>
        <span className="login-text">Iniciar Sesión</span>
        <button className="login-button">
            <img src={login} className='login-icon'/>
        </button>
        </div>
      </div>
    </header>
  );
};

export default Header;