export interface Params {
    method: string;
    url: string;
    headers?: Record<string, any>;
    data?: object;
}
export default function axiosParamsConvert(params: Params): Record<string, any>;
