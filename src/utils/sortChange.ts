import { HandleFilterParams } from "../hooks/useData";
import { CriteriaFilter, DataFilter, PaginatedFilter, SortConfig } from "./interfaces";


interface Params {
    setSortConfig: ({key, order}: SortConfig) => void;
    handleFilter: (params: HandleFilterParams) => void;
}

export const handleSortChangeUtils = (key: string | null, order: "ASC" | "DES" | null, 
    dataFilter:DataFilter, {setSortConfig, handleFilter}:Params) => {
    setSortConfig({ key, order });
    const paginatedFilter: PaginatedFilter = {
      query: "",
      pageSize: 100,
      page: 0,
      sortBy: key ?? "createdAt",
      sortType: order ?? "DES",
    };
    const filterValues: CriteriaFilter[] = dataFilter.filter as CriteriaFilter[];
    handleFilter({
      filterValues,
      paginatedFilter,
    });
  };