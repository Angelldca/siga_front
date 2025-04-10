import React from 'react'
import Plato from './plato-card'
import profileImg from '../../assets/bg.webp';


const Menu = () => {
    return (
        <div className="menu-card">
            <div className="card-header"></div>
            <div className="card-body">
                <img src={profileImg} alt="menu" className="menu-img" />
                <h3 className="name">Desayuno</h3>
                <p >Martes 10 de noviebre</p>
                <Plato/>
                <Plato/>
                <Plato/>
            </div>
        </div>
    )
}

export default Menu