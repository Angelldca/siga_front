


import { useState, useEffect } from 'react';
import './personaForm.css';
import Alert from '../alert/alert';
import defaultIcon from '../../assets/default_profile.png';

export interface PersonaFormValues {
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
    estado: string;
    fotoPerfil?: string | null;
}

export interface PersonaFormProps {
    initialValues?:{
        persona:  Partial<PersonaFormValues>,
        foto:string,
        id:any
    };
    onSubmit: (values: PersonaFormValues) => void;
    alert:{ type: string, message: string }|null;
    setAlert: ( values:{ type: string, message: string }|null) => void;
}

const PersonaForm = ({ initialValues, onSubmit,alert,setAlert }: PersonaFormProps) => {
    const [values, setValues] = useState<PersonaFormValues>({
        area: '',
        rolinstitucional:  '',
        nombre:  '',
        solapin: '',
        carnetidentidad: '',
        provincia: '',
        municipio:'',
        sexo: '',
        residente: true,
        fechanacimiento:  '',
        idexpediente:  '',
        codigobarra: '',
        estado:  "ACTIVO",
        fotoPerfil: ""
    });

    useEffect(()=>{
  
        if (!initialValues?.persona) return;
        
        setValues(
            {
                area: initialValues?.persona.area || '',
                rolinstitucional: initialValues?.persona.rolinstitucional || '',
                nombre: initialValues?.persona.nombre || '',
                solapin: initialValues?.persona.solapin || '',
                carnetidentidad: initialValues?.persona.carnetidentidad || '',
                provincia: initialValues?.persona.provincia || '',
                municipio: initialValues?.persona.municipio || '',
                sexo: initialValues?.persona.sexo || '',
                residente: initialValues?.persona.residente ?? true,
                fechanacimiento: initialValues?.persona.fechanacimiento || '',
                idexpediente: initialValues?.persona.idexpediente || '',
                codigobarra: initialValues?.persona.codigobarra || '',
                estado: initialValues?.persona.estado || "ACTIVO",
                fotoPerfil: initialValues?.foto
            }
        )

        if(initialValues?.foto){
            setFotoUrl(`data:image/jpeg;base64,${initialValues?.foto}`)
        }
            
    },[initialValues])
    const [generarCodigo, setGenerarCodigo] = useState(false);
    const [fotoUrl, setFotoUrl] = useState<string | undefined>(defaultIcon);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setValues(prev => ({
                ...prev,
                [name]: name === 'estado' ? (checked ? 'ACTIVO' : 'INACTIVO') : checked
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
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64WithPrefix = reader.result as string;
                //const base64Data = base64WithPrefix.split(',')[1];
                setFotoUrl(base64WithPrefix); 
                setValues(prev => ({ ...prev, fotoPerfil: base64WithPrefix.split(',')[1] }));
            };
            reader.readAsDataURL(file);
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
            <h3>{initialValues?.persona ? 'Editar Persona' : 'Crear Persona'}</h3>

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
                    <input type="checkbox" name="estado" checked={values.estado === "ACTIVO"} onChange={handleChange} />
                    Activo
                </label>
            </div>

            <div className="acciones">
                <button type="submit" className='btn-primary'>Guardar</button>
                <button type="button" onClick={() => window.close()} className='btn-secondary'>Cancelar</button>
            </div>
             {alert && (
                          <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)
                            
                            }
                         
                          />
                        )}
        </form>
    );
};

export default PersonaForm;
