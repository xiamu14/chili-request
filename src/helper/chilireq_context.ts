import React from 'react';
import { BaseConfig } from '../type';

export const ChiliReqContext = React.createContext<BaseConfig | undefined>(
  undefined,
);
