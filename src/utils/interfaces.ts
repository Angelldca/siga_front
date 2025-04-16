

export interface DataFilter {
  filter:CriteriaFilter[] | null;
  query: string;
  pageSize: number;
  page: number;
  sortBy: string;
  sortType: string;
}

export interface CriteriaFilter {
      key: string;
      operator: string;
      value: string;
      logicalOperation: string;
}

export interface FilterType {
    criterio: {
        name: string;
        values: string[];
      }[];
}