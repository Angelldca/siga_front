import React,{ createContext, useState,useContext, ReactNode } from "react";
import { login as loginService } from "../services/authService";



interface AuthContextType {
    token: string | null;
    login: (credentials: { email: string; password: string }) => Promise<string | null>;
    logout: () => void;
    isAuthenticated: boolean;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
  }
  
  export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
  
    const login = async (credentials: { email: string; password: string }) => {
      const token = await loginService(credentials);
      if (token) {
        setToken(token);
      }
      return token;
    };
  
    const logout = () => {
      setToken(null);
    };
  
    const isAuthenticated = !!token;
  
    return (
      <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
  }