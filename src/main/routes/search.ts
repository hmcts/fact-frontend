import { Application } from 'express';

import {
  getSearchOption,
  postSearchOption,
  getLocationSearch,
  getSearchResults,
} from '../controllers/search';

export default function(app: Application): void {

  app.get('/search-option', getSearchOption);

  app.post('/search-option', postSearchOption);

  app.get('/location-search', getLocationSearch);

  app.get('/search-for-location', getSearchResults);
}
