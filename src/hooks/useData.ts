import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CriteriaFilter, DataFilter, PaginatedFilter } from "../utils/interfaces";
import { searchEvent } from "../services/event.service";

export type HandleFilterParams =
  | {
     
      values: Record<string, string>;
      operator?: string;
      logicalOperation?: string;
      paginatedFilter?: PaginatedFilter;
    }
  | {
    
      filterValues: CriteriaFilter[];
      paginatedFilter?: PaginatedFilter;
    };

export function useDataTable() {
    const {token,loadingSession } = useAuth();
    const [result, setResult] = useState<any>({});
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
     const [data, setData] = useState<DataFilter>({
         filter: [],
         query: "",
         pageSize: 1000,
         page: 0,
         sortBy: "createdAt",
         sortType: "DES",
     });
     const handleFilter = (params: HandleFilterParams) => {
        let filterValues: CriteriaFilter[];
      
        if ("filterValues" in params) {
          filterValues = params.filterValues;
        } else {
          const { values, operator = "LIKE", logicalOperation = "AND" } = params;
          filterValues = Object.entries(values).map(([key, value]) => ({
            key,
            operator,
            value,
            logicalOperation,
          }));
        }
      
        const pf = params.paginatedFilter;
      
        setData({
          filter: filterValues,
          query: pf?.query ?? "",
          pageSize: pf?.pageSize ?? 10,
          page: pf?.page ?? 0,
          sortBy: pf?.sortBy ?? "createdAt",
          sortType: pf?.sortType ?? "DES",
        });
      };
      useEffect(() => {
            if(loadingSession) return;
            setLoading(true);
            searchEvent(data, token||"")
            .then((res) => {
               setResult(res)
            }).catch((err) => {
                setError(err)
            }).finally(() => {
                setLoading(false);
            })
        },[data])
  
    return {
        data,
        handleFilter,
        setData,
        result,error,loading

    };
  }