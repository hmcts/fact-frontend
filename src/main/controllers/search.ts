import { Request, Response } from 'express';

export const getSearchOption = (req: any, res: any) => {
  res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
};

export const postSearchOption = (req: Request, res: Response) => {
  const { knowName } = req.body;
  if (knowName === 'yes') {
    return res.redirect('/location-search');
  }
  // TODO story if the user doesnt know the name
  return res.redirect('/');
};

export const getLocationSearch = (req: any, res: any) => {
  res.render('search/location', req.i18n.getDataByLanguage(req.lng).search.location);
};
