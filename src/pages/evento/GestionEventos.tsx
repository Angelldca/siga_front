
import Filter from "../../components/filter/filter";
import "./Event.css"

import { useDataTable } from "../../hooks/useData";
import Table from "../../components/table/table";
import { DataRow, ThData } from "../../utils/interfaces";
import { useEffect, useState } from "react";


const filtro = {
    criterio: [
        {
            name: "criterio_1",
            values: ["Nombre"]
        }
    ]
}

const th_element = {
    th: [
        {
            value: "",
            type: "Check",
            key: "check"
        },{
            value: "Nombre",
            type: "Text",key: "nombre"
        },
        {
            value: "Fecha Inicio",
            type: "Text",key: "fechaInicio"
        },
        {
            value: "Fecha Fin",
            type: "Text",key: "fechaFin"
        },
        {
            value: "Hora Inicio",
            type: "Text", key: "horaInicio"
        },
        {
            value: "Hora Fin",
            type: "Text", key: "horaFin"
        },
        {
            value: "Activo",
            type: "Boolean",key: "activo"
        },
        {
            value: "Ilimitado",
            type: "Boolean",key: "ilimitado"
        }
    ]
}as ThData;

const GestionEventos = () => {
  const { result,error,loading,handleFilter} = useDataTable();
  const [data, setData] = useState<DataRow[]>();

  useEffect(() => {
    if (loading) return;
    console.log(result)
    setData(result?.data);
  }, [loading]);
    return (
        <div className="event-container">
            <div>
                <h3>Eventos</h3>
                <span>Edirar</span>
                <span>Eliminar</span>
                <span>Nuevo</span>
            </div>
            <Filter filtros={filtro} onSubmit={handleFilter}/>
            <Table th_element={th_element} data={data}/>
        </div>
    )
}

export default GestionEventos;