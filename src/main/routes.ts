import { Application } from 'express';

export default function(app: Application): void {

  app.get('/', app.locals.container.cradle.homeController.get);
  app.get('/search-option', app.locals.container.cradle.searchOptionController.get);
  app.post('/search-option', app.locals.container.cradle.searchOptionController.post);
  app.get('/location-search', app.locals.container.cradle.locationSearchController.get);
  app.get('/search-for-location', app.locals.container.cradle.searchResultsController.get);
  app.get('/service-choose-action', app.locals.container.cradle.chooseActionController.get);
  app.post('/service-choose-action', app.locals.container.cradle.chooseActionController.post);
  app.get('/services', app.locals.container.cradle.chooseAreaOfLawController.get);
  app.post('/services', app.locals.container.cradle.chooseAreaOfLawController.post);
  app.get('/service-area-money', app.locals.container.cradle.moneyAreaOfLawController.get);
  app.post('/service-area-money', app.locals.container.cradle.moneyAreaOfLawController.post);
  app.get('/service-area-probate-divorce-civil-partnerships', app.locals.container.cradle.familyAreaOfLawController.get);
  app.post('/service-area-probate-divorce-civil-partnerships', app.locals.container.cradle.familyAreaOfLawController.post);
  app.get('/service-area-childcare-parenting', app.locals.container.cradle.childcareAndParentingAreaOfLawController.get);
  app.post('/service-area-childcare-parenting', app.locals.container.cradle.childcareAndParentingAreaOfLawController.post);
}
