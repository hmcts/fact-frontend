import { Application } from 'express';

export default function(app: Application): void {

  app.get('/', app.locals.container.cradle.homeController.get);
  app.get('/search-option', app.locals.container.cradle.searchOptionController.get);
  app.post('/search-option', app.locals.container.cradle.searchOptionController.post);
  app.get('/search', app.locals.container.cradle.locationSearchController.get);
  app.get('/courts', app.locals.container.cradle.searchResultsController.get);
  app.get('/service-choose-action', app.locals.container.cradle.chooseActionController.get);
  app.post('/service-choose-action', app.locals.container.cradle.chooseActionController.post);
  app.get('/courts/:slug', app.locals.container.cradle.courtDetailsController.get);
  app.get('/individual-location-pages/courts/:slug', app.locals.container.cradle.courtDetailsController.get);
  app.get('/services/:action', app.locals.container.cradle.chooseServiceController.get);
  app.post('/services/:action', app.locals.container.cradle.chooseServiceController.post);
  app.get('/services/:service/service-areas/:action', app.locals.container.cradle.chooseServiceAreaController.get);
  app.post('/services/:service/service-areas/:action', app.locals.container.cradle.chooseServiceAreaController.post);
  app.get('/services/unknown-service', app.locals.container.cradle.chooseUnknownServiceController.get);
  app.get('/postcode', app.locals.container.cradle.servicePostcodeSearchController.get);
  app.get('/search-results', app.locals.container.cradle.serviceSearchResultsController.get);

}
