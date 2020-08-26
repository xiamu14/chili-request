import React, { useContext, useRef } from 'react';
import chiliReqBase from '../chili_req_base';
import { BaseConfig, ReqConfig } from '../type';

export const ChiliReqContext = React.createContext<BaseConfig | undefined>(
  undefined,
);

export function useChiliReq() {
  const config = useContext(ChiliReqContext);
  if (config === undefined) {
    throw 'chiliReq missing baseConfig.';
  }
  return () => chiliReqBase(config);
}

type Request = <T>(regConfig: ReqConfig) => Promise<T>;

export function useFetch() {
  const config = useContext(ChiliReqContext);
  if (config === undefined) {
    throw 'chiliReq missing baseConfig.';
  }
  const ref = useRef<Request>(chiliReqBase(config));
  return ref;
}
