import axios from "axios";

export const getDataClient = async (url: string, credentials: boolean = false, query?: { id: number }) => {
  try {
    // let options: { withCredentials?: boolean; headers?: { [key: string]: string }} = {};
    // if (credentials) {
    //     const cookies = document.cookie.split('; ');
    //     for (const cookie of cookies) {
    //         const [name, value] = cookie.split('=');
    //         options.withCredentials = true;
    //         options.headers = { ...options.headers, [name]: value };
    //     }
    // }
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}${query ? `?id=${query.id}` : ''}`, { withCredentials: credentials });
    if (res.status < 200 || res.status >= 300) {
      const error = res.data;
      return { status: res.status, message: error ? error.message : res.statusText };
    }
    const { data } = res.data;
    return { status: res.status, data };
  } catch (e: any) {
    return { status: e.status, message: e.response.data.message };
  }
};
