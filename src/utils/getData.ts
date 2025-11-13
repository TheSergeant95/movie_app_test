import axios from "axios";
import { cookies } from "next/headers";
import { HTTP_STATUS } from "./constaints";

export const request = async (url: string, credentials: boolean = false, client: boolean = false, query?: { id: number }) => {
  try {
    let options: { withCredentials?: boolean; headers?: { [key: string]: string } } = {};
    if (credentials) {
      options.withCredentials = true;
      if (client) {
        const cookieStore = (await cookies()).getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
        options.headers = { ...options.headers, cookie: cookieStore };
      }
    }
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}${query ? `?id=${query.id}` : ''}`, options);
    if (res.status !== HTTP_STATUS.OK) {
      const error = res.data;
      return { status: res.status, message: error ? error.message : res.statusText };
    }
    const { data } = res.data;
    return { status: res.status, data };

  } catch (e: any) {
    return { status: client ? e.status : e.response.status, message: e.response.data.message };
  }
}

export const getData = async (url: string, credentials: boolean = false, query?: { id: number }) => request(url, credentials, false, query);

export const getDataClient = async (url: string, credentials: boolean = false, query?: { id: number }) => request(url, credentials, true, query);
