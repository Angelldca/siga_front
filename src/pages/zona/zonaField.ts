import { FilterType, ThData } from "../../utils/interfaces";

export const filtroEvent: FilterType = {
    criterio: [
      {
        name: "criterio_1",
        values: [{
          value: "Nombre",
          key: "nombre"
        }]
      }
    ]
  }
  
 export const th_elementEvent = {
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