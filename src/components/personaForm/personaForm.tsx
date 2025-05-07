


import { useState, useEffect } from 'react';
import './personaForm.css';

interface PersonaFormValues {
    area: string;
    rolinstitucional: string;
    nombre: string;
    solapin: string;
    carnetidentidad: string;
    provincia: string;
    municipio: string;
    sexo: string;
    residente: boolean;
    fechanacimiento: string;
    idexpediente: string;
    codigobarra: string;
    estado: boolean;
    empresaId: string;
    fotoPerfil?: File | null;
}

interface PersonaFormProps {
    initialValues?: Partial<PersonaFormValues>;
    onSubmit: (values: PersonaFormValues) => void;
    empresaId: string;
}

const PersonaForm = ({ initialValues = {}, onSubmit, empresaId }: PersonaFormProps) => {
    const [values, setValues] = useState<PersonaFormValues>({
        area: initialValues.area || '',
        rolinstitucional: initialValues.rolinstitucional || '',
        nombre: initialValues.nombre || '',
        solapin: initialValues.solapin || '',
        carnetidentidad: initialValues.carnetidentidad || '',
        provincia: initialValues.provincia || '',
        municipio: initialValues.municipio || '',
        sexo: initialValues.sexo || '',
        residente: initialValues.residente ?? true,
        fechanacimiento: initialValues.fechanacimiento || '',
        idexpediente: initialValues.idexpediente || '',
        codigobarra: initialValues.codigobarra || '',
        estado: initialValues.estado || true,
        empresaId: empresaId,
        fotoPerfil: null
    });

    const [generarCodigo, setGenerarCodigo] = useState(false);
    const [fotoUrl, setFotoUrl] = useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setValues(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setValues(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValues(prev => ({ ...prev, fotoPerfil: file }));
            setFotoUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalValues = {
            ...values,
            codigobarra: generarCodigo ? generarCodigoBarras() : values.codigobarra
        };
        onSubmit(finalValues);
    };

    const generarCodigoBarras = () => {
        return 'CB' + Math.floor(Math.random() * 1000000);
    };

    return (
        <form className="persona-form" onSubmit={handleSubmit}>
            <h3>{initialValues.nombre ? 'Editar Persona' : 'Crear Persona'}</h3>

            <div className="foto-perfil">
                <img src={fotoUrl || '/default-profile.png'} alt="Foto perfil" className="foto-preview" />
                <label htmlFor="foto" className="upload-btn">
                    Subir imagen
                </label>
                <input
                    type="file"
                    id="foto"
                    accept="image/*"
                    onChange={handleFotoChange}
                    className="input-file-hidden"
                />
            </div>

            <div className="form-grid">
                <div>
                    <label>Nombre completo</label>
                    <input type="text" name="nombre" value={values.nombre} onChange={handleChange} required />
                </div>

                <div>
                    <label>Documento (DNI)</label>
                    <input type="text" name="carnetidentidad" value={values.carnetidentidad} onChange={handleChange} required />
                </div>

                <div>
                    <label>Área</label>
                    <input type="text" name="area" value={values.area} onChange={handleChange} />
                </div>

                <div>
                    <label>Rol Institucional</label>
                    <input type="text" name="rolinstitucional" value={values.rolinstitucional} onChange={handleChange} />
                </div>

                <div>
                    <label>Solapín</label>
                    <input type="text" name="solapin" value={values.solapin} onChange={handleChange} />
                </div>

                <div>
                    <label>Provincia</label>
                    <input type="text" name="provincia" value={values.provincia} onChange={handleChange} />
                </div>

                <div>
                    <label>Municipio</label>
                    <input type="text" name="municipio" value={values.municipio} onChange={handleChange} />
                </div>
                <div>
                    <label>Expediente</label>
                    <input type="text" name="idexpediente" value={values.idexpediente} onChange={handleChange} />
                </div>

                <div>
                    <label>Sexo</label>
                    <select name="sexo" value={values.sexo} onChange={handleChange}>
                        <option value="">Selecciona</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div>
                    <label>Fecha de nacimiento</label>
                    <input type="date" name="fechanacimiento" value={values.fechanacimiento.split('T')[0]} onChange={handleChange} />
                </div>

                <div>
                    <label>Código de barras</label>
                    <input type="text" name="codigobarra" value={values.codigobarra} onChange={handleChange} disabled={generarCodigo} />
                </div>
            </div>
            <div className="checkboxes-final">
                <label>
                    <input type="checkbox" checked={generarCodigo} onChange={() => setGenerarCodigo(!generarCodigo)} />
                    Generar automáticamente el código de barras
                </label>

                <label>
                    <input type="checkbox" name="residente" checked={values.residente} onChange={handleChange} />
                    Residente
                </label>

                <label>
                    <input type="checkbox" name="estado" checked={values.estado === true} onChange={handleChange} />
                    Activo
                </label>
            </div>

            <div className="acciones">
                <button type="submit" className='btn-primary'>Guardar</button>
                <button type="button" onClick={() => window.close()} className='btn-secondary'>Cancelar</button>
            </div>
        </form>
    );
};

export default PersonaForm;
