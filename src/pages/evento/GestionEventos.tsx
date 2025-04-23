
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
import Modal from "../../components/modal/Modal";
import EventForm, { EventFormValues } from "../../components/event_form/event_form";
import Alert from "../../components/alert/alert";



function GestionEventos() {
 const { result, loading, handleFilter, data: dataFilter, setData: setDatafilter } = useDataTable("/api/evento/search");
 const { create, loading: creating, error,editFetch, user, result: resultFetch } = useFetch("/api/evento");

  const [data, setData] = useState<DataRow[]>([]);
  const [avaible, setAvaible] = useState<number>(0);
  const { selectedIds, handleSelectOne, handleSelectAll } = useCheck(data);

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });
  const [isModalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: string, message: string }|null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<EventFormValues> | null>(null);

  useEffect(() => {
    if (!loading) setData(result.data);
  }, [loading, result.data]);

  useEffect(() => {
    setAvaible(selectedIds.size)
  }, [selectedIds]);

  const handleSortChange = (key: string | null, order: "ASC" | "DES" | null) => {
    handleSortChangeUtils(key, order, dataFilter, { setSortConfig, handleFilter });
  };

  const handlerCreate = (value: any)=>{
   
    create({
      ...value,
      empresa: user?.empresa.id,
    }).then((res) => {
      if (res.error) {
        setAlert({
          type: "error",
          message: res.error.errorMessage || "Error al crear el evento",
        });
      } else {
        setAlert({
          type: "success",
          message: "Evento creado correctamente",
        });
        setTimeout(() => {
          setModalOpen(false);
          setAlert(null);
          handleFilter({filterValues: []});
        }, 2000);
      }
    })
  }
  const handlerEdit = (value: any)=>{
    if (selectedIds.size !== 1) {
      setAlert({ type: "error", message: "Selecciona un solo evento para editar." });
      return;
    }
    const idToEdit = Array.from(selectedIds)[0];
    const evt = data.find(d => d.id === idToEdit);
    if (!evt) return;
    
    setModalOpen(true);
    editFetch(evt.id,value).then((res) => {
      if (res.error) {
        setAlert({
          type: "error",
          message: res.error.errorMessage || "Error al crear el evento",
        });
      } else {
        setAlert({
          type: "success",
          message: "Evento editado correctamente",
        });
        setTimeout(() => {
          setModalOpen(false);
          setAlert(null);
          handleFilter({filterValues: []});
        }, 2000);
      }
    })
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
       createModule={()=> {
        setEditingEvent(null);
        setModalOpen(true)
      }}
       editModule={()=> {
        setModalOpen(true)
        const idToEdit = Array.from(selectedIds)[0];
        const evt = data.find(d => d.id === idToEdit);
        if (!evt) return;
        setEditingEvent({
          nombre: evt.nombre,
          type: evt.type,      
          fechaInicio: evt.fechaInicio,
          fechaFin:    evt.fechaFin,
          horaInicio:  evt.horaInicio,
          horaFin:     evt.horaFin,
          activo:      evt.activo,
          ilimitado:   evt.ilimitado,
        });
      }}
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

     <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
      {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)
                
                }
             
              />
            )}
        <EventForm
        initialValues={editingEvent || undefined}
        onSubmit={editingEvent ? handlerEdit : handlerCreate}
        onClose={() => { setModalOpen(false); setEditingEvent(null); }}
        />
      </Modal>
    </div>
  );
}

export default GestionEventos;

