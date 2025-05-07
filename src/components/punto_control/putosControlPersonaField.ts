import { FilterType, ThData } from "../../utils/interfaces";

export const filtroPuntosControl: FilterType = {
    criterio: [
      {
        name: "criterio_1",
        values: [{
          value: "Nombre",
          key: "nombre"
        },{
            value: "Zona",
            key: "zona.nombre"
          }]
      }
    ]
  }
  
 export const th_elementPuerta = {
    th: [
      {
        value: "",
        type: "Check",
        key: "check"
      }, 
      {
        value: "Nombre",
        type: "Text",
         key: "nombre"
      }]
  } as ThData;