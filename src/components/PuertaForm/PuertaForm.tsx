

import { useEffect, useState } from "react";
import "./PuertaForm.css"
import { useDataTable } from "../../hooks/useData";
import Select from "react-select";
import { useAuth } from "../../context/AuthContext";

type OptionType = {
    value: string;
    label: string;
};


export interface PuertaFormValues {
    id: string | null
    nombre: string;
    empresaId?: string | null;
    zona: any;
}
interface PropsForm {
    initialValues?: Partial<PuertaFormValues>;
    onSubmit: (values: any) => void;
    onClose?: () => void
}

const PuertaForm = ({
    initialValues = {},
    onSubmit,
    onClose,
}: PropsForm) => {
    const {result } = useDataTable("/api/zona/search",true,true,"", 100000);
    const [nombre, setNombre] = useState(initialValues.nombre || "");
    const [zonasDisponibles, setZonasDisponibles] = useState<OptionType[]>([]);
    const [zonaSeleccionada, setZonaSeleccionada] = useState<OptionType | null>(null);
    const {user} = useAuth();
 
    useEffect(() => {
        if (result?.data) {
            const mappedOptions = result.data.map((e: any) => ({
                value: e.id.toString(),
                label: e.nombre,
            }));
            setZonasDisponibles(mappedOptions);
        }
    }, [result]);

    // Cargar nombre si cambian los initialValues
    useEffect(() => {
        if (initialValues.nombre) {
            setNombre(initialValues.nombre);
        }else{
            setNombre("");
        }
    }, [initialValues.nombre]);

    useEffect(() => {
        if (initialValues.id) {
           setZonaSeleccionada({
                value: initialValues.zona.id.toString(),
                label: initialValues.zona.nombre,
            });
        } else {
            setZonaSeleccionada(null);  // limpiar si es crear
        }
    }, [initialValues.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!zonasDisponibles) return;
        onSubmit({
            id: initialValues.id || null,
            nombre,
            zonaId: zonaSeleccionada?.value,
        });
    };

    return (
        <form className="zona-form" onSubmit={handleSubmit}>
            <h3>{initialValues.nombre ? "Editar Punto de Control" : "Crear Punto de Control"}</h3>
            <div className="form-group">
                <label htmlFor="event-name">Nombre del Punto de control</label>
                <input
                    type="text"
                    id="event-name"
                    name="event-name"
                    required
                    value={nombre}
                    onChange={(e) => {setNombre(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="eventos">Zonas</label>
                <Select
                    classNamePrefix="react-select"
                    id="eventos"
                    options={zonasDisponibles || undefined}
                    value={zonaSeleccionada}
                    onChange={(selected) => {
                        setZonaSeleccionada(selected);
                    }}
                    placeholder="Selecciona eventos..."
                    noOptionsMessage={() => "No hay zonas disponibles"}
                />
            </div>
            <button type="submit" className="btn-primary">Guardar</button>
        </form>
    );
};

export default PuertaForm;