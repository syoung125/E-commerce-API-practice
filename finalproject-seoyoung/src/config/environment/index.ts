import { merge } from 'lodash';

import { development } from './development';
import { test } from './test';

const all = {
  env: process.env.NODE_ENV,
  port: process.env.PORT ? Number(process.env.PORT) : 8081,
  ip: process.env.IP || '0.0.0.0'
};

export const config: any = merge(all, _getEnvironmentConfig());

function _getEnvironmentConfig() {
  if (process.env.NODE_ENV === 'development') {
    return development;
  } else if (process.env.NODE_ENV === 'test') {
    return test;
  } else {
    return {};
  }
}
