import { Request } from 'express';
import config from 'config';

const healthcheck = require('@hmcts/nodejs-healthcheck');

export const healthOptions = (): {} => {
  return {
    callback: (err: Error, res: Request): Promise<void> => {
      if (err) {
        console.log('Health check failed!');
      }
      return res.body.status == 'good' ? healthcheck.up() : healthcheck.down();
    },
    timeout: config.get('health.timeout'),
    deadline: config.get('health.deadline'),
  };
};
