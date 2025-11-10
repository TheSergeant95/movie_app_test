import axios from "axios";
import { cookies } from "next/headers";

export const getData = async (url: string, credentials: boolean = false, query?: { id: number }) => {
  try {
    let options: { withCredentials?: boolean; headers?: { [key: string]: string }} = {};
    if (credentials) {
      const cookieStore = (await cookies()).getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
      options.withCredentials = true;
      options.headers = { ...options.headers, cookie:cookieStore };
    }
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}${query ? `?id=${query.id}` : ''}`, options);
    if (res.status < 200 || res.status >= 300) {
      const error = res.data;
      return { status: res.status, message: error ? error.message : res.statusText };
    }
    const { data } = res.data;
    return { status: res.status, data };

  } catch (e: any) {
    return { status: e.response.status, message: e.response.data.message };
  }
};
