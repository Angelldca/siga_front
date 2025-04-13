
import {urlBack} from '../final'



export async function login({ email, password }) {
    const response = await fetch( `${urlBack}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok || data.status === 0) {
        throw data;
    }
  
    return data;
  }

export async function getUserPermisionBusiness(id: string, accessToken: string) {
  const payload = {
    filter: [
      {
        key: "user.id",
        operator: "EQUALS",
        value: id,
        logicalOperation: "AND"
      }
    ],
    query: "",
    pageSize: 1,
    page: 0,
    sortBy: "createdAt",
    sortType: "ASC"
  };
  console.log(payload)
  const response = await fetch(`${urlBack}/api/user-permission-business/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include",
    body: JSON.stringify(payload)
  });
 
  const result = await response.json();
  console.log(result)

  if (!response.ok || !result.data?.length) {
    throw new Error("No se pudo obtener la información del usuario");
  }

  return result.data[0]; // info completa del usuario
}