
import { User } from "../context/AuthContext";
import { urlBack } from "../final";
import { DataFilter } from "../utils/interfaces";







export async function searchEvent(dataFilter: DataFilter, 
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