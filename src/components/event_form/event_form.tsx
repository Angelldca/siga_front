

import { useEffect, useState } from "react";
import "./EventForm.css";

export interface EventFormValues {
    nombre: string;
    type: "ALIMENTACION" | "GENERAL";
    fechaInicio: string; // "YYYY-MM-DD"
    fechaFin: string; // "YYYY-MM-DD"
    horaInicio: string; // "HH:MM:SS"
    horaFin: string; // "HH:MM:SS"
    activo: boolean;
    ilimitado: boolean;
}


interface PropsForm {
    initialValues?: Partial<EventFormValues>;
    onSubmit: (values: EventFormValues) => void;
    onClose?: () => void
}


const EventForm = ({
    initialValues = {},
    onSubmit,
    onClose, }: PropsForm) => {

    const [nombre, setNombre] = useState(initialValues.nombre || "");
    const [type, setTipoEvento] = useState<EventFormValues["type"]>(initialValues.type || "ALIMENTACION");
    const [fechaInicio, setFechaInicio] = useState(initialValues.fechaInicio || "");
    const [fechaFin, setFechaFin] = useState(initialValues.fechaFin || "");
    const [horaInicio, setHoraInicio] = useState(initialValues.horaInicio || "");
    const [horaFin, setHoraFin] = useState(initialValues.horaFin || "");
    const [activo, setActivo] = useState(initialValues.activo ?? true);
    const [ilimitado, setIlimitado] = useState(initialValues.ilimitado ?? false);

    /*
    useEffect(() => {
        if (initialValues.nombre) setNombre(initialValues.nombre);
        if (initialValues.fechaInicio) setFechaInicio(initialValues.fechaInicio);
        if (initialValues.fechaFin) setFechaFin(initialValues.fechaFin);
        if (initialValues.horaInicio) setHoraInicio(initialValues.horaInicio);
        if (initialValues.horaFin) setHoraFin(initialValues.horaFin);
        setActivo(initialValues.activo ?? true);
        setIlimitado(initialValues.ilimitado ?? false);
    }, [initialValues]);
    
    */

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            nombre,
            type,
            fechaInicio,
            fechaFin,
            horaInicio: `${horaInicio}:00`,
            horaFin: `${horaFin}:00`,
            activo,
            ilimitado,
        });
        onClose?.();
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <h3>{initialValues.nombre ? "Editar Evento" : "Crear Evento"}</h3>
            <div className="form-group">
                <label htmlFor="event-name">Nombre del Evento</label>
                <input type="text" id="event-name" name="event-name" required
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="event-type">Tipo de Evento</label>
                <div className="radio-group">
                    <div className="radio-option">
                        <input type="radio" id="event-type-active"
                            name="event-type" required value="ALIMENTACION"
                            checked={type === "ALIMENTACION"}
                            onChange={() => setTipoEvento("ALIMENTACION")}
                        />
                        <label htmlFor="event-type-active">Alimentación</label>
                    </div>
                    <div className="radio-option">
                        <input type="radio" id="event-type-inactive"
                            name="event-type" value="GENERAL"
                            checked={type === "GENERAL"}
                            onChange={() => setTipoEvento("GENERAL")}
                        />
                        <label htmlFor="event-type-inactive">General</label>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="fecha-inicio">Fecha Inicio</label>
                    <input
                        type="date"
                        id="fecha-inicio"
                        value={fechaInicio}
                        onChange={e => setFechaInicio(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha-fin">Fecha Fin</label>
                    <input
                        type="date"
                        id="fecha-fin"
                        value={fechaFin}
                        onChange={e => setFechaFin(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="hora-inicio">Hora Inicio</label>
                    <input
                        type="time"
                        id="hora-inicio"
                        value={horaInicio}
                        onChange={e => setHoraInicio(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hora-fin">Hora Fin</label>
                    <input
                        type="time"
                        id="hora-fin"
                        value={horaFin}
                        onChange={e => setHoraFin(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="radio-option">
                    <input type="checkbox" id="ilimitado" name="ilimitado"
                        checked={ilimitado}
                        onChange={e => setIlimitado(e.target.checked)}
                    />
                    <label htmlFor="ilimitado">Ilimitado</label>

                    <input type="checkbox" id="activo" name="activo"
                        checked={activo}
                        onChange={e => setActivo(e.target.checked)}
                    />
                    <label htmlFor="activo">Activo</label>

                </div>
            </div>
            <button type="submit" className="btn-primary">Guardar</button>
        </form>
    );
}


export default EventForm;