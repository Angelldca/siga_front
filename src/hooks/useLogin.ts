import { useState } from 'react';
import { login as loginService } from '../services/authService';


export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});


  const login = async (credentials) => {
    setLoading(true);
    setError({});

    try {
      const data = await loginService(credentials);
      console.log(data)
      return data;
    } catch (err) {
      const parsedError = {
        message: err?.errorMessage || 'Error inesperado',
        fields: err?.errors || [],
      };
      setError(parsedError);
      return { error: parsedError };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}