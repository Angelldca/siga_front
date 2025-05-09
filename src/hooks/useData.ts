import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CriteriaFilter, DataFilter, PaginatedFilter } from "../utils/interfaces";
import { search, searchByBusiness } from "../services/event.service";

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
  interface UseDataTableParams {
    url: string;
    byBusiness?: boolean;
    byDelete?: boolean;
    keySearchBusiness?: string;
    pageSize?: number;
    list?: boolean;
}
export function useDataTable({
  url,
  byBusiness = true,
  byDelete = false,
  keySearchBusiness = "",
  pageSize = 10,
  list = true,
}: UseDataTableParams) {

  const { token, loadingSession, user } = useAuth();
  const [result, setResult] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState(list);
  const [data, setData] = useState<DataFilter>({
    filter: [],
    query: "",
    pageSize: pageSize,
    page: 0,
    sortBy: "createdAt",
    sortType: "ASC",
  });
  const handleFilter = (params: HandleFilterParams) => {
    list = true;
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
      query: pf?.query || "",
      pageSize: pf?.pageSize || 10,
      page: pf?.page || 0,
      sortBy: pf?.sortBy || "createdAt",
      sortType: pf?.sortType || "DES",
    });
    setShouldFetch(true);
  };
  useEffect(() => {
    if (loadingSession || !shouldFetch) return;
  
    setLoading(true);
  
    const fetchData = async () => {
      try {
        let res;
        if (!byBusiness) {
          res = await search(data, token || "", url, user);
        } else {
          res = await searchByBusiness(data, token || "", url, user, byDelete, keySearchBusiness);
        }
        setResult(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        //setShouldFetch(false);
      }
    };
  
    fetchData();
  }, [data, shouldFetch]);

  return {
    data,
    handleFilter,
    setData,
    result, error, loading

  };
}