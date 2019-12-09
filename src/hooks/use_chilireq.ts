import React, { useContext } from 'react';
import chiliReqBase from '../chili_req_base';
import { BaseConfig } from '../type';

export const ChiliReqContext = React.createContext<BaseConfig | undefined>(
  undefined,
);

export function useChiliReq() {
  const config = useContext(ChiliReqContext);
  if (config === undefined) {
    throw 'chiliReq missing baseConfig.';
  }
  return chiliReqBase(config);
}
