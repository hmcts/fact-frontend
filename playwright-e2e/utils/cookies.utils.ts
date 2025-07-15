import { cookiesHeader } from "../page-objects/components/cookies.header";
import { Page, expect } from "@playwright/test";

export class CookiesUtils {
    async acceptCookies(page: Page) {
        const cookies = new cookiesHeader(page.locator('.govuk-cookie-banner__message'), page);
        await cookies.acceptCookies();
    }
}