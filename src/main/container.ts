import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import Axios from 'axios';
import config from 'config';
import { FactApi } from './utils/FactApi';
import { SearchResultsController } from './controllers/search/SearchResultsController';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

export const container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register({
  logger: asValue(logger),
  axios: asValue(Axios.create({ baseURL: config.get('services.api.url') })),
  api: asClass(FactApi),
  searchResultsController: asClass(SearchResultsController)
});
