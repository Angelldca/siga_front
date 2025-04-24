
import Filter from "../../components/filter/filter";
import "./Event.css"


import Table from "../../components/table/table";

import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";

import { filtroEvent, th_elementEvent } from "./eventField";

import ActionBtn from "../../components/action_btn/actionBtn";

import Modal from "../../components/modal/Modal";
import EventForm, { EventFormValues } from "../../components/event_form/event_form";
import Alert from "../../components/alert/alert";
import DeleteAlert from "../../components/delete_alert/deleteAlert";
import { useModuleCrud } from "../../hooks/useModuleCrud";



function GestionEventos() {
 const {  result, loading,setAvaible,avaible,selectedIds,
    handleSortChange,handlerCreate,handlerEdit,handlerDelete,showDetail,editModule,
  deleteModule,handleSelectOne,handleSelectAll,sortConfig,setDatafilter,isModalOpen,alert,
  setAlert,isDelete,setModalOpen,setIsDelete,handleFilter,data,setData,createModule} = useModuleCrud("/api/evento", "Evento");
  const [editingEvent, setEditingEvent] = useState<Partial<EventFormValues> | null>(null);

  useEffect(() => {
    if (!loading) setData(result.data);
  }, [loading, result.data]);

  useEffect(() => {
    setAvaible(selectedIds.size)
  }, [selectedIds]);


  return (
    <div className="event-container">
       <ActionBtn 
       module="Eventos" 
       avaible={avaible}
       createModule={()=>{
        createModule(setEditingEvent)
       }}
       editModule={()=>{
        editModule(setEditingEvent)
       }}
       deleteModule={deleteModule}
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

     <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false); setIsDelete(false);}}>
      {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)
                
                }
             
              />
            )}
        {isDelete ? 
        <DeleteAlert module="Producto" 
        handlerDelete={handlerDelete}
        onClose={() => { setModalOpen(false); setIsDelete(false); }} />
        :
        <EventForm
        initialValues={editingEvent || undefined}
        onSubmit={editingEvent ? handlerEdit : handlerCreate}
        onClose={() => { setModalOpen(false); setEditingEvent(null); }}
        />
        }
      </Modal>
    </div>
  );
}

export default GestionEventos;

