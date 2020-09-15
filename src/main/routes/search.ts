import { Application, Request, Response } from 'express';

export default function(app: Application): void {

  app.get('/name', (req: any, res: any) => {
    res.render('search/name', req.i18n.getDataByLanguage(req.lng).search.name);
  });

  app.post('/name', (req: Request, res: Response) => {
    const { knowName } = req.body;
    if (knowName === 'yes') {
      return res.redirect('/search');
    }
    // TODO story if the user doesnt know the name
    return res.redirect('/');
  });

  app.get('/search', (req: any, res: any) => {
    res.render('search/search', req.i18n.getDataByLanguage(req.lng).search.search);
  });
}
