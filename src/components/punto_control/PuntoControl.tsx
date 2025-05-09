import { useEffect, useState } from "react";
import './PuntoControl.css'
import FooterTable from "../footer-table/foter-table";
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { DataFilter, PaginationInfo } from "../../utils/interfaces";
import Filter from "../filter/filter";
import { filtroPuntosControl } from "./putosControlPersonaField";
import { useFetch } from "../../hooks/useFetch";
import Alert from "../alert/alert";



export interface PuntoControl {
    id: string;
    nombre: string;
    zona: {
        id: any;
        nombre: string
    }
}

interface Props {
    puntosDisponibles: PuntoControl[];
    puntosAsignadosIniciales: any[]; // array de IDs
    onChange: (selectedIds: any[]) => void;
    handleFilter: (params: any) => void;
    setDatafilter: (dataFilter: any) => void;
    dataFilter: DataFilter;
    metadata: PaginationInfo;
    personaId:any
}

const PuntosControlSelector = ({
    puntosDisponibles, puntosAsignadosIniciales,
    onChange, handleFilter,
    setDatafilter, dataFilter, metadata,personaId
}: Props) => {
    const [seleccionados, setSeleccionados] = useState<any[]>(puntosAsignadosIniciales);
    const [alert, setAlert] = useState<{ type: string, message: string }|null>(null);
    const[id,setId] = useState(personaId);
  const { create, editFetch,getByIdFetch } = useFetch("/api/puerta-persona");


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
    useEffect(() => {
        if (!personaId) return;
        setId(personaId);
    }, [personaId]);

    const handlerCreatePersonaPuerta=()=>{
            editFetch(personaId,{
                personaId:personaId,
                puertaIds:seleccionados
            }).then((res) => {
                if (res.error) {
                    setAlert({
                        type: "error",
                        message: res.error.errorMessage || `Error al asignar los puntos de control`,
                      });
                } else{
                    setAlert({
                        type: "success",
                        message: `Puntos de control asignados correctamente`,
                      });
                  setTimeout(() => {
                    setAlert(null);
                    //handleFilter({filterValues: []});
                  }, 2000);
                }
              })
        
    }
    return (
        <div className="puntos-selector">
            <div className="puntos-control-action">
                <h3>Puntos de control</h3>
                {personaId &&  
                <button className="btn-primary" onClick={handlerCreatePersonaPuerta}>Asignar puntos de control</button>}
               
            </div>
            <Filter filtros={filtroPuntosControl} onSubmit={values => handleFilter({ values })} />

            <ul>
                {
                    !puntosDisponibles ? (
                        <li className="no-data">No hay puntos de control disponibles</li>
                    ) :

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

            <FooterTable setDatafilter={setDatafilter} dataFilter={dataFilter} paginate={metadata} />
                  {alert && (
                          <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)
                            
                            }
                         
                          />
                )}
        </div>
    );
};

export default PuntosControlSelector;