import { FilterType, ThData } from "../../utils/interfaces";

export const filtroPuerta: FilterType = {
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
      }, 
      {
        value: "Precio",
        type: "Text",
         key: "precio"
      }, 
      {
        value: "Disponible",
        type: "Boolean",
         key: "disponible"
      }, 
      {
        value: "Medida",
        type: "Text",
         key: "medida"
      }]
  } as ThData;