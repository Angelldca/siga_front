

import { useEffect, useState } from "react";
import "./MenuForm.css"
import { useDataTable } from "../../hooks/useData";
import Select from "react-select";
import { MultiValue } from "react-select";

type OptionType = {
    value: string;
    label: string;
};


export interface MenuFormValues {
    id: string | null
    empresaId?: string | null;
    menu?:{
        id:string
    };
    evento: any;
    eventoId: string;
    platosId: string[];
    disponible: boolean;
}
interface PropsForm {
    initialValues?: Partial<MenuFormValues>;
    onSubmit: (values: MenuFormValues) => void;
    onClose?: () => void
}

const MenuForm = ({
    initialValues = {},
    onSubmit,
    onClose,
}: PropsForm) => {
    const {result,handleFilter } = useDataTable({url:"/api/evento/search",byBusiness:true,byDelete:true,list:false, pageSize:100000});
    const {result:resultPlatos } = useDataTable({url:"/api/plato/search",byBusiness:true,byDelete:true, pageSize:100000});
    const { handleFilter: handleFilterMenuEvento, result: resultMenuEvento } = useDataTable({url:"/api/menu-evento/search",byBusiness:false});


    const [eventosDisponibles, setEventosDisponibles] = useState<OptionType[]>([]);
    const [eventosSeleccionados, setEventosSeleccionados] = useState<OptionType | null>(null);
    const [platosDisponibles, setPlatosDisponibles] = useState<OptionType[]>([]);
    const [platosSeleccionados, setPlatosSeleccionados] = useState<OptionType[]>([]);
    // Cargar eventos disponibles

    useEffect(()=>{
        handleFilter({
            filterValues: [
                { key: "type", operator: "LIKE", value: "ALIMENTACION", logicalOperation: "AND" },
            ],
            paginatedFilter: {
                query: "",
                pageSize: 100000,
                page: 0,
                sortBy: "createdAt",
                sortType: "DES"
            },
        });
    },[])
    useEffect(() => {
       
        if (result?.data) {
            const mappedOptions = result.data.map((e: any) => ({
                value: e.id.toString(),
                label: e.nombre,
            }));
            setEventosDisponibles(mappedOptions);
        }
    }, [result]);
    //cargar platos disponibles
    useEffect(() => {
        if (resultPlatos?.data) {
            const mappedOptions = resultPlatos.data.map((e: any) => ({
                value: e.id.toString(),
                label: e.nombre,
            }));
            setPlatosDisponibles(mappedOptions);
        }
    }, [resultPlatos]);



    // Si es edición, cargar eventos asociados
    useEffect(() => {
        if (initialValues.id) {
            handleFilterMenuEvento({
                filterValues: [
                    { key: "id", operator: "LIKE", value: initialValues.id, logicalOperation: "AND" },
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
            setEventosSeleccionados(null);  // limpiar si es crear
            setPlatosSeleccionados([]);
        }
    }, [initialValues.id]);

    // Cuando llegan los datos de menu-evento, extraer los IDs y convertir a {value, label}
    useEffect(() => {
        if (initialValues.id && resultMenuEvento?.data && eventosDisponibles.length > 0) {
          setEventosSeleccionados({
            value: initialValues.evento?.id.toString(),
            label: initialValues.evento?.nombre,
          });
      
          const platosIds = resultMenuEvento.data.flatMap((item: any) =>
            (item.menu?.platos || []).map((plato: any) => plato.id.toString())
          );
          const matchedOptionsPlatos = platosDisponibles.filter(opt =>
            platosIds.includes(opt.value)
          );
          setPlatosSeleccionados(matchedOptionsPlatos);
        }
      }, [initialValues.id, resultMenuEvento, eventosDisponibles,platosDisponibles]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
            const platosFinales = platosDisponibles
            .filter(e => platosSeleccionados.map(s => s.value).includes(e.value))
            .map(e => ({
                id: e.value,
                nombre: e.label,
            }));
            if (!eventosSeleccionados) return;
        onSubmit({
            id: initialValues.menu?.id || null,
            eventoId: eventosSeleccionados.value,
            platosId: platosFinales.map(e => e.id),
            disponible:true,
            evento:null
        });
    };

    return (
        <form className="menu-form" onSubmit={handleSubmit}>
            <h3>{initialValues.id ? "Editar Menu" : "Crear Menu"}</h3>
            <div className="form-group">
                <label htmlFor="eventos">Eventos</label>
                <Select
                    classNamePrefix="react-select"
                    id="eventos"
                    options={eventosDisponibles}
                    value={eventosSeleccionados}
                    onChange={(selected) => {
                        setEventosSeleccionados(selected);
                    }}
                    placeholder="Selecciona eventos..."
                    noOptionsMessage={() => "No hay eventos disponibles"}
                />
            </div>
            <div className="form-group">
                <label htmlFor="platos">Platos</label>
                <Select
                    classNamePrefix="react-select"
                    isMulti
                    id="platos"
                    options={platosDisponibles}
                    value={platosSeleccionados}
                    onChange={(selected: MultiValue<OptionType>) => {
                        setPlatosSeleccionados(selected as OptionType[]);
                    }}
                    placeholder="Selecciona platos..."
                    noOptionsMessage={() => "No hay platos disponibles"}
                />
            </div>
            <button type="submit" className="btn-primary">Guardar</button>
        </form>
    );
};

export default MenuForm;