import * as express from 'express';
import helmet from 'helmet';

export interface HelmetConfig {
  referrerPolicy: string;
}

const googleAnalyticsDomain = '*.google-analytics.com';
const tagManager = ['*.googletagmanager.com', 'https://tagmanager.google.com'];
const self = "'self'";
const azureBlob = '*.blob.core.windows.net';
const doubleclick = 'stats.g.doubleclick.net';

/**
 * Module that enables helmet in the application
 */
export class Helmet {
  constructor(public config: HelmetConfig) {}

  public enableFor(app: express.Express): void {
    // include default helmet functions
    app.use(helmet({crossOriginEmbedderPolicy: false}));

    this.setContentSecurityPolicy(app);
    this.setReferrerPolicy(app, this.config.referrerPolicy);
  }

  private setContentSecurityPolicy(app: express.Express): void {
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          connectSrc: [self, googleAnalyticsDomain, doubleclick, 'https://*.dynatrace.com'],
          defaultSrc: ["'none'"],
          fontSrc: [self, 'data:', 'https://fonts.gstatic.com'],
          imgSrc: [self, azureBlob, ...tagManager, googleAnalyticsDomain, 'data:', 'https://ssl.gstatic.com', 'https://www.gstatic.com', 'https://*.dynatrace.com'],
          objectSrc: [self],
          scriptSrc: [self, ...tagManager, googleAnalyticsDomain, 'https://*.dynatrace.com'],
          styleSrc: [self, ...tagManager, 'https://fonts.googleapis.com'],
        },
      }),
    );
  }

  private setReferrerPolicy(app: express.Express, policy: string): void {
    if (!policy) {
      throw new Error('Referrer policy configuration is required');
    }

    app.use(helmet.referrerPolicy({ policy }));
  }
}
