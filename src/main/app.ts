import * as bodyParser from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import express from 'express';
import { Helmet } from './modules/helmet';
import * as path from 'path';
import favicon from 'serve-favicon';
import { HTTPError } from 'interfaces/HttpError';
import { Nunjucks } from './modules/nunjucks';
import { I18next } from './modules/i18next';
import { container } from './container';
import { healthOptions } from './utils/healthOptions';
import * as os from 'os';
import { infoRequestHandler } from '@hmcts/info-provider';
import routes from './routes';
<<<<<<< Updated upstream
=======
import { ProxyMiddleware } from './modules/proxy';
import { PropertiesVolume } from './modules/properties-volume';
import { AppInsights } from './modules/appinsights';
>>>>>>> Stashed changes

const healthcheck = require('@hmcts/nodejs-healthcheck');
const { Express, Logger } = require('@hmcts/nodejs-logging');
const { setupDev } = require('./development');
const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';
const logger = Logger.getLogger('app');

export const app = express();
app.locals.ENV = env;
app.locals.container = container;

// setup logging of HTTP requests
app.use(Express.accessLogger());

new Nunjucks(developmentMode).enableFor(app);
// secure the application by adding various HTTP headers to its responses
new Helmet(config.get('app.security')).enableFor(app);

new I18next().enableFor(app);
<<<<<<< Updated upstream
=======
new ProxyMiddleware().enableFor(app);
new PropertiesVolume().enableFor(app);
new AppInsights().enableFor(app);
>>>>>>> Stashed changes

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-cache, max-age=0, must-revalidate, no-store',
  );
  next();
});

setupDev(app,developmentMode);

// info
app.get(
  '/info',
  infoRequestHandler({
    extraBuildInfo: {
      host: os.hostname(),
      name: 'expressjs-template',
      uptime: process.uptime(),
    },
    info: { },
  }),
);

// health
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

// remaining routes
routes(app);

// returning "not found" page for requests with paths not resolved by the router
app.use((req: any, res: any) => {
  res.status(404);
  const data = req.i18n.getDataByLanguage(req.lng).notFound;
  res.render('not-found', data);
});

// error handler
app.use((err: HTTPError, req: any, res: express.Response) => {
  logger.error(`${err.stack || err}`);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};
  res.status(err.status || 500);
  const data = req.i18n.getDataByLanguage(req.lng).error;
  res.render('error', data);
});
