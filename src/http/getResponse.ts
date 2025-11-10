import { AxiosError, AxiosResponse } from "axios";

export const getResponseData = (res: AxiosResponse) => ({
    status: res.status,
    data: res.data,
    message: res.data.message || '',
});

export const getResponseError = (e: AxiosError<AxiosError<unknown, any>, any>) => ({
    status: e?.response?.status || 500,
    message: e?.response?.data?.message || e.message,
});