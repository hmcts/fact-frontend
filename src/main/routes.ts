import { Application } from 'express';

import {
  getSearchOption,
  postSearchOption,
  getLocationSearch,
} from './controllers/search';
import { getHomePage } from './controllers/home';

export default function(app: Application): void {

  app.get('/', getHomePage);
  app.get('/search-option', getSearchOption);
  app.post('/search-option', postSearchOption);
  app.get('/location-search', getLocationSearch);
  app.get('/search-for-location', app.locals.container.cradle.searchResultsController.get);

}
