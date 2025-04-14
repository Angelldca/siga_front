import React from 'react';

import './nav_home.css';
import { Can } from '../can/Can';
import { Link } from 'react-router-dom';


const NavegationHome = () => {
    return (
        <nav className='nav_home_container'>
            <ul className='navegation_home_ul'>
                <Can module="ADMINISTRACION">
                    <Link className='link' to="/configuracion/usuarios">Administración</Link>
                </Can>
                <Can module="CONFIGURACION">
                    <Link className='link' to="/configuracion/usuarios">Configuración</Link>
                </Can>
                <Can module="INDICADORES">
                    <Link className='link' to="/configuracion/usuarios">Indicadores</Link>
                </Can>
                <Can module="RESERVA">
                    <Link className='link' to="/configuracion/usuarios">Reservas</Link>
                </Can>
                <Can module="CONTROL_ACCESO">
                    <Link className='link' to="/configuracion/usuarios">Control de Acceso</Link>
                </Can>
            </ul>

        </nav>
    );
};

export default NavegationHome;