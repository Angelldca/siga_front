
import Filter from "../../components/filter/filter";
import "./Event.css"

import { useDataTable } from "../../hooks/useData";
import Table from "../../components/table/table";
import { DataRow, SortConfig } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { useCheck } from "../../hooks/useCheck";
import { filtroEvent, th_elementEvent } from "./eventField";
import { handleSortChangeUtils } from "../../utils/sortChange";
import add from '../../assets/add.png';
import detail from '../../assets/info_blue.png';
import del from '../../assets/delete_withe.png';
import edit from '../../assets/edit_white.png';


function GestionEventos() {
  const { result, loading, handleFilter, data: dataFilter, setData: setDatafilter } = useDataTable();
  const [data, setData] = useState<DataRow[]>([]);
  const [avaible, setAvaible] = useState<number>(0);
  const { selectedIds, handleSelectOne, handleSelectAll } = useCheck(data);

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });

  useEffect(() => {
    if (!loading) setData(result.data);
  }, [loading, result.data]);

  useEffect(() => {
    setAvaible(selectedIds.size)
  }, [selectedIds]);

  const handleSortChange = (key: string | null, order: "ASC" | "DES" | null) => {
    handleSortChangeUtils(key, order, dataFilter, { setSortConfig, handleFilter });
  };

  return (
    <div className="event-container">
      <div className="event-action">
        <h3>Eventos</h3>
        <div className="actions">
          <div className="btn-container">
            <button className="btn-primary btn_action">
              <img alt="crear-editar" src={`${avaible === 1 ? edit : add}`} />
            </button>
            <span className="tootip">{avaible === 1? "Editar":"Crear"}</span>
          </div>
          <div className="btn-container">
            <button className={`btn-secondary btn_action ${avaible === 1 ? "" : "opacity-btn"}`} >
              <img alt="detail" src={detail} />
            </button>
            <span className="tootip">Detalles</span>
          </div>
          <div className="btn-container">
            <button className={`btn-danger btn_action ${avaible > 0 ? "" : "opacity-btn"}`} >
              <img alt="delete" src={del}/>
            </button>
            <span className="tootip">Eliminar</span>
          </div>
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

