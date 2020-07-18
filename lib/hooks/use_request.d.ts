import React from 'react';
import { BaseConfig, ReqConfig } from '../type';
export declare const ChiliReqContext: React.Context<BaseConfig | undefined>;
export declare function useChiliReq(): () => <T>(regConfig: ReqConfig) => Promise<T>;
declare type Request = <T>(regConfig: ReqConfig) => Promise<T>;
export declare function useFetch(): React.MutableRefObject<Request>;
export {};
