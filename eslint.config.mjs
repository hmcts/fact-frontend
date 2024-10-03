import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
const { configs: typescriptConfigs } = typescript;

export default [
  {
    ignores: [".yarn/**", ".pnp.cjs", ".pnp.loader.mjs"],
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { project: ["./tsconfig.json"] },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs["flat/recommended"].rules,
      "no-console": "warn",
      "@typescript-eslint/no-floating-promises": ["error"],
    },
  },
];
