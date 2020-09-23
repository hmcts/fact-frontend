import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';
import { PageData } from '../interfaces/PageData';
import { hasProperty } from '../utils/validation';

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

