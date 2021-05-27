let common = [
  'src/test/functional/features/A-Z-court-search.feature',
  '--require-module ts-node/register',
  '--require src/test/functional/**/*.ts',
  '--tags "not @skipped and not @pending"',
].join(' ');

module.exports = {
  default: common,
};
