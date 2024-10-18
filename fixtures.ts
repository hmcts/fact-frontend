import { test as baseTest } from "@playwright/test";
import {
  PageFixtures,
  pageFixtures,
} from "./playwright-e2e/page-objects/pages";
import { UtilsFixtures, utilsFixtures } from "./playwright-e2e/utils";

// Gather all fixture types into a common type
export type CustomFixtures = PageFixtures & UtilsFixtures;

// Extend 'test' object using custom fixtures
export const test = baseTest.extend<CustomFixtures>({
  ...pageFixtures,
  ...utilsFixtures,
});

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;
