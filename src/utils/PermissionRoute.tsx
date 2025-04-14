import { Navigate  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { hasPermission } from "./permissions";
import React, { JSX } from "react";

interface PermissionRouteProps {
  module: string;
  permission: string;
  children: JSX.Element;
}

export function PermissionRoute({ module, permission, children }: PermissionRouteProps) {
  const { user } = useAuth();

  if (!user) return <Navigate  to="/login"/>;
  const has = hasPermission(user.authorities, module, permission);
  return has ? children : <Navigate  to="/unauthorized" />;
}
