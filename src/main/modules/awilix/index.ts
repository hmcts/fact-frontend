import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import Axios from 'axios';
import config from 'config';
import { FactApi } from '../../utils/FactApi';
import { SearchResultsController } from '../../controllers/search/SearchResultsController';
import { SearchOptionController } from '../../controllers/search/SearchOptionController';
import { HomeController } from '../../controllers/HomeController';
import { LocationSearchController } from '../../controllers/search/LocationSearchController';
import { ChooseActionController } from '../../controllers/ChooseActionController';
import { CourtDetailsController } from '../../controllers/CourtDetailsController';
import { Application } from 'express';
import { ChooseServiceController } from '../../controllers/service/ChooseServiceController';
import { ChooseServiceAreaController } from '../../controllers/service/ChooseServiceAreaController';
import { UnknownServiceController } from '../../controllers/service/UnknownServiceController';
import { ServiceSearchResultsController } from '../../controllers/service/ServiceSearchResultsController';
import { ServicePostcodeSearchController } from '../../controllers/service/ServicePostcodeSearchController';
import { ServicePostcodeResultsController } from '../../controllers/service/ServicePostcodeResultsController';
import { ServiceAreaRedirect } from '../../controllers/service/ServiceAreaRedirect';
import { AccessibilityStatementController } from '../../controllers/AccessibilityStatementController';
import { CookiesController } from '../../controllers/CookiesController';
import { NotFoundPageController } from '../../controllers/NotFoundPageController';
import { CourtPrefixSearchController } from '../../controllers/search/CourtPrefixSearchController';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

export class Container {
  public enableFor(app: Application) {
    app.locals.container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    }).register({
      logger: asValue(logger),
      axios: asValue(Axios.create({ baseURL: config.get('services.api.url') })),
      api: asClass(FactApi),
      serviceAreaRedirect: asClass(ServiceAreaRedirect),
      homeController: asClass(HomeController),
      accessibilityStatementController: asClass(
        AccessibilityStatementController,
      ),
      cookiesController: asClass(CookiesController),
      searchOptionController: asClass(SearchOptionController),
      locationSearchController: asClass(LocationSearchController),
      searchResultsController: asClass(SearchResultsController),
      chooseActionController: asClass(ChooseActionController),
      courtDetailsController: asClass(CourtDetailsController),
      chooseServiceController: asClass(ChooseServiceController),
      chooseServiceAreaController: asClass(ChooseServiceAreaController),
      chooseUnknownServiceController: asClass(UnknownServiceController),
      serviceSearchResultsController: asClass(ServiceSearchResultsController),
      courtNameSearchController: asClass(CourtPrefixSearchController),
      servicePostcodeSearchController: asClass(ServicePostcodeSearchController),
      servicePostcodeResultsController: asClass(
        ServicePostcodeResultsController,
      ),
      notFoundPageController: asClass(NotFoundPageController),
    });
  }
}
