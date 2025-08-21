import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function runA11yCheck(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  return results;
}
