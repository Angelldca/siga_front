import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const { login,user } = useAuth();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError({});
  
    const result = await login(credentials);
  
    if (result.error) {
      setError({ message: result.error });
    }
  
    setLoading(false);
    return result;
  };

  return { login: handleLogin, loading, error, user };
}