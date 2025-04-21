import { FilterType, ThData } from "../../utils/interfaces";

export const filtroEvent: FilterType = {
    criterio: [
      {
        name: "criterio_1",
        values: [{
          value: "Nombre",
          key: "nombre"
        }]
      },
      {
        name: "criterio_2",
        values: [{
          value: "Fecha Inicio",
          key: "fechaInicio"
        }]
      },
    ]
  }
  
 export const th_elementEvent = {
    th: [
      {
        value: "",
        type: "Check",
        key: "check"
      }, {
        value: "Nombre",
        type: "Text", key: "nombre"
      },
      {
        value: "Fecha Inicio",
        type: "Text", key: "fechaInicio"
      },
      {
        value: "Fecha Fin",
        type: "Text", key: "fechaFin"
      },
      {
        value: "Hora Inicio",
        type: "Text", key: "horaInicio"
      },
      {
        value: "Hora Fin",
        type: "Text", key: "horaFin"
      },
      {
        value: "Activo",
        type: "Boolean", key: "activo"
      },
      {
        value: "Ilimitado",
        type: "Boolean", key: "ilimitado"
      }
    ]
  } as ThData;