import React from "react";
import "./info-card.css"
import event from "../../assets/event_white.png"

const InfoCard = ()=>{

    return(
        <div className="info-card-container">
            <div className="info-card">
              <img src={event} alt="card-info" className="img_card_info"/>
              <div>
                <strong>5</strong>
                <p>Eventos Activos</p>
              </div>
            </div>
            <div className="info-card">
              <img src={event} alt="card-info" className="img_card_info"/>
              <div>
                <strong>5</strong>
                <p>Reservados</p>
              </div>
            </div>
            <div className="info-card">
              <img src={event} alt="card-info" className="img_card_info"/>
              <div>
                <strong>5</strong>
                <p>Ciudadanos</p>
              </div>
            </div>
            <div className="info-card">
              <img src={event} alt="card-info" className="img_card_info"/>
              <div>
                <strong>5</strong>
                <p>Zonas</p>
              </div>
            </div>
            <div className="info-card">
              <img src={event} alt="card-info" className="img_card_info"/>
              <div>
                <strong>5</strong>
                <p>Accesos</p>
              </div>
            </div>

        </div>
    );
}

export default InfoCard;