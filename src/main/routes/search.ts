import { Application } from 'express';

import { getSearchOption, postSearchOption, getLocationSearch } from '../controllers/search';

export default function(app: Application): void {

  app.get('/search-option', getSearchOption);

  app.post('/search-option', postSearchOption);

  app.get('/location-search', getLocationSearch);
}
