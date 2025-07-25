import { Locator, Page, expect } from '@playwright/test';
import { Base } from '../base';

export class SearchByPrefixOPage extends Base {
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.noResultsMessage = this.page.locator('#header-hint');
  }
  // Click a letter A–Z
  async clickLetter(letter: string) {
    await this.page.getByRole('button', { name: letter.toUpperCase() }).click();
  }

  async assertUrlIncludes(letter: string) {
    await expect(this.page).toHaveURL(new RegExp(`[?&]prefix=${letter}`, 'i'));
  }

  async assertNoResultsVisible(letter: string) {
    await expect(this.noResultsMessage).toContainText(
      `No results found for courts or tribunals starting with '${letter.toUpperCase()}'`
    );
  }

  async assertCourtsStartWith(letter: string) {
    const results = this.page.locator('#results-list h2 > a');

    const count = await results.count();
    for (let i = 0; i < count; i++) {
      const text = await results.nth(i).innerText();
      expect(text.toUpperCase().startsWith(letter.toUpperCase())).toBeTruthy();
    }
  }
}
