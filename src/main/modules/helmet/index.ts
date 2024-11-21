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
    // Use helmet with general default settings
    app.use(helmet());

    // Disable specific features and replace with manual headers
    this.setStrictTransportSecurity(app); // HSTS
    this.setXFrameOptions(app); // X-Frame-Options
    this.setPermissionsPolicy(app); // Permissions-Policy
    this.setCustomHeaders(app); // Custom Headers
    this.setContentSecurityPolicy(app); // CSP
    this.setReferrerPolicy(app, this.config.referrerPolicy); // Referrer-Policy
  }

  private setStrictTransportSecurity(app: express.Express): void {
    app.use(
      helmet.hsts({
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true,
        preload: true,
      }),
    );
  }

  private setXFrameOptions(app: express.Express): void {
    app.use(helmet.frameguard({ action: 'deny' }));
  }

  private setPermissionsPolicy(app: express.Express): void {
    app.use(
      helmet.permittedCrossDomainPolicies({
        permittedPolicies: 'none',
      }),
    );
    app.use((_req, res, next) => {
      res.setHeader(
        'Permissions-Policy',
        'geolocation=(), camera=(), microphone=(), interest-cohort=()',
      );
      next();
    });
  }

  private setCustomHeaders(app: express.Express): void {
    // Custom headers not natively supported by Helmet
    app.use((_req, res, next) => {
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
      res.setHeader(
        'Access-Control-Allow-Origin',
        'https://www.find-court-tribunal.service.gov.uk',
      );

      // Removed as per OWASP recommendations
      res.removeHeader('Expect-CT');
      next();
    });
  }

  private setContentSecurityPolicy(app: express.Express): void {
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          connectSrc: [self, googleAnalyticsDomain, doubleclick, 'https://*.dynatrace.com'],
          defaultSrc: ["'none'"],
          fontSrc: [self, 'data:', 'https://fonts.gstatic.com'],
          imgSrc: [
            self,
            azureBlob,
            ...tagManager,
            googleAnalyticsDomain,
            'data:',
            'https://ssl.gstatic.com',
            'https://www.gstatic.com',
            'https://*.dynatrace.com',
          ],
          objectSrc: [self],
          scriptSrc: [
            self,
            ...tagManager,
            googleAnalyticsDomain,
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://*.dynatrace.com',
          ],
          styleSrc: [self, ...tagManager, "'unsafe-inline'", 'https://fonts.googleapis.com'],
        },
      }),
    );
  }

  private setReferrerPolicy(app: express.Express, policy: string): void {
    if (!policy) {
      throw new Error('Referrer policy configuration is required');
    }

    // Referrer-Policy: origin
    app.use(helmet.referrerPolicy({ policy }));
  }
}
