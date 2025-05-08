import { useEffect, useState } from "react";
import PersonaForm, { PersonaFormProps } from "../personaForm/personaForm";
import PuntosControlSelector, { PuntoControl } from "../punto_control/PuntoControl";
import './CiudadanosAction.css';
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const CiudadanosAction = () => {
    const empresaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";


    const {  result, loading,handleFilter,dataFilter,setDatafilter} = useModuleCrud({url:"/api/puerta", module:"Puerta", 
    byBusiness:true, byDelete:true,keySearchBusiness:"zona.empresa.id", list:true});

    const {loading:loadingPuertaPersona,result:resultPuertaPersona,
        handleFilter:handleFilterPuertaPersona} = useModuleCrud({url:"/api/puerta-persona", module:"Puerta-Persona", 
         byBusiness:false,list:false});

    const {alert,setAlert} = useModuleCrud({url:"/api/persona", module:"Persona", 
             byBusiness:false,list:false});

    const {loading: loadingFetch, create, editFetch,deletListFetch,getByIdFetch, user,result: resultFetch } = useFetch("/api/imagen-facial");

    const [searchParams] = useSearchParams();
      const [listControl, setListControl] = useState<PuntoControl[]>([]);
      const [selectedPuntos, setSelectedPuntos] = useState<any[]>([]);
      const [personaId,setPersonaId] = useState<string|null>(searchParams.get('id'));
      const [initialValues, setInitialValues] = useState<{
        persona:  Partial<PersonaFormProps>,
        foto:Blob,
        id:any
    }|undefined>(undefined);

      useEffect(() => {
        if(loading) return;
          setListControl(result.data);
      },[result.data])

      useEffect(() => {
          if(personaId){
            handleFilterPuertaPersona({
                filterValues:[{
                    key: "persona.id",
                    operator: "LIKE",
                    value: personaId,
                    logicalOperation: "AND"
                }],
                paginatedFilter:{
                    query: "",
                    pageSize: 100000,
                    page: 0,
                    sortBy: "createdAt",
                    sortType: "DES",
                }})

                getByIdFetch(personaId).then((res) => {
                    if (res.error) {
                      setAlert({
                        type: "error",
                        message: res.error.errorMessage || `Error al cargar los datos de la persona`,
                      });
                      
                    }
                    console.log(res)
                    setInitialValues(res)
                  }).catch((err)=>{
                    setAlert({
                      type: "error",
                      message: `Error inesperado al cargar los datos de la persona`,
                    });
                  })
          }   
      },[personaId])
       useEffect(() => {
        if(!loadingPuertaPersona && resultPuertaPersona.data){
            setSelectedPuntos(resultPuertaPersona.data.map((item:any) => item.puerta.id));
        }
       },[resultPuertaPersona.data])


    const handleSubmit = (values: any) => {
        console.log("Datos enviados:", values);
        
    };
    return (
        <div className="person_admin_container">
            <PersonaForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                empresaId={empresaId}
                alert={alert}
                setAlert={setAlert}
            />

            {
                !loading && (

                    <PuntosControlSelector
                    puntosDisponibles={listControl}
                    puntosAsignadosIniciales={selectedPuntos}
                    onChange={setSelectedPuntos}
                    dataFilter={dataFilter}
                    setDatafilter={setDatafilter}
                    handleFilter={handleFilter}
                    />
                )
            }
        </div>
    );
}

export default CiudadanosAction;