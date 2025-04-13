import React from 'react';

import login from '../../assets/login.png';
import './header.css';
import Navegation from '../navegation/nagegation';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const { user, logout } = useAuth();
  const navegate = useNavigate();
  const handlerLogout = () => {
    logout();
    navegate("/")
  }

  return (
    <header className="header">
      <div className="container">
        <div className='logoContainer'>
          <img src={user?.empresa.logo} alt="Logo" className="logo" />
        </div>
        <Navegation />
        <div className='loginContainer'>
          <div className='user-profile'>
            <p>{user?.username}</p>
            <div className='icon-profile'>
              <img src={user?.image} className='img-user-profile' />
            </div>
          </div>
          <section className='close-section'>
            <button className="login-button" onClick={handlerLogout}>
              <img src={login} className='login-icon' />
            </button>
            <span className="login-text">Cerrar Sesión</span>

          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;