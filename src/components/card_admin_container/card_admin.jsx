import "./card.css"

import people from "../../assets/peoples.png"
import plato from "../../assets/platos.png"
import menu from "../../assets/menu.png"
import comedor from "../../assets/comedor.png"
import reserva from "../../assets/reservation.png"
import { Can } from "../can/Can"
import { Link } from "react-router-dom"

const CardAdmin = () => {
    return (
        <div className="card_container">
            <Can module="ADMINISTRACION" permission="GESTION-EVENTO">
                <div className="card">
                    <img src={comedor} className="img_card" />
                    <p>Eventos</p>
                </div>
            </Can>
            <Can module="ADMINISTRACION" permission="GESTION-AREA">
                <div className="card">
                    <img src={menu} className="img_card" />
                    <p>Zonas</p>
                </div>
            </Can>
            <Can module="ADMINISTRACION" permission="GESTION-PUERTA">
                <div className="card">
                    <img src={plato} className="img_card" />
                    <p>Control de Acceso</p>
                </div>
            </Can>
            <Can module="ADMINISTRACION" permission="GESTION-CIUDADANOS">
                <div className="card">
                    <img src={people} className="img_card" />
                    <p>Ciudadanos</p>
                </div>
            </Can>
            <Can module="RESERVA" permission="GESTION-RESERVA">
                <div className="card">
                    <img src={reserva} className="img_card" />
                    <p>Reserva</p>
                </div>
            </Can>
        </div>
    )
}

export default CardAdmin