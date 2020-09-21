import { Request, Response } from 'express';
import { FactRequest } from '../utils/interfaces/express';
import { SearchResults } from '../utils/interfaces/searchResults';

export const getSearchOption = (req: FactRequest, res: Response): void => {
  res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
};

export const postSearchOption = (req: Request, res: Response): void => {
  const { knowName } = req.body;
  if (knowName === 'yes') {
    return res.redirect('/location-search');
  }
  // TODO story if the user doesnt know the name
  return res.redirect('/');
};

export const getLocationSearch = (req: FactRequest, res: Response): void => {
  res.render('search/location', req.i18n.getDataByLanguage(req.lng).search.location);
};

export const postLocationSearch = (req: Request, res: Response): void => {
  const { search } = req.body;
  console.log(search);
  return res.redirect('/search-for-location');
};

export const getSearchResults = (req: FactRequest, res: Response): void => {
  const data: SearchResults = {
    ...req.i18n.getDataByLanguage(req.lng).search.results,
    search: 'london',
    results: [
      {
        title: 'london',
      },
      {
        title: 'london Road',
      },
    ],
  };
  data.foundResults = data.foundResults.replace('{total}', data.results.length.toString());
  data.foundResults = data.foundResults.replace('{search}', data.search);
  res.render('search/results', data);
};
