import React, { useState } from "react";
import down from '../../assets/down.png'
import up from '../../assets/up.png'
import search from '../../assets/search.png'
import clean from '../../assets/clean.png'
import {FilterType } from '../../utils/interfaces'
import './Filter.css'
import { useFilter } from "../../hooks/useFilter";


interface FilterProps {
    filtros: FilterType;
    onSubmit: (values: Record<string, string>) => void;
}

const Filter = ({ filtros, onSubmit }: FilterProps) => {
    const [hidden, setHidden] = useState(false);
  
    const {
        criteriaState,
        handleSelectChange,
        handleInputChange,
        clearFilter,
        getFilterValues
      } = useFilter(filtros);
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const values = getFilterValues();
        onSubmit(values);
      };
  

  
    return (
      <div className="filter-container">
        <header className="filter-header" onClick={() => setHidden(!hidden)}>
        {hidden ? <img src={down} alt="close" /> : <img src={up} alt="expand" />} Filtros
        </header>
  
        <form className={`form-container ${hidden ? "hidden" : ""}`} onSubmit={handleSubmit}>
          <div className="filtro">
            {filtros.criterio.map((filtro, index) => (
              <div className="criteria-search-container" key={index}>
                <div className="criteria-filter">
                  <label className="label-filter">Criterio</label>
                  <select
                    className="select-filter"
                    value={criteriaState[filtro.name].selected}
                    onChange={(e) => handleSelectChange(filtro.name, e.target.value)}
                  >
                    {filtro.values.map((value, i) => (
                      <option key={i} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div className="search-filter">
                  <label className="label-filter">Buscar</label>
                  <input
                    type="text"
                    className="input-filter"
                    value={criteriaState[filtro.name].input}
                    onChange={(e) => handleInputChange(filtro.name, e.target.value)}
                  />
                </div>
              </div>
            ))}
  
            <div className="filter-buttons">
              <button className="btn-filter" type="submit">
              <img src={search} alt="search"/>
              </button>
              <button className="clean" type="button" onClick={clearFilter}>
              <img src={clean} alt="clean"/>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default Filter;