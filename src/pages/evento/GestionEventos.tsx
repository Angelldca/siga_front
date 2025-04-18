
import Filter from "../../components/filter/filter";
import "./Event.css"

import { useDataTable } from "../../hooks/useData";
import Table from "../../components/table/table";
import { DataRow, FilterType, PaginatedFilter, SortConfig, ThData } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { useCheck } from "../../hooks/useCheck";


function GestionEventos() {
    const { result, loading, handleFilter } = useDataTable();
    const [data, setData] = useState<DataRow[]>([]);
    const { selectedIds, handleSelectOne, handleSelectAll } = useCheck(data);
  
    // Elevamos sortConfig al padre
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });
  
   
  
    useEffect(() => {
      if (!loading) setData(result.data);
    }, [loading, result.data]);
  
    const handleSortChange = (key: string|null, order: "ASC" | "DES" | null) => {
      setSortConfig({ key, order });
      const paginatedFilter: PaginatedFilter = {
        query: "",
        pageSize: 10,
        page: 0,
        sortBy: key ?? "createdAt",      // si key es null, usas un valor por defecto
        sortType: order ?? "DES",        // si order es null, DES de base
      };
      
      // Llamas a handleFilter usando la rama de 'values' (vacío) + paginatedFilter
      handleFilter({
        values: {},             // mantiene los filtros anteriores (vacío aquí)
        paginatedFilter,        // incluye sortBy/sortType
      });
    };
  
    return (
      <div className="event-container">
        <Filter filtros={filtro} onSubmit={values => handleFilter({ values })} />
  
        {loading ? (
          <Loading />
        ) : (
          <Table
            th_element={th_element}
            data={data}
            selectedIds={selectedIds}
            onSelectOne={handleSelectOne}
            onSelectAll={handleSelectAll}
            sortConfig={sortConfig}               // estado elevado
            onSortChange={handleSortChange}
          />
        )}
      </div>
    );
  }

export default GestionEventos;


const filtro: FilterType = {
    criterio: [
        {
            name: "criterio_1",
            values: [{
                value: "Nombre",
                key: "nombre"
            }]
        },
        {
            name: "criterio_2",
            values: [{
                value: "Fecha Inicio",
                key: "fechaInicio"
            }]
        },
    ]
}

const th_element = {
    th: [
        {
            value: "",
            type: "Check",
            key: "check"
        }, {
            value: "Nombre",
            type: "Text", key: "nombre"
        },
        {
            value: "Fecha Inicio",
            type: "Text", key: "fechaInicio"
        },
        {
            value: "Fecha Fin",
            type: "Text", key: "fechaFin"
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
            type: "Boolean", key: "activo"
        },
        {
            value: "Ilimitado",
            type: "Boolean", key: "ilimitado"
        }
    ]
} as ThData;