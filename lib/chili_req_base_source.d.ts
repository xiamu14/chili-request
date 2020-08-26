import { BaseConfig, ReqConfig } from './type';
export default function chiliReqBase(config: BaseConfig): <T>(regConfig: ReqConfig) => Promise<T>;
