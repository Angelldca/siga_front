

export interface PaginatedFilter {
  query: string;
  pageSize: number;
  page: number;
  sortBy: string;
  sortType: string;
}

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
        values: {
          value: string;
          key: string;
        }[];
      }[];
}


export interface ThData {
    th: Th[]
}

export interface Th {
   value: string | Boolean;
   type: ThType;
   key: string;
}

export enum ThType {
  Check   = "Check",
  Text    = "Text",
  Boolean = "Boolean",
  Action  = "Action"
}
export type DataRow = Record<string, any>;


export interface SortConfig {
  key: string | null;
  order: "ASC" | "DES" | null;
}


export interface PaginationInfo {
  totalPages: number;
  totalElementsPage: number;
  totalElements: number;
  size: number;
  page: number;
}