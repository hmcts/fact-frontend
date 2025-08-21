import { Application } from 'express';
import config from 'config';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class ProxyMiddleware {
  enableFor(app: Application): void {
    app.use(
      '*.json',
      createProxyMiddleware({
        changeOrigin: true,
        target: config.get('services.api.url'),
      }),
    );

    // V2 Endpoints Proxy
    app.use(
      '/v2/proxy/search/slug/:slug',
      createProxyMiddleware({
        changeOrigin: true,
        target: config.get('services.api.url'),
        pathRewrite: (path, req) => {
          return `/courts/${req.params.slug}`;
        },
      }),
    );
    app.use(
      '/v2/proxy/search/court-types/:courtTypes',
      createProxyMiddleware({
        changeOrigin: true,
        target: config.get('services.api.url'),
        pathRewrite: (path, req) => {
          return `courts/court-types/${req.params.courtTypes}`;
        },
      }),
    );
    app.use(
      '/v2/proxy/search/postcode/:postcode/serviceArea/:serviceArea',
      createProxyMiddleware({
        changeOrigin: true,
        target: config.get('services.api.url'),
        pathRewrite: (path, req) => {
          return `search/results?postcode=${req.params.postcode}&serviceArea=${req.params.serviceArea}`;
        },
      }),
    );
  }
}
