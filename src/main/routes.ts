import { Application } from 'express';
import { stringify } from 'querystring';

export default function(app: Application): void {

  app.get('/', app.locals.container.cradle.homeController.get);
  app.get('/search-option', app.locals.container.cradle.searchOptionController.get);
  app.post('/search-option', app.locals.container.cradle.searchOptionController.post);
  app.get('/search-by-name', app.locals.container.cradle.locationSearchController.get);
  app.get('/courts', app.locals.container.cradle.searchResultsController.get);
  app.get('/service-choose-action', app.locals.container.cradle.chooseActionController.get);
  app.post('/service-choose-action', app.locals.container.cradle.chooseActionController.post);
  app.get('/courts/:slug', app.locals.container.cradle.courtDetailsController.get);
  app.get('/individual-location-pages/courts/:slug', app.locals.container.cradle.courtDetailsController.get);
  app.get('/services/unknown-service', app.locals.container.cradle.chooseUnknownServiceController.get);
  app.get('/services/:action', app.locals.container.cradle.chooseServiceController.get);
  app.post('/services/:action', app.locals.container.cradle.chooseServiceController.post);
  app.get('/services/:service/service-areas/:action', app.locals.container.cradle.chooseServiceAreaController.get);
  app.post('/services/:service/service-areas/:action', app.locals.container.cradle.chooseServiceAreaController.post);
  app.get('/services/:service/:serviceArea/search-results', app.locals.container.cradle.serviceSearchResultsController.get);
  app.get('/postcode', app.locals.container.cradle.servicePostcodeSearchController.get);
  app.post('/postcode', app.locals.container.cradle.servicePostcodeSearchController.post);

  // legacy urls
  app.get('/search', (req, res) => res.redirect(301, '/search-option'));
  app.get('/search/address', (req, res) => res.redirect(301, '/search-by-name'));
  app.get('/search/courtcode', (req, res) => res.redirect(301, '/search-by-name'));
  app.get('/search/aol', (req, res) => res.redirect(301, '/services'));
  app.get('/search/spoe', (req, res) => res.redirect(301, '/service-choose-action'));
  app.get('/search/postcode', (req, res) => res.redirect(301, '/search-by-postcode?' + stringify(req.query as any)));
  app.get('/search/results', (req, res) => {
    if (req.query.postcode) {
      res.redirect(301, '/courts/near?' + stringify(req.query as any));
    } else if (req.query.q) {
      res.redirect(301, '/courts?search=' + (req.query.q || ''));
    } else {
      res.redirect(301, '/search-by-name');
    }
  });
}
