module.exports = {
  '*.{ts,tsx}': ['cspell', 'eslint --fix'],
  '*.scss': ['cspell', 'stylelint --fix'],
  '*.json': ['prettier --write'],
  'package.json': ['sort-package-json'],
};
