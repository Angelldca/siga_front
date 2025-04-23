import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createService, editService, search } from "../services/event.service";



export function useFetch(url: string) {
    const { token, loadingSession, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError]     = useState<{message:string} | null>(null);
  
    const create = async(params:any)=> {
        if (loadingSession) return; 
        setLoading(true);
        setError(null);
        const res = await createService(params, token || "", url);
        if (res.error) {
          setError({ message: res?.error.errorMessage });
          
        }
        setResult(res);
        setLoading(false);
        return res;
    };
    const editFetch = async(id:any,data:any)=> {
      if (loadingSession) return; 
      setLoading(true);
      setError(null);
      const res = await editService(data,id, token || "", url);
      if (res.error) {
        setError({ message: res?.error.errorMessage });
        
      }
      setResult(res);
      setLoading(false);
      return res;
  };
  
    return {
      error,
      loading,
      create,
      editFetch,
      user,
      result,
    };
  }