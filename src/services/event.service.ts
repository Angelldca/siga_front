
import { User } from "../context/AuthContext";
import { urlBack } from "../final";
import { DataFilter } from "../utils/interfaces";







export async function search(dataFilter: DataFilter, 
  accessToken: string, url:string, user:User| null
) {
  
  let body: DataFilter = dataFilter;
  if(user?.empresa){

    const existing = dataFilter.filter ?? [];
    const updatedFilterArray = [...existing, {
      key: "empresa.id",
      operator: "EQUALS",
      value: user?.empresa.id,
      logicalOperation: "AND"
    }];
      body = {
      ...dataFilter,
      filter: updatedFilterArray,
    };
  }

  const response = await fetch(`${urlBack}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include",
    body: JSON.stringify(body)
  });
 
  const result = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo obtener la información");
  }
  return result;
}


export async function createService(data:any,accessToken: string, url:string ) {
  
  const response = await fetch(`${urlBack}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
 
  const result = await response.json();
  return result;
}

export async function getByIdService(id:any,accessToken: string, url:string, ) {
  
  const response = await fetch(`${urlBack}${url}?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include"
  });
 
  const result = await response.json();
  return result;
}

export async function editService(data:any, id:any,accessToken: string, url:string, ) {
  
  const response = await fetch(`${urlBack}${url}?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
 
  const result = await response.json();
  return result;
}