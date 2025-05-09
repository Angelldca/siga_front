import { useEffect, useState } from "react";
import PersonaForm, { PersonaFormValues } from "../personaForm/personaForm";
import PuntosControlSelector, { PuntoControl } from "../punto_control/PuntoControl";
import './CiudadanosAction.css';
import { useModuleCrud } from "../../hooks/useModuleCrud";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { PaginationInfo } from "../../utils/interfaces";

const CiudadanosAction = () => {

    const {  result, loading,handleFilter:handleFilterPuerta,dataFilter,setDatafilter} = useModuleCrud({url:"/api/puerta", module:"Puerta", 
    byBusiness:true, byDelete:true,keySearchBusiness:"zona.empresa.id", list:true});

    const {loading:loadingPuertaPersona,result:resultPuertaPersona,
        handleFilter:handleFilterPuertaPersona} = useModuleCrud({url:"/api/puerta-persona", module:"Puerta-Persona", 
         byBusiness:false,list:false});

    const {alert,setAlert} = useModuleCrud({url:"/api/persona", module:"Persona", 
             byBusiness:false,list:false});

    const {user, create:createImage, editFetch:editImage,getByIdFetch } = useFetch("/api/imagen-facial");
    const { create:createPersona, editFetch:editFetchPerson,getByIdFetch:getByIdFetchPerson } = useFetch("/api/persona");
    const [searchParams] = useSearchParams();
      const [listControl, setListControl] = useState<PuntoControl[]>([]);
      const [selectedPuntos, setSelectedPuntos] = useState<any[]>([]);
      const navigate = useNavigate();
      const [personaId,setPersonaId] = useState<string|null>(searchParams.get('id'));
      const [initialValues, setInitialValues] = useState<{
        persona:  Partial<PersonaFormValues>,
        foto:string,
        id:any
    }|undefined>(undefined);
    const [metadata, setMetadata] = useState<PaginationInfo >({
        totalPages: 0,
        totalElementsPage: 0,
        totalElements: 0,
        size: 0,
        page: 0,
      });

      useEffect(() => {
        if(loading) return;
          setListControl(result.data);
          const { totalPages, totalElementsPage, totalElements, size, page } = result;
          setMetadata({
            totalPages,
            totalElementsPage,
            totalElements,
            size,
            page,
          });
        
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

                getByIdFetchPerson(personaId).then((res) => {
                    if (!res.error) {
                    
                      setInitialValues({
                        persona: {
                          area: res.area,
                          rolinstitucional: res.rolinstitucional || '',
                          nombre: res.nombre || '',
                          solapin: res.solapin || '',
                          carnetidentidad: res.carnetidentidad || '',
                          provincia: res.provincia || '',
                          municipio: res.municipio || '',
                          sexo: res.sexo || '',
                          residente: res.residente ?? true,
                          fechanacimiento: res.fechanacimiento || '',
                          idexpediente: res.idexpediente || '',
                          codigobarra: res.codigobarra || '',
                          estado: res.estado || "ACTIVO",
                          fotoPerfil:''
                        },
                        foto:'',
                        id: res.id || null
                      })
                      getByIdFetch(personaId).then((resImg) => {
                        if (resImg.error) return;
                        //if (!initialValues) return;
                        setInitialValues({
                          persona:{
                            area: res.area,
                            rolinstitucional: res.rolinstitucional || '',
                            nombre: res.nombre || '',
                            solapin: res.solapin || '',
                            carnetidentidad: res.carnetidentidad || '',
                            provincia: res.provincia || '',
                            municipio: res.municipio || '',
                            sexo: res.sexo || '',
                            residente: res.residente ?? true,
                            fechanacimiento: res.fechanacimiento || '',
                            idexpediente: res.idexpediente || '',
                            codigobarra: res.codigobarra || '',
                            estado: res.estado || "ACTIVO",
                            fotoPerfil:''
                          },
                          foto: resImg?.foto,
                          id: res.id || null
                        });
                      })

                    }else{
                      setAlert({
                        type: "error",
                        message: res.error.errorMessage || `Error al obtener la persona`,
                      });
                    }
                  }).catch((error) => {
                    setAlert({
                      type: "error",
                      message: error.message || `Error al obtener la persona`,
                    });
                  })
          }   
      },[personaId])
       useEffect(() => {
        if(!loadingPuertaPersona && resultPuertaPersona.data){
            setSelectedPuntos(resultPuertaPersona.data.map((item:any) => item.puerta.id));
        }
       },[resultPuertaPersona.data])
       const createImageutils = (values:any,res:any)=>{
        createImage({
          personaId: res.id,
          foto: values.fotoPerfil,
        }).then((res) => {
          if (res.error) {
            setAlert({
              type: "error",
              message: res.error.errorMessage || `Error al crear la persona`,
            });
          } else{
            setAlert({
              type: "success",
              message: `Persona creada correctamente`,
            });
            setTimeout(() => {
              setAlert(null);
              //handleFilter({filterValues: []});
            }, 2000);
          }
        })
      }

      const editImageUtils= (res:any,values:any)=>{
        editImage(personaId,{
          personaId: res.id,
          foto: values.fotoPerfil,
        }).then((res) => {
          if (res.error) {
            setAlert({
              type: "error",
              message: res.error.errorMessage || `Error al crear la persona`,
            });
          } else{
            setAlert({
              type: "success",
              message: `Persona creada correctamente`,
            });
            setTimeout(() => {
              setAlert(null);
              //handleFilter({filterValues: []});
            }, 2000);
          }
        })
      }

    const handleSubmit = (values: any) => {
        const fechaNac = values.fechanacimiento;
        const fechaCompleta = fechaNac.includes('T') ? fechaNac : `${fechaNac}T00:00:00`;
        if(!personaId){
          createPersona({
            ...values,
            fechanacimiento: fechaCompleta,
            empresa: user?.empresa.id
          }).then((res) => {
            if (res.error) {
              setAlert({
                type: "error",
                message: res.error.errorMessage || `Error al crear la persona`,
              });
            } else {
              setPersonaId(res.id)
              navigate(`?id=${res.id}`, { replace: true });
              if(!values.fotoPerfil){
                setAlert({
                  type: "success",
                  message: `Persona creada correctamente`,
                });
                return;
              }
              createImageutils(values,res);
              
            }
          })
        }else{
          editFetchPerson(personaId,{
            ...values,
            fechanacimiento: fechaCompleta
          }).then((res) => {
            if (res.error) {
              setAlert({
                type: "error",
                message: res.error.errorMessage || `Error al editar persona} `,
              });
            } else {
        
              if(!values.fotoPerfil){
                setAlert({
                  type: "success",
                  message: `Persona creada correctamente`,
                });
                return;
              }
              if(initialValues?.foto){
                editImageUtils(res,values);
              }else{
                createImageutils(values,res);
              }
            
            }
          })
        }
        
    };
    return (
        <div className="person_admin_container">
            <PersonaForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
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
                    handleFilter={handleFilterPuerta}
                    metadata={metadata}
                    personaId={initialValues?.id}
                    />
                )
            }
        </div>
    );
}

export default CiudadanosAction;



