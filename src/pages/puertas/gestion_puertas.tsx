



import Filter from "../../components/filter/filter";
import "./GestionPuerta.css"


import Table from "../../components/table/table";

import { useEffect, useMemo, useState } from "react";
import Loading from "../../components/loading/loading";

import { filtroPuerta, th_elementPuerta } from "./puertaField";

import ActionBtn from "../../components/action_btn/actionBtn";

import Modal from "../../components/modal/Modal";
import Alert from "../../components/alert/alert";
import DeleteAlert from "../../components/delete_alert/deleteAlert";
import { useModuleCrud } from "../../hooks/useModuleCrud";
import FooterTable from "../../components/footer-table/foter-table";
import { PaginationInfo } from "../../utils/interfaces";
import ZonaForm, { ZonaFormValues } from "../../components/zona_form/zona_form";
import PuertaForm from "../../components/PuertaForm/PuertaForm";



function GestionPuerta() {
  const { result, loading, setAvaible, avaible, selectedIds,
    handleSortChange, handlerDelete, editModule,
    deleteModule, handleSelectOne, handleSelectAll, sortConfig, setDatafilter, isModalOpen, alert,
    setAlert, isDelete, setModalOpen, setIsDelete, handleFilter, data, setData, dataFilter, createModule,
    setIsDetail } = useModuleCrud({url:"/api/puerta", module:"Puerta", 
      byBusiness:true, byDelete:true,keySearchBusiness:"zona.empresa.id"});
  
  
    const { handlerCreate, handlerEdit, setSelectedIds, result: resultZonaEvento,alert:alertZonaEvento,
    setAlert:setalertZonaEvento } = useModuleCrud({
      url:"/api/puerta", module:"Puerta",byBusiness:true, byDelete:true,keySearchBusiness:"zona.empresa.id",list:false});

  const [editingEvent, setEditingEvent] = useState<Partial<ZonaFormValues> | null>(null);
  const [metadata, setMetadata] = useState<PaginationInfo>({
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
  
  useMemo(() => {
    handleFilter({ filterValues: [] });
  }, [resultZonaEvento.data])

  useEffect(() => {
    setAvaible(selectedIds.size)
    if (selectedIds.size === 1) {
      editModule(setEditingEvent, false);
    } else {
      createModule(setEditingEvent, false);
    }
    setSelectedIds(selectedIds);
  }, [selectedIds]);


  return (
    <div className="gestion-zona">

      <div className="event-container">
        <ActionBtn
          module="Zona"
          avaible={avaible}
          create={false}
          edit={false}
          deleteBtn={true}
          show={false}
          deleteModule={deleteModule}
        />
        <Filter filtros={filtroPuerta} onSubmit={values => handleFilter({ values })} />

        {loading ? (
          <Loading />
        ) : (

          <Table
            th_element={th_elementPuerta}
            data={data}
            selectedIds={selectedIds}
            onSelectOne={handleSelectOne}
            onSelectAll={handleSelectAll}
            sortConfig={sortConfig}
            onSortChange={handleSortChange}
            setDatafilter={setDatafilter}
          />
        )}
        <FooterTable setDatafilter={setDatafilter} dataFilter={dataFilter} paginate={metadata} />
        <Modal isOpen={isModalOpen} onClose={() => { setModalOpen(false); setEditingEvent(null); setIsDelete(false); setIsDetail(false) }}>
          {alert &&(
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}

            />
          )}
          {isDelete &&
            <DeleteAlert module="elementos seleccionados"
              handlerDelete={handlerDelete}
              onClose={() => { setModalOpen(false); setIsDelete(false); setIsDetail(false) }} />}
        </Modal>
      </div>
      <div className="form-container-zona">
        <div className="zona-alert-cntainer">
          <PuertaForm
            initialValues={editingEvent || undefined}
            onSubmit={editingEvent ? handlerEdit : handlerCreate}
            onClose={() => { setModalOpen(false); setEditingEvent(null); }}
          />
          {alertZonaEvento && (
            <Alert
              type={alertZonaEvento.type}
              message={alertZonaEvento.message}
              onClose={() => setalertZonaEvento(null)}

            />
          )}
        </div>

      </div>
    </div>
  );
}

export default GestionPuerta;

