import { useState } from "react";
import './PuntoControl.css'
import FooterTable from "../footer-table/foter-table";
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { PaginationInfo } from "../../utils/interfaces";
import Filter from "../filter/filter";
import { filtroPuerta } from "../../pages/puertas/puertaField";


interface PuntoControl {
    id: string;
    nombre: string;
}

interface Props {
    puntosDisponibles: PuntoControl[];
    puntosAsignadosIniciales: string[]; // array de IDs
    onChange: (selectedIds: string[]) => void;
}

const PuntosControlSelector = ({ puntosDisponibles, puntosAsignadosIniciales, onChange }: Props) => {
    const [seleccionados, setSeleccionados] = useState<string[]>(puntosAsignadosIniciales);
 const {  result, loading,setAvaible,avaible,selectedIds,
    handleSortChange,handlerCreate,handlerEdit,handlerDelete,editModule,
  deleteModule,handleSelectOne,handleSelectAll,sortConfig,setDatafilter,isModalOpen,alert,
  setAlert,isDelete,setModalOpen,setIsDelete,handleFilter,data,setData,dataFilter,createModule,
  isDetail, setIsDetail,showDetail} = useModuleCrud({
    url:"/api/persona", module:"Ciudadano",byBusiness:true, byDelete:true});
  const [metadata, setMetadata] = useState<PaginationInfo >({
    totalPages: 0,
    totalElementsPage: 0,
    totalElements: 0,
    size: 0,
    page: 0,
  });


    const toggleSeleccion = (id: string) => {
        const nuevaSeleccion = seleccionados.includes(id)
            ? seleccionados.filter(sid => sid !== id)
            : [...seleccionados, id];
        setSeleccionados(nuevaSeleccion);
        onChange(nuevaSeleccion);
    };

    return (
        <div className="puntos-selector">
            <h3>Puntos de control</h3>
            <Filter filtros={filtroPuerta} onSubmit={values => handleFilter({ values })} />

            <ul>
                {puntosDisponibles.map(punto => (
                    <li key={punto.id}>
                        <label className="punto-control-label">
                            <input
                                type="checkbox"
                                checked={seleccionados.includes(punto.id)}
                                onChange={() => toggleSeleccion(punto.id)}
                            />
                            <p>{punto.nombre}</p>
                        </label>
                    </li>
                ))}
            </ul>

            <FooterTable setDatafilter={setDatafilter} dataFilter={dataFilter} paginate={metadata}/>
        </div>
    );
};

export default PuntosControlSelector;