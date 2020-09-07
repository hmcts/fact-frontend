let common = [
  'src/test/e2e/features/*.feature',
  '--require src/test/e2e/**/*.ts',
  '--tags "not @skipped and not @pending"',
].join(' ');

module.exports = {
  default: common,
};
