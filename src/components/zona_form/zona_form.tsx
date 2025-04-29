

import { useEffect, useState } from "react";
import "./ZonaForm.css"
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { useDataTable } from "../../hooks/useData";


export interface ZonaFormValues {
    id: string | null
    nombre: string;
    eventos: {
        id:string;
        nombre:string;
    }[];
}
interface PropsForm {
    initialValues?: Partial<ZonaFormValues>;
    onSubmit: (values: ZonaFormValues) => void;
    onClose?: () => void
}


const ZonaForm = ({
    initialValues = {},
    onSubmit,
    onClose, }: PropsForm) => {
    const { data,
            handleFilter,
            setData,
            result,error,loading } = useDataTable("/api/evento/search");
    const [nombre, setNombre] = useState(initialValues.nombre || "");
    const [eventos, setEventos] = useState(initialValues.eventos || []);
  


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id:null,
            nombre,
            eventos
        });
        //onClose?.();
    };
    useEffect(()=>{
        setNombre(initialValues.nombre || "")

    },[initialValues])

    useEffect(()=>{
       setEventos(result?.data || [])
    },[result])

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <h3>{initialValues.nombre ? "Editar Zona" : "Crear Zona"}</h3>
            <div className="form-group">
                <label htmlFor="event-name">Nombre de la zona</label>
                <input type="text" id="event-name" name="event-name" required
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="event-name">Eventos</label>
                <select multiple>
                   {eventos.length > 0 &&
                    eventos.map(e =>(
                        <option  key={e.id}>
                            {e.nombre}
                        </option>
                    ))
                   }
                </select>
            </div>
            <button type="submit" className="btn-primary">Guardar</button>
        </form>
    );
}


export default ZonaForm;