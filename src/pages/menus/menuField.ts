import { FilterType, ThData } from "../../utils/interfaces";

export const filtroMenu: FilterType = {
    criterio: [
      {
        name: "criterio_1",
        values: [{
          value: "Evento",
          key: "evento.nombre"
        }]
      }, {
        name: "criterio_2",
        values: [{
          value: "Fecha",
          key: "fecha"
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
      },{
        value: "fecha",
        type: "Text",
         key: "fecha"
      },
      {
        value: "Disponible",
        type: "Boolean",
         key: "menu.disponible"
      }]
  } as ThData;