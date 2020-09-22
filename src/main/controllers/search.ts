import { Response } from 'express';
import { FactRequest } from '../interfaces/express';
import { PageData, SearchResultsData } from '../interfaces/pageData';
import { FactApi } from '../utils/fact-api';
import { hasProperty, isEmpty } from '../utils/validation';

export const getSearchOption = (req: FactRequest, res: Response): void => {
  res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
};

export const postSearchOption = (req: FactRequest, res: Response): void => {
  if (!hasProperty(req.body, 'knowLocation')) {
    const data: PageData = {
      ...req.i18n.getDataByLanguage(req.lng).search.option,
      path: '/search-option',
      errors: true,
    };
    return res.render('search/option', data);
  }
  const knowLocation = req.body.knowLocation as string;
  if (knowLocation === 'yes') {
    return res.redirect('/location-search');
  }
  // TODO story if the user doesnt know the name
  return res.redirect('/');
};

export const getLocationSearch = (req: FactRequest, res: Response): void => {
  const data: PageData = {
    ...req.i18n.getDataByLanguage(req.lng).search.location,
    path: '/location-search',
  };
  res.render('search/location', data);
};

export const getSearchResults = async (req: FactRequest, res: Response): Promise<void> => {
  const query: string = req.query.search as string;
  if (isEmpty(query)) {
    const data: PageData = {
      ...req.i18n.getDataByLanguage(req.lng).search.location,
      path: '/location-search',
      errors: true,
    };
    return res.render('search/location', data);
  }
  const courts = await FactApi.search(query);
  const data: SearchResultsData = {
    ...req.i18n.getDataByLanguage(req.lng).search.location,
    path: '/search-for-location',
    search: query,
    results: courts,
  };
  if (data.results.length > 0) {
    data.foundResults = data.foundResults.replace('{total}', data.results.length.toString());
    data.foundResults = data.foundResults.replace('{search}', data.search);
  }
  res.render('search/location', data);
};
