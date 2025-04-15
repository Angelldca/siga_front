import React, { useState } from "react";
import down from '../../assets/down.png'
import up from '../../assets/up.png'
import search from '../../assets/search.png'
import clean from '../../assets/clean.png'
import './Filter.css'

const Filter = ()=>{
    const [hidden, setHiden] = useState(false);

    return(
        <div className="filter-container">
            <header className="filter-header" onClick={()=>setHiden(!hidden)}>
                {hidden ? <img src={down} alt="close"/> :<img src={up} alt="expand"/> } Filtros
            </header>
            <form className={`form-container ${hidden ? 'hidden' : ''}`}>
                <div className="filtro">
                    <div className="criteria-filter">
                    <label className="label-filter">criterio1</label>
                    <select className="select-filter">
                        <option value="0">Nombre</option>
                        <option value="1">Estado</option>
                    </select>
                    </div>
                    <div className="search-filter">
                    <label className="label-filter">buscar</label>
                    <input type="text" className="input-filter"/>
                    </div>
                </div>
                <button className="btn-filter" type="submit">
                    <img src={search}/>
                </button>
                <button className="clean" type="button">
                    <img src={clean}/>
                </button>
            </form>
                <strong>asdasdasd</strong>

        </div>
    )
}

export default Filter;