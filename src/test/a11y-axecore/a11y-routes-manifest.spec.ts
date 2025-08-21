// src/test/a11y-axecore/a11y-routes-manifest.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { reportAxe } from './reportAxe';
import fs from 'node:fs';
import path from 'node:path';

const MANIFEST = path.resolve(__dirname, './generated/routes.json');
const TAGS = ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22a','wcag22aa', 'bestPractice'] as const;

const EXCLUDE = process.env.AXE_EXCLUDE?.split(',').filter(Boolean) ?? [];
const INCLUDE = process.env.AXE_INCLUDE?.split(',').filter(Boolean) ?? [];
const DISABLE = process.env.AXE_DISABLE?.split(',').filter(Boolean) ?? [];

const routes: string[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).routes ?? [];

test.describe('WCAG across route manifest', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const pathItem of routes) {
    test(`wcag: ${pathItem}`, async ({ page, baseURL }, testInfo) => {
      const url = new URL(pathItem, baseURL ?? 'http://localhost:3100').toString();

      await page.goto(url, { waitUntil: 'networkidle' });
      await expect(page.locator('main, #main, [role="main"]')).toBeVisible({ timeout: 10_000 });

      let builder = new AxeBuilder({ page }).withTags([...TAGS]);
      for (const sel of EXCLUDE) builder = builder.exclude(sel);
      for (const sel of INCLUDE) builder = builder.include(sel);
      if (DISABLE.length) builder = builder.disableRules(DISABLE);

      const results = await builder.analyze();

      reportAxe(results);

      // soft assert to keep attachment/report generation reliable
      expect.soft(results.violations, `axe violations on ${pathItem}`).toEqual([]);

      // attach per-page HTML when debugging
      if (process.env.AXE_HTML === '1') {
        const { createHtmlReport } = await import('axe-html-reporter');
        const html = createHtmlReport({
          results,
          options: { projectKey: pathItem, doNotCreateReportFile: true },
        });
        await testInfo.attach(`axe-${pathItem}.html`, { body: html, contentType: 'text/html' });
      }

      // hard fail unless disabled
      if (process.env.AXE_FAIL !== '0') {
        expect(results.violations, `axe violations on ${pathItem}`).toEqual([]);
      }
    });
  }
});

