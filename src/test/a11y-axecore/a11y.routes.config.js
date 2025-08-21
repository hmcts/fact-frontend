/** Point at the *compiled* server routes file produced by your build */
const ROUTES_MODULE = 'dist/server/routes.js';

const PARAM_SAMPLES = {
  slug: ['central-london-county-court'],
  service: ['money'],
  serviceArea: ['bankruptcy'],
  action: ['search-by-postcode'],
};

const INCLUDE = [/^\/($|courts|services|search|cookies|not-found|accessibility-statement)/];
const EXCLUDE = [/^\/api\//, /^\/assets\//, /^\/_next\//, /\.(png|jpg|svg|ico|css|js|json|pdf)$/i];

const MAX_ROUTES = Number(process.env.AXE_MAX ?? 300);
const OUTPUT = 'src/test/a11y-axecore/generated/routes.json';

module.exports = { ROUTES_MODULE, PARAM_SAMPLES, INCLUDE, EXCLUDE, MAX_ROUTES, OUTPUT };

