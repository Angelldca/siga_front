import { useEffect, useState } from "react";
import './PuntoControl.css'
import FooterTable from "../footer-table/foter-table";
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { DataFilter, PaginationInfo } from "../../utils/interfaces";
import Filter from "../filter/filter";
import { filtroPuntosControl } from "./putosControlPersonaField";



export interface PuntoControl {
    id: string;
    nombre: string;
    zona:{
        id:any;
        nombre: string
    }
}

interface Props {
    puntosDisponibles: PuntoControl[];
    puntosAsignadosIniciales: any[]; // array de IDs
    onChange: (selectedIds: any[]) => void;
    handleFilter:(params:any)=>void;
    setDatafilter: (dataFilter: any) => void;
    dataFilter:DataFilter;
    metadata: PaginationInfo;
}

const PuntosControlSelector = ({ 
    puntosDisponibles, puntosAsignadosIniciales,
     onChange,handleFilter,
     setDatafilter, dataFilter,metadata
    }: Props) => {
    const [seleccionados, setSeleccionados] = useState<any[]>(puntosAsignadosIniciales);
 


    const toggleSeleccion = (id: string) => {
        const nuevaSeleccion = seleccionados.includes(id)
            ? seleccionados.filter(sid => sid !== id)
            : [...seleccionados, id];
        setSeleccionados(nuevaSeleccion);
        onChange(nuevaSeleccion);
    };
    useEffect(() => {
        setSeleccionados(puntosAsignadosIniciales);
    }, [puntosAsignadosIniciales]);
    useEffect(() => {
        if (!puntosDisponibles) return;
        
    }, [puntosDisponibles]);
    return (
        <div className="puntos-selector">
            <h3>Puntos de control</h3>
            <Filter filtros={filtroPuntosControl} onSubmit={values => handleFilter({ values })} />

            <ul>
                {
                    !puntosDisponibles ? (
                        <li className="no-data">No hay puntos de control disponibles</li>
                    ):
                
                    puntosDisponibles.map(punto => (
                    <li key={punto.id}>
                        <label className="punto-control-label">
                            <input
                                type="checkbox"
                                checked={seleccionados.includes(punto.id)}
                                onChange={() => toggleSeleccion(punto.id)}
                            />
                            <>
                            <p>{punto.nombre}</p>
                            <p>Zona: {punto.zona.nombre}</p>
                            </>
                        </label>
                    </li>
                ))}
            </ul>

            <FooterTable setDatafilter={setDatafilter} dataFilter={dataFilter} paginate={metadata}/>
        </div>
    );
};

export default PuntosControlSelector;