import { Application, Request, Response } from 'express';

export default function(app: Application): void {

  app.get('/search-option', (req: any, res: any) => {
    res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
  });

  app.post('/search-option', (req: Request, res: Response) => {
    const { knowName } = req.body;
    if (knowName === 'yes') {
      return res.redirect('/location-search');
    }
    // TODO story if the user doesnt know the name
    return res.redirect('/');
  });

  app.get('/location-search', (req: any, res: any) => {
    res.render('search/location', req.i18n.getDataByLanguage(req.lng).search.location);
  });
}
