let common = [
  'src/test/e2e/features/*.feature',
  '--require-module ts-node/register',
  '--require src/test/e2e/**/*.ts',
  '--format progress-bar',
  '--tags "not @skipped and not @pending"',
].join(' ');

module.exports = {
  default: common,
};
