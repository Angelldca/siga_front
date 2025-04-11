import { useState } from 'react';
import { login as loginService } from '../services/authService';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const login = async (credentials) => {
    setLoading(true);
    setError('');

    try {
      const data = await loginService(credentials);
      return data;
    } catch (err) {
      setError(err || 'Error inesperado');
      console.log(JSON.stringify(err))
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}