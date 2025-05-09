

import { useEffect, useState } from "react";
import './PlatoForm.css'

import { useDataTable } from "../../hooks/useData";
import Select from "react-select";
import { useAuth } from "../../context/AuthContext";




type OptionType = {
    value: string;
    label: string;
};


export interface PlatoFormValues {
    id: string | null
    nombre: string;
    precio: string;
    medida: string;
    disponible: boolean;
    empresaId?: string | null;
}
interface PropsForm {
    initialValues?: Partial<PlatoFormValues>;
    onSubmit: (values: any) => void;
    onClose?: () => void
}

const PlatoForm = ({
    initialValues = {},
    onSubmit,
    onClose,
}: PropsForm) => {
    const [nombre, setNombre] = useState(initialValues.nombre || "");
    const [precio, setPrecio] = useState(initialValues.precio || "");
    const [disponible, setDisponible] = useState(false);
    const [medida, setMedida] = useState(initialValues.medida || "");
    const {user} = useAuth();
 
 

    useEffect(() => {
        if (initialValues != undefined) {
            setNombre(initialValues.nombre || "");
            setPrecio(initialValues.precio|| "");
            setMedida(initialValues.medida|| "");
            setDisponible(initialValues.disponible||true);
        }else{
            setNombre("");
        }
    }, [initialValues.nombre]);

 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: initialValues.id || null,
            nombre,
            precio,
            medida,
            disponible
        });
    };

    return (
        <form className="zona-form" onSubmit={handleSubmit}>
            <h3>{initialValues.nombre ? "Editar Plato" : "Crear Plato"}</h3>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={nombre}
                    onChange={(e) => {setNombre(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                    type="text"
                    id="precio"
                    name="precio"
                    required
                    value={precio}
                    onChange={(e) => {setPrecio(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="medida">Medida</label>
                <input
                    type="text"
                    id="medida"
                    name="medida"
                    required
                    value={medida}
                    onChange={(e) => {setMedida(e.target.value)}}
                />
            </div>
            <div className="form-group form-froup-last-child">
                <input
                    type="checkbox" 
                    name="disponible" 
                    checked={disponible} 
                    onChange={(e) => 
                    {setDisponible(e.target.checked)}} 
                    />
                 <label>Disponible</label>
            </div>
            <button type="submit" className="btn-primary">Guardar</button>
        </form>
    );
};

export default PlatoForm;