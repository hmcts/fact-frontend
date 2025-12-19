#!/usr/bin/env node
const { Logger } = require('@hmcts/nodejs-logging');
import config from 'config';
import {app} from './app';

const logger = Logger.getLogger('server');

// TODO: set the right port for your application
const port: number = parseInt(process.env.PORT, 10) || 3100;
process.env.AZURE_CLIENT_ID = config.get('app.client-id');

app.listen(port, () => {
  logger.info('I am latest 23');
  logger.info(`Application started: http://localhost:${port}`);
});
