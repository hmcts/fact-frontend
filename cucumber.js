let common = [
  'src/test/functional/features/*.feature',
  '--require-module ts-node/register',
  '--require src/test/functional/**/*.ts',
  '--format progress-bar',
  '--tags "not @skipped and not @pending"',
].join(' ');

module.exports = {
  default: common,
};
