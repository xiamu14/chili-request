import axios from 'axios';
import axiosParamsConvert from './axios_params_convert';
// import transformToFormData from './transform_to_form_data';
import { BaseConfig, ReqConfig } from './type';

export default function chiliReqBase(config: BaseConfig) {
  axios.defaults.baseURL = config.baseURL;
  // NOTE:发送前拦截，用于获取 token 等...
  // if (config.interceptorReq) {
  axios.interceptors.request.use(
    (request) => {
      // @ts-ignore
      return config.interceptorReq ? config.interceptorReq(request) : request;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  // }

  // NOTE:返回接口数据前拦截，用于token过期重置等
  if (config.interceptorRes) {
    axios.interceptors.response.use(
      (response) => {
        try {
          // @ts-ignore
          return config.interceptorRes(response);
        } catch (error) {
          throw error;
        }
      },
      (error) => {
        // Do something with response error
        return Promise.reject(error);
      },
    );
  }

  return async <T>(regConfig: ReqConfig): Promise<T> => {
    const paramCopy = axiosParamsConvert(regConfig.option);

    // NOTE: formData 转换数据格式
    // if (
    //   paramCopy.data &&
    //   paramCopy.headers &&
    //   paramCopy.headers['Content-Type'] === 'multipart/form-data'
    // ) {
    //   paramCopy.data = transformToFormData(paramCopy.data);
    // }

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
