import { useEffect, useState } from "react";
import PersonaForm from "../personaForm/personaForm";
import PuntosControlSelector, { PuntoControl } from "../punto_control/PuntoControl";
import './CiudadanosAction.css';
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { useParams, useSearchParams } from "react-router-dom";

const CiudadanosAction = () => {
    const empresaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const {  result, loading,handleFilter,dataFilter,setDatafilter} = useModuleCrud({url:"/api/puerta", module:"Puerta", 
    byBusiness:true, byDelete:true,keySearchBusiness:"zona.empresa.id", list:true});

    const {loading:loadingPuertaPersona,result:resultPuertaPersona,
        handleFilter:handleFilterPuertaPersona} = useModuleCrud({url:"/api/puerta-persona", module:"Puerta-Persona", 
         byBusiness:false,list:true});

    const [searchParams] = useSearchParams();
      const [listControl, setListControl] = useState<PuntoControl[]>([]);
      const [selectedPuntos, setSelectedPuntos] = useState<any[]>([]);
      const [personaId,serPersonaId] = useState<string|null>(searchParams.get('id'));


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
                initialValues={{}}
                onSubmit={handleSubmit}
                empresaId={empresaId}
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