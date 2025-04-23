import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createService, search } from "../services/event.service";



export function useFetch<T = any>(url: string) {
    const { token, loadingSession, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult]   = useState<T | null>(null);
    const [error, setError]     = useState<Error | null>(null);
  
    const create = useCallback(
      async (params: any) => {
        console.log("user", user?.empresa.id);
        console.log("params", params);
        if (loadingSession) return; 
        setLoading(true);
        setError(null);
        try {
          const res = await createService(params, token || "", url);
          setResult(res);
        } catch (e: any) {
          setError(e);
        } finally {
          setLoading(false);
        }
      },
      [token, url, loadingSession]
    );
  
    return {
      result,
      error,
      loading,
      create,
      user,
    };
  }