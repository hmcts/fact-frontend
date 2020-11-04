#!/usr/bin/env node
import { app } from './app';

import * as bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import {Helmet} from './modules/helmet';
import * as path from 'path';
import favicon from 'serve-favicon';
import {Nunjucks} from './modules/nunjucks';
import {Container} from './modules/awilix';
import addRoutes from './routes';
import {PropertiesVolume} from './modules/properties-volume';
import {SessionStorage} from './modules/session';
import {AppInsights} from './modules/appinsights';

const { Express, Logger } = require('@hmcts/nodejs-logging');
const { setupDev } = require('./development');
const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';
const server = express();

server.locals.ENV = env;
server.use(Express.accessLogger());
server.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-cache, max-age=0, must-revalidate, no-store',
  );
  next();
});

setupDev(server,developmentMode);

new PropertiesVolume().enableFor(server);
new Container().enableFor(server);
new SessionStorage().enableFor(server);
new Nunjucks(developmentMode).enableFor(server);
new Helmet(config.get('security')).enableFor(server);
new AppInsights().enableFor(server);

addRoutes(server);

const logger = Logger.getLogger('server');

// TODO: set the right port for your application
const port: number = parseInt(process.env.PORT, 10) || 3100;

app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});
