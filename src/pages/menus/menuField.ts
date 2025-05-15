import { FilterType, ThData } from "../../utils/interfaces";

export const filtroMenu: FilterType = {
    criterio: [
      {
        name: "criterio_1",
        values: [{
          value: "Nombre",
          key: "nombre"
        }]
      },{
        name: "criterio_2",
        values: [{
          value: "Evento",
          key: "evento.nombre"
        }]
      }
    ]
  }
  
 export const th_elementMenu = {
    th: [
      {
        value: "",
        type: "Check",
        key: "check"
      },{
        value: "Evento",
        type: "Text",
         key: "evento.nombre"
      }, 
      {
        value: "Precio",
        type: "Text",
         key: "menu.totalPrecio"
      },{
        value: "cantidad de platos",
        type: "Text",
         key: "menu.platos.length"
      },
      {
        value: "Disponible",
        type: "Boolean",
         key: "menu.disponible"
      }]
  } as ThData;