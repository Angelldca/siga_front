import React from "react";
import Filter from "../../components/filter/filter";
import "./Event.css"
const GestionEventos = () => {

    return (
        <div className="event-container">
            <h3>Gestion de eventos</h3>
            <Filter />
        </div>
    )
}

export default GestionEventos;