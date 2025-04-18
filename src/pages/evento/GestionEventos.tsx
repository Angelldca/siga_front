
import Filter from "../../components/filter/filter";
import "./Event.css"

import { useDataTable } from "../../hooks/useData";
import Table from "../../components/table/table";
import { CriteriaFilter, DataFilter, DataRow, FilterType, PaginatedFilter, SortConfig, ThData } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { useCheck } from "../../hooks/useCheck";


function GestionEventos() {
  const { result, loading, handleFilter, data: dataFilter } = useDataTable();
  const [data, setData] = useState<DataRow[]>([]);
  const { selectedIds, handleSelectOne, handleSelectAll } = useCheck(data);

  // Elevamos sortConfig al padre
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });



  useEffect(() => {
    if (!loading) setData(result.data);
  }, [loading, result.data]);

  const handleSortChange = (key: string | null, order: "ASC" | "DES" | null) => {
    setSortConfig({ key, order });
    const paginatedFilter: PaginatedFilter = {
      query: "",
      pageSize: 10,
      page: 0,
      sortBy: key ?? "createdAt",
      sortType: order ?? "DES",
    };
    console.log(dataFilter)
    const filterValues: CriteriaFilter[] = dataFilter.filter as CriteriaFilter[];
    handleFilter({
      filterValues,
      paginatedFilter,
    });
  };

  return (
    <div className="event-container">
      <Filter filtros={filtro} onSubmit={values => handleFilter({ values })} />

      {loading ? (
        <Loading />
      ) : (
        
          <Table
            th_element={th_element}
            data={data}
            selectedIds={selectedIds}
            onSelectOne={handleSelectOne}
            onSelectAll={handleSelectAll}
            sortConfig={sortConfig}
            onSortChange={handleSortChange}
          />
      )}
    </div>
  );
}

export default GestionEventos;


const filtro: FilterType = {
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

const th_element = {
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