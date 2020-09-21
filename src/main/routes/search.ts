import { Application } from 'express';

import {
  getSearchOption,
  postSearchOption,
  getLocationSearch,
  postLocationSearch,
  getSearchResults,
} from '../controllers/search';

export default function(app: Application): void {

  app.get('/search-option', getSearchOption);

  app.post('/search-option', postSearchOption);

  app.get('/location-search', getLocationSearch);

  app.post('/location-search', postLocationSearch);

  app.get('/search-for-location', getSearchResults);
}
