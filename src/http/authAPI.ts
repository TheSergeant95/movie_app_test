import { $host } from "./index";
import { UserCredentialsType } from "../types";
import { AxiosError } from "axios";

export const register = async ({ username, password }: UserCredentialsType) => {
	try {
		const res = await $host.post('/register', { username, password });
		return {
			status: res.status,
			token: res.data.token
		}
	} catch (e: AxiosError | any) {
		return {
			status: e.response.status,
			message: e.response.data.message
		};
	}

}

export const login = async ({ username, password }: UserCredentialsType) => {
	try {
		const res = await $host.post('/login', { username, password });
		return {
			status: res.status,
			token: res.data.token
		}
	} catch (e: AxiosError | any) {
		return {
			status: e.response.status,
			message: e.response.data.message
		};
	}
}
