import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CriteriaFilter, DataFilter, PaginatedFilter } from "../utils/interfaces";
import { createService, search } from "../services/event.service";



export function useFetch <T>(url:string){
    const {token,loadingSession,user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<any>({});
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>();

    const create = (params:any)=>{

        useEffect(() => {
            if(loadingSession) return;
            setLoading(true);
            createService(params, token||"",url)
            .then((res) => {
               setResult(res)
            }).catch((err) => {
                setError(err)
            }).finally(() => {
                setLoading(false);
            })
        },[data])
    }

    return {
        data,
        setData,
        result,error,loading,
        create
    }
}