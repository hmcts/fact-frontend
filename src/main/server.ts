#!/usr/bin/env node
const { Logger } = require('@hmcts/nodejs-logging');
import { app } from './app';

const logger = Logger.getLogger('server');

// TODO: set the right port for your application
const port: number = parseInt(process.env.PORT, 10) || 3100;
const env = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});

app.locals.ENV = env;
