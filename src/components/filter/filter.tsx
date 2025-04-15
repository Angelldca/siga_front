import React, { useState } from "react";
import './Filter.css'

const Filter = ()=>{
    const [hidden, setHiden] = useState(false);

    return(
        <div className="filter-container">
            <header className="filter-header" onClick={()=>setHiden(!hidden)}>
                {hidden ? "▶ " : "▼ "} Filtros
                </header>
            <form className={`form-container ${hidden ? 'hidden' : ''}`}>
                <div className="filtro">
                    <div className="criteria-filter">
                    <label className="label-filter">criterio1</label>
                    <select className="select-filter">
                        <option value="0">opcion0</option>
                        <option value="1">opcion1</option>
                    </select>
                    </div>
                    <div className="search-filter">
                    <label className="label-filter">buscar</label>
                    <input type="text" className="input-filter"/>
                    </div>
                </div>
            </form>
                <strong>asdasdasd</strong>

        </div>
    )
}

export default Filter;