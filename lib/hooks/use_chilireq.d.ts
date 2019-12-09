import React from 'react';
import { BaseConfig } from '../type';
export declare const ChiliReqContext: React.Context<BaseConfig | undefined>;
export declare function useChiliReq(): <T>(regConfig: import("../type").ReqConfig) => Promise<T>;
