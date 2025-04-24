import { useState } from "react";
import { DataRow, SortConfig } from "../utils/interfaces";
import { useCheck } from "./useCheck";
import { EventFormValues } from "../components/event_form/event_form";
import { useDataTable } from "./useData";
import { handleSortChangeUtils } from "../utils/sortChange";
import { useFetch } from "./useFetch";




export function useModuleCrud(url: string, module:string) {
const { result, loading, handleFilter, data: dataFilter, setData: setDatafilter } = useDataTable(url+"/search"||"/api/evento/search");
 const { create, editFetch,deletListFetch, user } = useFetch(url||"/api/evento");
     const [data, setData] = useState<DataRow[]>([]);
      const [avaible, setAvaible] = useState<number>(0);
      const { selectedIds,setSelectedIds, handleSelectOne, handleSelectAll } = useCheck(data);
    
      const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });
      const [isModalOpen, setModalOpen] = useState(false);
      const [alert, setAlert] = useState<{ type: string, message: string }|null>(null);
      const [isDelete, setIsDelete] = useState(false);


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
            message: res.error.errorMessage || `Error al crear el ${module.toLowerCase()}`,
          });
        } else {
          setAlert({
            type: "success",
            message: `${module} creado correctamente`,
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
        setAlert({ type: "error", message: `Selecciona un solo ${module.toLowerCase()} para editar.` });
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
            message: res.error.errorMessage || `Error al crear el ${module.toLowerCase()} `,
          });
        } else {
          setAlert({
            type: "success",
            message: `${module}  editado correctamente`,
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
  
    if (selectedIds.size === 0) {
      setAlert({ type: "error", message: `Selecciona al menos un ${module.toLowerCase()}  para eliminar.` });
      return;
    }
    const idsToDelete = Array.from(selectedIds);
  
    deletListFetch(idsToDelete).then((res) => {
      if (res.error) {
        setAlert({
          type: "error",
          message: res.error.errorMessage || `Error al eliminar el/los ${module.toLowerCase()}(s)`,
        });
      } else {
        setAlert({
          type: "success",
          message: `${module}(s) eliminado(s) correctamente`,
        });
        setTimeout(() => {
          setModalOpen(false);
          setIsDelete(false);
          setAlert(null);
          handleFilter({filterValues: []});
        }, 2000);
        setSelectedIds(new Set());
  
      }
    })
  }
  const showDetail = ()=>{
    console.log("Detail: ", avaible)
  }
 const editModule=(setEditingEvent:({})=>void)=> {
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
  }
  const deleteModule=()=>{
    setIsDelete(true);
    setModalOpen(true);
   }
  const createModule=(setEditingEvent:(param:{} | null)=>void)=> {
    setEditingEvent(null);
    setModalOpen(true)
  }

    return {
        result, loading,setAvaible,avaible,setSelectedIds,selectedIds,
        handleSortChange,handlerCreate,handlerEdit,handlerDelete,showDetail,editModule,
        deleteModule,handleSelectOne,handleSelectAll,sortConfig,setDatafilter,isModalOpen,alert,
        setAlert,isDelete,setModalOpen,setIsDelete,dataFilter,handleFilter,data,setData,createModule
    };
}