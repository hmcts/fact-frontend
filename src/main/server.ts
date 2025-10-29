#!/usr/bin/env node
const { Logger } = require('@hmcts/nodejs-logging');
import { app } from './app';
import config from 'config';

const logger = Logger.getLogger('server');

// TODO: set the right port for your application
const port: number = parseInt(process.env.PORT, 10) || 3100;
process.env.AZURE_CLIENT_ID = config.get('poc.clientAppRegId');

app.listen(port, () => {
  logger.info('I am latest 22');
  logger.info(`Application started: http://localhost:${port}`);
});
