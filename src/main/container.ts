import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import Axios from 'axios';
import config from 'config';
import { FactApi } from './utils/FactApi';
import { SearchResultsController } from './controllers/search/SearchResultsController';
import { SearchOptionController } from './controllers/search/SearchOptionController';
import { HomeController } from './controllers/HomeController';
import { LocationSearchController } from './controllers/search/LocationSearchController';
import { ChooseActionController } from './controllers/ChooseActionController';
import { ChooseAreaOfLawController } from './controllers/areaOfLaw/ChooseAreaOfLawController';
import { MoneyAreaOfLawController } from './controllers/areaOfLaw/MoneyAreaOfLawController';
import { FamilyAreaOfLawController } from './controllers/areaOfLaw/FamilyAreaOfLawController';
import { FamilyAndChildrenAreaOfLawController } from './controllers/areaOfLaw/FamilyAndChildrenAreaOfLawController';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

export const container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register({
  logger: asValue(logger),
  axios: asValue(Axios.create({ baseURL: config.get('services.api.url') })),
  api: asClass(FactApi),
  homeController: asClass(HomeController),
  searchOptionController: asClass(SearchOptionController),
  locationSearchController: asClass(LocationSearchController),
  searchResultsController: asClass(SearchResultsController),
  chooseActionController: asClass(ChooseActionController),
  chooseAreaOfLawController: asClass(ChooseAreaOfLawController),
  moneyAreaOfLawController: asClass(MoneyAreaOfLawController),
  familyAreaOfLawController: asClass(FamilyAreaOfLawController),
  familyAndChildrenAreaOfLawController: asClass(FamilyAndChildrenAreaOfLawController)
});
