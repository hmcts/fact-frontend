import path from 'node:path';
import fs from 'node:fs/promises';

const ROUTES_MODULE = 'src/main/routes.ts'; // point to your TS routes
const OUTPUT = 'src/test/a11y-axecore/generated/routes.json';

const PARAM_SAMPLES: Record<string, string[]> = {
  slug: ['central-london-county-court'],
  service: ['money'],
  serviceArea: ['bankruptcy'],
  action: ['search-by-postcode'],
};

const INCLUDE = [/^\/($|courts|services|search|cookies|not-found|accessibility-statement)/];
const EXCLUDE = [/^\/api\//, /^\/assets\//, /^\/_next\//, /\.(png|jpg|svg|ico|css|js|json|pdf)$/i];
const MAX_ROUTES = Number(process.env.AXE_MAX ?? 300);

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'all';
type Route = { method: Method; path: string };

class MockApp {
  routes: Route[] = [];
  locals = { container: { cradle: new Proxy({}, { get: () => ({
    get() {}, post() {}, put() {}, delete() {}, patch() {},
  }) }) } };
  get(p: string, ..._h: any[]) { this.routes.push({ method: 'get', path: p }); }
  post(p: string, ..._h: any[]) { this.routes.push({ method: 'post', path: p }); }
  put(p: string, ..._h: any[]) { this.routes.push({ method: 'put', path: p }); }
  delete(p: string, ..._h: any[]) { this.routes.push({ method: 'delete', path: p }); }
  patch(p: string, ..._h: any[]) { this.routes.push({ method: 'patch', path: p }); }
  all(p: string, ..._h: any[]) { this.routes.push({ method: 'all', path: p }); }
  use() {}
}

function expandParams(route: string): string[] {
  const params = Array.from(route.matchAll(/:([A-Za-z0-9_]+)/g)).map(m => m[1]);
  if (!params.length) return [route];
  const pools = params.map(p => PARAM_SAMPLES[p] ?? [p]);
  const out: string[] = [];
  const build = (i: number, acc: Record<string,string>) => {
    if (i === params.length) {
      let r = route; for (const p of params) r = r.replace(`:${p}`, acc[p]); out.push(r); return;
    }
    for (const v of pools[i]) build(i + 1, { ...acc, [params[i]]: v });
  };
  build(0, {});
  return out;
}
const allow = (p: string) => !(EXCLUDE.some(rx => rx.test(p)) || (INCLUDE.length && !INCLUDE.some(rx => rx.test(p))));

async function main() {
  const app = new MockApp();
  const modPath = path.resolve(process.cwd(), ROUTES_MODULE);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(modPath);
  const register = (mod.default ?? mod) as (app: any) => void;
  if (typeof register !== 'function') throw new Error('routes module does not export a function');

  register(app);

  const raw = Array.from(new Set(app.routes
    .filter(r => r.method === 'get' || r.method === 'all')
    .map(r => r.path)));

  const expanded = raw.flatMap(expandParams).filter(allow);
  const unique = Array.from(new Set(expanded)).slice(0, MAX_ROUTES);

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify({ generatedAt: new Date().toISOString(), routes: unique }, null, 2));
  console.log(`a11y: wrote ${unique.length} routes to ${OUTPUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });

