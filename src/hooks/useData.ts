import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CriteriaFilter, DataFilter } from "../utils/interfaces";
import { searchEvent } from "../services/event.service";



export function useDataTable() {
    const {token,loadingSession } = useAuth();
    const [result, setResult] = useState<any>({});
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
     const [data, setData] = useState<DataFilter>({
         filter: [],
         query: "",
         pageSize: 10,
         page: 0,
         sortBy: "createdAt",
         sortType: "DES",
     });
    const handleFilter = (values: Record<string, string>) => {
        const filterValues: CriteriaFilter[] = Object.entries(values).map(([key, value]) => {
            return {
                key: key,
                operator: "LIKE",
                value: value,
                logicalOperation: "AND"
            }
        })
        setData(
            {
                filter: filterValues.length > 0 ? filterValues : [],
                query: "",
                pageSize: 10,
                page: 0,
                sortBy: "createdAt",
                sortType: "DES",
            })
    }
      useEffect(() => {
            if(loadingSession && !data) return;
            setLoading(true);
            searchEvent(data, token||"")
            .then((res) => {
               setResult(res)
            }).catch((err) => {
                setError(err)
            }).finally(() => {
                setLoading(false)
            })
        },[data])
  
    return {
        data,
        handleFilter,
        setData,
        result,error,loading

    };
  }