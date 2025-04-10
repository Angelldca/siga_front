import React from 'react';

import './navegation.css';
const Navegation = () => {
    return (
        <nav className='nav_container'>
            <ul className='nagegation-ul'>
                <li>
                    <a href="/home">Inicio</a>
                </li>
                <li>
                    <a href="/report">Incidencia</a>
                </li>
                <li>
                    <a href="/report">Reservar</a>
                </li>
            </ul>

        </nav>
    );
};

export default Navegation;