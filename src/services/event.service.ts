
import { User } from "../context/AuthContext";
import { urlBack } from "../final";
import { DataFilter } from "../utils/interfaces";


export async function searchByBusiness(dataFilter: DataFilter, 
  accessToken: string, url:string, user:User| null, byDelete:boolean = false
) {
  let updatedFilterArray = dataFilter.filter ?? [];

  if (user?.empresa) {
    updatedFilterArray = [
      ...updatedFilterArray,
      {
        key: "empresa.id",
        operator: "EQUALS",
        value: user.empresa.id,
        logicalOperation: "AND"
      }
    ];
  }

  if (byDelete) {
    updatedFilterArray = [
      ...updatedFilterArray,
      {
        key: "isDelete",
        operator: "EQUALS",
        value: false,
        logicalOperation: "AND"
      }
    ];
  }

  const body: DataFilter = {
    ...dataFilter,
    filter: updatedFilterArray
  };

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



export async function search(dataFilter: DataFilter, 
  accessToken: string, url:string, user:User| null
) {
  
  let body: DataFilter = dataFilter;
  if(user?.empresa){

    const existing = dataFilter.filter ?? [];
    const updatedFilterArray = [...existing];
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
  
  const response = await fetch(`${urlBack}${url}/${id}`, {
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
  
  const response = await fetch(`${urlBack}${url}/${id}`, {
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

export async function deleteListService(ids:any[],accessToken: string, url:string, ) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("El parámetro 'ids' debe ser un array no vacío.");
  }
  const response = await fetch(`${urlBack}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include",
    body: JSON.stringify({ids})
  });
  const result = await response.json();
  return result;
}