
import Filter from "../../components/filter/filter";
import "./Event.css"

import { useDataTable } from "../../hooks/useData";
import Table from "../../components/table/table";
import { CriteriaFilter, DataFilter, DataRow, FilterType, PaginatedFilter, SortConfig, ThData } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { useCheck } from "../../hooks/useCheck";
import { filtroEvent, th_elementEvent } from "./eventField";
import { handleSortChangeUtils } from "../../utils/sortChange";


function GestionEventos() {
  const { result, loading, handleFilter, data: dataFilter, setData: setDatafilter } = useDataTable();
  const [data, setData] = useState<DataRow[]>([]);
  const { selectedIds, handleSelectOne, handleSelectAll } = useCheck(data);

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });

  useEffect(() => {
    if (!loading) setData(result.data);
  }, [loading, result.data]);
  

  
  const handleSortChange = (key: string | null, order: "ASC" | "DES" | null) => {
    handleSortChangeUtils(key, order, dataFilter, { setSortConfig, handleFilter });
  };

  return (
    <div className="event-container">
      <div className="event-accion">
        <h3>Eventos</h3>
         <div className="accions">
          <button className="btn btn-primary">Crear Evento</button>
          <button className="btn btn-secondary">Detalles</button>
          <button className="btn btn-danger">Eliminar</button>
         </div>
      </div>
      <Filter filtros={filtroEvent} onSubmit={values => handleFilter({ values })} />

      {loading ? (
        <Loading />
      ) : (

        <Table
          th_element={th_elementEvent}
          data={data}
          selectedIds={selectedIds}
          onSelectOne={handleSelectOne}
          onSelectAll={handleSelectAll}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
          setDatafilter={setDatafilter}
        />
      )}
    </div>
  );
}

export default GestionEventos;

