import { useState } from "react";
import { DataRow, SortConfig } from "../utils/interfaces";
import { useCheck } from "./useCheck";
import { EventFormValues } from "../components/event_form/event_form";
import { useDataTable } from "./useData";
import { handleSortChangeUtils } from "../utils/sortChange";
import { useFetch } from "./useFetch";

interface UseDataParams {
  url: string;
  module: string;
  byBusiness?: boolean;
  byDelete?: boolean;
  keySearchBusiness?: string;
  pageSize?: number;
  list?: boolean;
}


export function useModuleCrud({
  url,
  module,
  byBusiness = true,
  byDelete = false,
  keySearchBusiness = "",
  pageSize = 10,
  list= true,
}: UseDataParams) {
  
const { result, loading, handleFilter, 
  data: dataFilter, setData: setDatafilter } = useDataTable({
    url:url+"/search",
    byBusiness:byBusiness,byDelete:byDelete,keySearchBusiness:keySearchBusiness,
    pageSize:pageSize,
    list:list});
 const {loading: loadingFetch, create, editFetch,deletListFetch,getByIdFetch, user,result: resultFetch } = useFetch(url||"/api/evento");
     const [data, setData] = useState<DataRow[]>([]);
      const [avaible, setAvaible] = useState<number>(0);
      const { selectedIds,setSelectedIds, handleSelectOne, handleSelectAll } = useCheck(data);
    
      const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });
      const [isModalOpen, setModalOpen] = useState(false);
      const [alert, setAlert] = useState<{ type: string, message: string }|null>(null);
      const [isDelete, setIsDelete] = useState(false);
      const [isDetail, setIsDetail] = useState(false);


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
      if (!idToEdit) return;
      setModalOpen(true);
      editFetch(idToEdit,value).then((res) => {
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
        console.log("Mostrando el alert de exito")
        setAlert({
          type: "success",
          message: `${module}(s) eliminado(s) correctamente`,
        });
        setTimeout(() => {
          setModalOpen(false);
          setIsDelete(false);
          setAlert(null);
          handleFilter({filterValues: []});
          setSelectedIds(new Set());
        }, 2000);
  
      }
    })
  }

 const editModule=(setEditingEvent:({})=>void, openModal: boolean)=> {
    setModalOpen(openModal)
    if(selectedIds.size !== 1){
      setEditingEvent({})
      return;
    }
    const idToEdit = Array.from(selectedIds)[0];
    const evt = data.find(d => d.id === idToEdit);
    if (!evt) {
      setEditingEvent({})
      return;
    }
    setEditingEvent(evt);
  }
  const deleteModule=()=>{
    setIsDelete(true);
    setModalOpen(true);
   }
   function showDetail (setDetailModule:({})=>void){
    if (selectedIds.size !== 1) {
      setAlert({ type: "error", message: `Selecciona un ${module.toLowerCase()}  para ver los detalles.` });
      return null;
    }
    const idToGet = Array.from(selectedIds)[0];
   
    getByIdFetch(idToGet).then((res) => {
      if (res.error) {
        setAlert({
          type: "error",
          message: res.error.errorMessage || `Error al ver los detalles del/de la ${module.toLowerCase()}(s)`,
        });
        
      }
      setDetailModule(res)
    }).catch((err)=>{
      setAlert({
        type: "error",
        message: `Error inesperado al ver los detalles del/de la ${module.toLowerCase()}(s)`,
      });
    }).finally(()=>{
      setIsDetail(true)
      setModalOpen(true)

    })
  }
 
  const createModule=(setEditingEvent:(param:{} | null)=>void, isModalOpen=true)=> {
    setEditingEvent(null);
    setModalOpen(isModalOpen);
  }

    return {
        result, loading,setAvaible,avaible,setSelectedIds,selectedIds,
        handleSortChange,handlerCreate,handlerEdit,handlerDelete,showDetail,editModule,
        deleteModule,isDetail, setIsDetail,handleSelectOne,handleSelectAll,sortConfig,setDatafilter,isModalOpen,alert,
        setAlert,isDelete,setModalOpen,setIsDelete,dataFilter,handleFilter,data,setData,createModule,resultFetch,loadingFetch
    };
}