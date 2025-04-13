import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { urlBack } from "../final";
import { login as loginService, getUserPermisionBusiness } from "../services/authService";

interface JwtPayload {
  sub: string;
  id: string;
  type: string;
  authorities: string[];
  iat: number;
  exp: number;
}


interface Empresa {
  address: string;
  id:string;
  logo:string;
  nombre:string;
}
interface User {
  id: string;
  email: string;
  role: string;
  authorities: string[];
  username: string;
  image: string;
  empresa: Empresa;
  [key: string]: any;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  login: (credentials: Credentials) => Promise<{ success?: Boolean; error?: string | undefined }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch(`${urlBack}/auth/refresh`, {
          method: "POST",
          credentials: "include" // envía cookie httpOnly
        });
  
        const data = await res.json();
  
        if (!res.ok || !data.token) {
          console.warn("No se pudo refrescar la sesión");
          return;
        }
  
        const accessToken = data.token;
        setToken(accessToken);
  
        const decoded: JwtPayload = jwtDecode(accessToken);
        const userData = await getUserPermisionBusiness(decoded.id, accessToken);
        setUser({
          id: decoded.id,
          email: decoded.sub,
          role: decoded.type,
          authorities: decoded.authorities,
          username: userData.user.username,
          image: userData.user.image,
          empresa: userData.empresa,
          ...userData
        });
      } catch (err) {
        console.error("Error restaurando la sesión:", err);
      }
    };
  
    restoreSession();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const data = await loginService(credentials);
      const accessToken = data.token;
      if (!accessToken) {
        throw { errorMessage: "Token no recibido del backend" };
      }
   
      setToken(accessToken);
      const decoded: JwtPayload = jwtDecode(accessToken);
      const userData = await getUserPermisionBusiness(decoded.id,accessToken);
      setUser({
        id: decoded.id,
        email: decoded.sub,
        role: decoded.type,
        authorities: decoded.authorities,
        username: userData.user.username,
        image: userData.user.image,
        empresa: userData.empresa,
        ...userData
      });
      return { success: true };
    } catch (error: any) {
      return { error: error?.errorMessage || "Error inesperado" };
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
  
    await fetch(`${urlBack}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}