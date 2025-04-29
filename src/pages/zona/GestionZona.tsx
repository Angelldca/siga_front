



import Filter from "../../components/filter/filter";
import "./GestionZona.css"


import Table from "../../components/table/table";

import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";

import { filtroEvent, th_elementEvent } from "./zonaField";

import ActionBtn from "../../components/action_btn/actionBtn";

import Modal from "../../components/modal/Modal";
import EventForm, { EventFormValues } from "../../components/event_form/event_form";
import Alert from "../../components/alert/alert";
import DeleteAlert from "../../components/delete_alert/deleteAlert";
import { useModuleCrud } from "../../hooks/useModuleCrud";
import FooterTable from "../../components/footer-table/foter-table";
import { PaginationInfo } from "../../utils/interfaces";
import EventDetail from "../../components/event_detail/event-detail";
import ActionBtnTable from "../../components/action_btn_table/action_btn_table";
import ZonaForm from "../../components/zona_form/zona_form";



function GestionZona() {
 const {  result, loading,setAvaible,avaible,selectedIds,
    handleSortChange,handlerCreate,handlerEdit,handlerDelete,editModule,
  deleteModule,handleSelectOne,handleSelectAll,sortConfig,setDatafilter,isModalOpen,alert,
  setAlert,isDelete,setModalOpen,setIsDelete,handleFilter,data,setData,dataFilter,createModule,
  isDetail, setIsDetail,showDetail} = useModuleCrud("/api/zona", "Zona");
  const [editingEvent, setEditingEvent] = useState<Partial<EventFormValues> | null>(null);
  const [detailModule, setDetailModuele] = useState<Partial<EventFormValues> | null>(null);
  const [metadata, setMetadata] = useState<PaginationInfo >({
    totalPages: 0,
    totalElementsPage: 0,
    totalElements: 0,
    size: 0,
    page: 0,
  });
  useEffect(() => {
    if (!loading) {
      setData(result.data);
      const { totalPages, totalElementsPage, totalElements, size, page } = result;
      setMetadata({
        totalPages,
        totalElementsPage,
        totalElements,
        size,
        page,
      });
    }
  }, [loading, result.data]);

  useEffect(() => {
    setAvaible(selectedIds.size)
    editModule(setEditingEvent,false);
  }, [selectedIds]);


  return (
    <div className="gestion-zona">

    <div className="event-container">
       <ActionBtn 
       module="Zona" 
       avaible={avaible}
       createModule={()=>{
       // createModule(setEditingEvent)
       }}
       editModule={()=>{
        
       }}
       deleteModule={deleteModule}
       showDetail={()=>{
        showDetail(setDetailModuele)
       }}
       
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
          children= {<ActionBtnTable module="Evento" asignModule={()=>{
            createModule(setEditingEvent)
           }}/>}
        />
      )}
      <FooterTable setDatafilter={setDatafilter} dataFilter={dataFilter} paginate={metadata}/>
     <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false);setEditingEvent(null); setIsDelete(false); setIsDetail(false)}}>
      {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)
                
                }
             
              />
            )}
        {isDelete && 
        <DeleteAlert module="elementos seleccionados" 
        handlerDelete={handlerDelete}
        onClose={() => { setModalOpen(false); setIsDelete(false); setIsDetail(false)}} />}
        {
         isDetail &&
        <EventDetail result={detailModule} onEdit={()=>{
          setModalOpen(false); setIsDelete(false); setIsDetail(false);
          editModule(setEditingEvent,false)
         }}/>
        }
      </Modal>
    </div>
    <div className="form-container-zona">

    <ZonaForm 
     initialValues={editingEvent || undefined}
     onSubmit={editingEvent ? handlerEdit : handlerCreate}
     onClose={() => { setModalOpen(false); setEditingEvent(null); }}
    />
    </div>
    </div>
  );
}

export default GestionZona;

