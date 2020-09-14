import { Application } from 'express';

export default function(app: Application): void {

  app.get('/', (req: any, res: any) => {
    res.render('home', req.i18n.getDataByLanguage(req.lng).home);
  });

}
