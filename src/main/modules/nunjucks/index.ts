import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';
import createFilters from './njkFilters';

export class Nunjucks {


  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const env = nunjucks.configure(
      [path.join(__dirname, '..', '..', 'views')],
      {
        autoescape: true,
        watch: this.developmentMode,
        express: app,
      },
    );
    env.addGlobal('govukRebrand', true);

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;

      if (!req.cookies || !req.cookies['fact-cookie-preferences']) {
        res.locals.showCookieBanner = true;
      } else {
        res.locals.showCookieBanner = false;
      }

      next();
    });

    createFilters(env);
  }
}
