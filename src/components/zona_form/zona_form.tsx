

import { useEffect, useState } from "react";
import "./ZonaForm.css"
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { useDataTable } from "../../hooks/useData";
import Select from "react-select";
import { MultiValue } from "react-select";

type OptionType = {
    value: string;
    label: string;
};


export interface ZonaFormValues {
    id: string | null
    nombre: string;
    eventos: {
        id: string;
        nombre: string;
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
    onClose,
}: PropsForm) => {
    const {result } = useDataTable("/api/evento/search");
    const { handleFilter: handleFilterZonaEvento, result: resultZonaEvento } = useDataTable("/api/zona-evento/search",false);

    const [nombre, setNombre] = useState(initialValues.nombre || "");
    const [eventosDisponibles, setEventosDisponibles] = useState<OptionType[]>([]);
    const [eventosSeleccionados, setEventosSeleccionados] = useState<OptionType[]>([]);
    // Cargar eventos disponibles
    useEffect(() => {
        if (result?.data) {
            const mappedOptions = result.data.map((e: any) => ({
                value: e.id.toString(),
                label: e.nombre,
            }));
            setEventosDisponibles(mappedOptions);
        }
    }, [result]);

    // Cargar nombre si cambian los initialValues
    useEffect(() => {
        setNombre(initialValues.nombre || "");
    }, [initialValues]);

    // Si es edición, cargar eventos asociados
    useEffect(() => {
        if (initialValues.id) {
            handleFilterZonaEvento({
                filterValues: [
                    { key: "zona.id", operator: "LIKE", value: initialValues.id, logicalOperation: "AND" },
                ],
                paginatedFilter: {
                    query: "",
                    pageSize: 100000,
                    page: 0,
                    sortBy: "createdAt",
                    sortType: "DES"
                },
            });
        } else {
            setEventosSeleccionados([]);  // limpiar si es crear
        }
    }, [initialValues.id]);

    // Cuando llegan los datos de zona-evento, extraer los IDs y convertir a {value, label}
    useEffect(() => {
        if (initialValues.id && resultZonaEvento?.data && eventosDisponibles.length > 0) {
            const ids = resultZonaEvento.data.map((item: any) => item.evento.id.toString());
            const matchedOptions = eventosDisponibles.filter(opt => ids.includes(opt.value));
            setEventosSeleccionados(matchedOptions);
        }
    }, [initialValues.id, resultZonaEvento, eventosDisponibles]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventosFinales = eventosDisponibles
            .filter(e => eventosSeleccionados.map(s => s.value).includes(e.value))
            .map(e => ({
                id: e.value,
                nombre: e.label,
            }));

        onSubmit({
            id: initialValues.id || null,
            nombre,
            eventos: eventosFinales,
        });
    };

    return (
        <form className="zona-form" onSubmit={handleSubmit}>
            <h3>{initialValues.nombre ? "Editar Zona" : "Crear Zona"}</h3>
            <div className="form-group">
                <label htmlFor="event-name">Nombre de la zona</label>
                <input
                    type="text"
                    id="event-name"
                    name="event-name"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="eventos">Eventos</label>
                <Select
                    classNamePrefix="react-select"
                    isMulti
                    id="eventos"
                    options={eventosDisponibles}
                    value={eventosSeleccionados}
                    onChange={(selected: MultiValue<OptionType>) => {
                        setEventosSeleccionados(selected as OptionType[]);
                    }}
                    placeholder="Selecciona eventos..."
                    noOptionsMessage={() => "No hay eventos disponibles"}
                />
            </div>
            <button type="submit" className="btn-primary">Guardar</button>
        </form>
    );
};

export default ZonaForm;