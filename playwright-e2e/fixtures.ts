import { test as baseTest } from "@playwright/test";
import { PageFixtures, pageFixtures } from "./page-objects/pages";
import { UtilsFixtures, utilsFixtures } from "./utils";

// Gather all fixture types into a common type
export type CustomFixtures = PageFixtures & UtilsFixtures;

// Extend 'test' object using custom fixtures
export const test = baseTest.extend<CustomFixtures>({
  ...pageFixtures,
  ...utilsFixtures,
});

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;
