import React from 'react';

import './nav_home.css';



const NavegationHome = () => {
    return (
        <nav className='nav_home_container'>
            <ul className='navegation_home_ul'>
                <li>
                    <a href="/admin">Administracion</a>
                </li>
                <li>
                    <a href="/seguridad">Seguridad</a>
                </li>
                <li>
                    <a href="/indicadores">Indicadores</a>
                </li>
                <li>
                    <a href="/incidencias">Incidencias</a>
                </li>
            </ul>

        </nav>
    );
};

export default NavegationHome;