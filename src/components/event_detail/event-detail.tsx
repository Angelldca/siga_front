import calendarIcon   from "../../assets/calendar.png";
import typeIcon       from "../../assets/type.png";
import clock       from "../../assets/clock.png";

import { useNavigate } from 'react-router-dom';
import './EventDetail.css'
import { useEffect } from "react";




export interface EventDetailProps {
   result: any;
    onEdit: (value:any) => void;
  }
  
  export default function EventDetail({
    result,
    onEdit,
  }: EventDetailProps) {
    useEffect(() => {
      console.log(result)
    },[])
  
  
   
    const fi = new Date(`${result.fechaInicio}T${result.horaInicio}`);
    const ff = new Date(`${result.fechaFin}T${result.horaFin}`);
    const fechaInicioFmt = fi.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
    const fechaFinFmt = ff.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
    const horaInicioFmt = fi.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const horaFinFmt = ff.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return (
      <div className="event-detail-card">
        <br/>
        <header className="event-detail-header">
          <h1 className="event-detail-title">Evento: {result.nombre}</h1>
          <span
            className={`badge ${
                result.activo ? "badge--green" : "badge--red"
            }`}
          >
            {result.activo ? "Activo" : "Inactivo"}
          </span>
        </header>
  
        <section className="event-detail-body">
          <ul className="detail-list">
            {/* Fechas solo si no es ilimitado */}
            {!result.ilimitado && (
              <li>
                <img src={calendarIcon} alt="" className="icon" />
                <span>
                  {fechaInicioFmt} – {fechaFinFmt}
                </span>
              </li>
            )}
             <li>
                <img src={clock} alt="" className="icon" />
                <span>
                  {horaInicioFmt} –{" "}{horaFinFmt}
                </span>
              </li>
            <li>
              <img src={typeIcon} alt="" className="icon" />
              <span>Tipo: {result.type ?? "—"}</span>
            </li>
          </ul>
        </section>
  
        <footer className="event-detail-footer">
          
          <button className="btn btn-primary" onClick={onEdit}>
            Editar
          </button>
        </footer>
      </div>
    );
  }