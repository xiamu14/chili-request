import axios from 'axios';
import axiosParamsConvert from './axios_params_convert';
import { BaseConfig, ReqConfig } from './type';

export default function chiliReqBase(config: BaseConfig) {
  axios.defaults.baseURL = config.baseURL;

  return async <T>(regConfig: ReqConfig): Promise<T> => {
    const paramCopy = axiosParamsConvert(regConfig.option);
    // NOTE:发送前拦截，用于获取 token 等...
    axios.interceptors.request.use(
      (configInstance) => {
        // NOTE: 为每一次请求设置 cancelToken
        const cancelTokenSource = axios.CancelToken.source();
        // @ts-ignore
        configInstance.cancelToken = cancelTokenSource.token;
        const { option } = regConfig;
        if (option.cache && option.cache.type === 'session') {
          // 尝试获取缓存数据
          const data = sessionStorage.getItem(
            `${option.url}-${JSON.stringify(option.data)}-${option.method}`,
          );
          // console.log('不可思议啊', data);
          // NOTE: 命中缓存
          if (data) {
            cancelTokenSource.cancel(data);
          }
        }
        // @ts-ignore
        return config.interceptorReq
          ? config.interceptorReq(configInstance)
          : configInstance;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // NOTE:返回接口数据前拦截，用于token过期重置等
    axios.interceptors.response.use(
      (res) => {
        try {
          // TODO: 判断该请求是否缓存
          const { option } = regConfig;
          console.log('这里还真的看看', res.data);
          // @ts-ignore
          if (option.cache && option.cache.type === 'session') {
            sessionStorage.setItem(
              `${option.url}-${JSON.stringify(option.data)}-${option.method}`,
              JSON.stringify(res.data),
            );
          }
          // @ts-ignore
          return config.interceptorRes ? config.interceptorRes(res) : res;
        } catch (error) {
          throw error;
        }
      },
      (error) => {
        // Do something with response error
        return Promise.reject(error);
      },
    );

    let response = null;

    try {
      response = await axios(paramCopy);
    } catch (error) {
      throw error;
    }

    let { data } = response;
    // NOTE: middle 转换数据
    if (regConfig.middle) {
      data = regConfig.middle(data);
    }

    return data as T;
  };
}
