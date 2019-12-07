import React from 'react';
import { ReqConfig, BaseConfig } from '../type';
export declare const ChiliReqContext: React.Context<BaseConfig | undefined>;
export declare function useChiliReq<T>(regConfig: ReqConfig): Promise<T>;
