import "./card.css"

import people from "../../assets/peoples.png"
import plato from "../../assets/platos.png"
import menu from "../../assets/menu.png"
import comedor from "../../assets/comedor.png"
import reserva from "../../assets/reservation.png"

const CardAdmin = ()=>{
    return (
        <div className="card_container">
            <div className="card">
                <img src={comedor} className="img_card"/>
                <p>Comedor</p>
            </div>
            <div className="card">
                <img src={menu} className="img_card"/>
                <p>Menú</p>
            </div>
            <div className="card">
                <img src={plato} className="img_card"/>
                <p>Platos</p>
            </div>
            <div className="card">
                <img src={people} className="img_card"/>
                <p>Ciudadanos</p>
            </div>
            <div className="card">
                <img src={reserva} className="img_card"/>
                <p>Reserva</p>
            </div>
        </div>
    )
}

export default CardAdmin