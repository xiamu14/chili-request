/*
 * @Description: axios 参数转换函数，抹平 get/post/application 间传参的差异性
 * @Type: function
 * @Author: Ben
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-05 18:04:27
 * @LastEditTime: 2019-05-09 16:02:59
 */

import qs from 'qs';
import transformToFormData from './transform_to_form_data';

export interface Params {
  method: string;
  url: string;
  headers?: Record<string, any>;
  data?: object;
}

export default function axiosParamsConvert(params: Params) {
  const res: Record<string, any> = {};

  Object.keys(params).forEach((item) => {
    // NOTE: sign = true , 将 data => params
    if (item === 'data') {
      if (params.method === 'GET') {
        res.params = params.data;
      }
      if (params.method === 'POST') {
        if (
          params.data &&
          params.headers &&
          params.headers['Content-Type'] === 'multipart/form-data'
        ) {
          res.data = transformToFormData(params.data);
        } else if (
          params.data &&
          params.headers &&
          params.headers['Content-Type'] === 'application/json'
        ) {
          res.data = params.data;
        } else {
          res.data = qs.stringify(params.data);
        }
      }
      /* eslint-disable-next-line */
    } else {
      res[item] = params[item];
    }
  });

  return res;
}
