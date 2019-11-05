import { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface BaseConfig {
  baseURL: string;
  interceptorReq?: (req: AxiosRequestConfig) => AxiosRequestConfig;
  interceptorRes?: (res: AxiosResponse<any>) => any;
}

export type ReqConfig = {
  option: {
    method: string;
    url: string;
    baseUrl?: string;
    headers?: any;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
  };
  middle?: Function;
};
