
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
import ActionBtn from "../../components/action_btn/actionBtn";
import { useFetch } from "../../hooks/useFetch";



function GestionEventos() {
 const { result, loading, handleFilter, data: dataFilter, setData: setDatafilter } = useDataTable("/api/evento/search");
 const {setData: setDataFech, data: dataFetch, 
  create,result:resultFetch,error:errorFetch,
  loading:LoadingFetch} = useFetch("/api/evento");

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

  const handlerCreate = ()=>{
     console.log("Create: ", avaible)
  }
  const handlerEdit = ()=>{
    console.log("Edit: ", avaible)
 }
 const handlerDelete = ()=>{
  console.log("Delete: ", avaible)
}
const showDetail = ()=>{
  console.log("Detail: ", avaible)
}

  return (
    <div className="event-container">
       <ActionBtn 
       module="Eventos" 
       avaible={avaible}
       createModule={handlerCreate}
       editModule={handlerEdit}
       deleteModule={handlerDelete}
       showDetail={showDetail}
       
       />
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

