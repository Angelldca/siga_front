import { urlBack } from "../final";
import { DataFilter } from "../utils/interfaces";





export async function searchEvent(filter: DataFilter, accessToken: string) {
 
  const response = await fetch(`${urlBack}/api/evento/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include",
    body: JSON.stringify(filter)
  });
 
  const result = await response.json();

  if (!response.ok || !result.data?.length) {
    throw new Error("No se pudo obtener la información");
  }

  return result.data[0];
}