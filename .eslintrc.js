module.exports = {
  'env': { 'browser': true, 'es6': true, 'node': true },
  'extends': ['eslint:recommended'],
  'globals': { 'Atomics': 'readonly', 'SharedArrayBuffer': 'readonly' },
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  },
  ignorePatterns: ['src/main/views/govuk/**'],
  'parserOptions': {
    'sourceType': 'module'
  },
  'overrides': [
    {
      'files': ['**/*.ts', '**/*.tsx'],
      'env': { 'browser': true, 'es6': true, 'node': true },
      'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      'globals': { 'Atomics': 'readonly', 'SharedArrayBuffer': 'readonly' },
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'project': './tsconfig.json',
      },
      'plugins': ['@typescript-eslint'],
      'rules': {
        'indent': ['error', 2, { 'SwitchCase': 1 }],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    }
  ]

};
