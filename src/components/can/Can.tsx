import React,{ ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { hasAnyPermissionInModule,hasPermission } from "../../utils/permissions";


interface CanProps {
  module: string;
  permission: string;
  children: ReactNode;
}

export function Can({ module, permission, children }: CanProps) {
  const { user } = useAuth();

  if (!user) return null;
  
  let has = false;
  if(permission){
     has = hasPermission(user.authorities, module, permission);
  }else{
    has = hasAnyPermissionInModule(user.authorities, module);
  }
  return has ? <>{children}</> : null;
}