
import Filter from "../../components/filter/filter";
import "./Event.css"

import { useDataTable } from "../../hooks/useData";
import Table from "../../components/table/table";
import { DataRow, ThData } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";



const GestionEventos = () => {
  const { result,error,loading,handleFilter} = useDataTable();
  const [data, setData] = useState<DataRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number| string>>(new Set());

  const handleSelectOne = (id: number | string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleSelectAll = () => {
    setSelectedIds(prev => {
      if (prev.size === data?.length) {
        return new Set();        
      } else {
        return new Set(data?.map(r => r.id));
      }
    });
  };
  useEffect(() => {
    if (loading) return;
    setData(result.data);
  }, [loading,result]);
    return (
        <div className="event-container">
            <div>
                <h3>Eventos</h3>
                <span>Edirar</span>
                <span>Eliminar</span>
                <span>Nuevo</span>
            </div>
            <Filter filtros={filtro} onSubmit={handleFilter}/>

            {loading ? <Loading/>
            :
            <div>
            <Table 
            th_element={th_element}
            data={data} 
            selectedIds={selectedIds}
            onSelectOne={handleSelectOne}
            onSelectAll={handleSelectAll}
            />
            
            </div>
            }
        </div>
    )
}

export default GestionEventos;


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