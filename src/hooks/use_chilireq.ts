import React, { useContext } from 'react';
import chiliReqBase from '../chili_req_base';
import { ReqConfig, BaseConfig } from '../type';

export const ChiliReqContext = React.createContext<BaseConfig | undefined>(
  undefined,
);

export function useChiliReq<T>(regConfig: ReqConfig) {
  const config = useContext(ChiliReqContext);
  if (config === undefined) {
    throw 'chiliReq missing baseConfig.';
  }
  return () => {
     return new Promise<T>((resolve, reject) => {
      chiliReqBase(config)<T>(regConfig)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  };
}
