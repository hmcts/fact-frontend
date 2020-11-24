import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';

export class Nunjucks {
  MAX_AGE = 28 * 24 * 60 * 1000;

  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): nunjucks.Environment {
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

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });

    return nunjucks.configure(
      [path.join(__dirname, '..', '..', 'views'), govUkFrontendPath],
      {
        autoescape: true,
        watch: this.developmentMode,
        express: app,
      },
    );
  }
}
