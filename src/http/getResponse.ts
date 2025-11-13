import { HTTP_STATUS } from "@/utils/constaints";
import { AxiosError, AxiosResponse } from "axios";

export const getResponseData = (res: AxiosResponse) => ({
    status: res.status,
    data: res.data,
    message: res.data.message || '',
});

export const getResponseError = (e: AxiosError<AxiosError<unknown, any>, any>) => ({
    status: e?.response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: e?.response?.data?.message || e.message,
});