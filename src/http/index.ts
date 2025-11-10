import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

const $host: AxiosInstance = axios.create({
	baseURL: process.env['NEXT_APP_API_URL']
})

const $authHost: AxiosInstance = axios.create({
	baseURL: process.env['NEXT_APP_API_URL']
})

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
	const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
	$host,
	$authHost
}