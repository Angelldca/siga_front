import { FilterType, ThData } from "../../utils/interfaces";

export const filtroEvent: FilterType = {
    criterio: [
      {
        name: "criterio_1",
        values: [{
          value: "Nombre",
          key: "nombre"
        },{
          value: "Solapin",
          key: "solapin"
        },{
            value: "DNI",
            key: "carnetidentidad"
          }]
      },
      {
        name: "criterio_2",
        values: [{
          value: "Rol institucional",
          key: "rolinstitucional"
        },{
          value: "Area",
          key: "area"
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
        value: "DNI",
        type: "Text", key: "carnetidentidad"
      },
      {
        value: "Solapin",
        type: "Text", key: "solapin"
      },
      {
        value: "Codigo barra",
        type: "Text", key: "codigobarra"
      },
      {
        value: "Area",
        type: "Text", key: "area"
      },
      {
        value: "Rol Institucional",
        type: "Text", key: "rolinstitucional"
      },
      {
        value: "Provincia",
        type: "Text", key: "provincia"
      },
      {
        value: "Municipio",
        type: "Text", key: "municipio"
      },
      {
        value: "Sexo",
        type: "Text", key: "sexo"
      },
      {
        value: "Fecha nacimiento",
        type: "Text", key: "fechanacimiento"
      },
      {
        value: "Expediente",
        type: "Text", key: "idexpediente"
      },
      {
        value: "Residente",
        type: "Boolean", key: "residente"
      },
      {
        value: "Estado",
        type: "Text", key: "estado"
      }
    ]
  } as ThData;