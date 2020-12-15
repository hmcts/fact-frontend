import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';

const MAX_AGE = 28 * 24 * 60 * 1000;

export class Nunjucks {


  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const govUkFrontendPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'node_modules',
      'govuk-frontend',
    );

    nunjucks.configure(
      [path.join(__dirname, '..', '..', 'views'), govUkFrontendPath],
      {
        autoescape: true,
        watch: this.developmentMode,
        express: app,
      },
    );

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;

      if (!req.cookies || !req.cookies['seen_cookie_message']) {
        res.locals.showCookieBanner = true;
        res.cookie('seen_cookie_message', 'yes', { maxAge: MAX_AGE });
      } else {
        res.locals.showCookieBanner = false;
      }

      next();
    });
  }
}
