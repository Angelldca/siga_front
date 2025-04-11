
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