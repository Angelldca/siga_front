import { useState } from "react";
import PersonaForm from "../personaForm/personaForm";
import PuntosControlSelector from "../punto_control/PuntoControl";
import './CiudadanosAction.css';

const CiudadanosAction = () => {
    const empresaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  

    const handleSubmit = (values: any) => {
        console.log("Datos enviados:", values);
        
    };
    const listaDePuntos = [
        { id: "1", nombre: "Punto de control A" },
        { id: "2", nombre: "Punto de control B" },
        { id: "3", nombre: "Punto de control C" },
        { id: "4", nombre: "Punto de control D" },
      ];
      const puntosYaAsignados = ["1", "3"];
      const [puntosSeleccionados, setPuntosSeleccionados] = useState<string[]>(puntosYaAsignados);
    return (
        <div className="person_admin_container">
            <PersonaForm
                initialValues={{}}
                onSubmit={handleSubmit}
                empresaId={empresaId}
            />
            <PuntosControlSelector
            puntosDisponibles={listaDePuntos}
            puntosAsignadosIniciales={puntosYaAsignados}
            onChange={setPuntosSeleccionados}
            />
        </div>
    );
}

export default CiudadanosAction;