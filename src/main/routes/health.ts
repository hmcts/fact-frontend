import { Application } from 'express';
import config from 'config';
import { healthOptions } from '../utils/healthOptions';

const os = require('os');
const healthcheck = require('@hmcts/nodejs-healthcheck');

export default function(app: Application): void {

  const healthCheckConfig = {
    checks: {
      'fact-api': healthcheck.web(`${config.get('services.api.url')}/health`, healthOptions),
    },
    buildInfo: {
      name: config.get('services.frontend.name'),
      host: os.hostname(),
      uptime: process.uptime(),
    },
  };

  healthcheck.addTo(app, healthCheckConfig);
}
