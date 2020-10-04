const plugins = {
  /*
   * next features
   */
  // https://cssdb.org/#custom-properties
  'postcss-custom-properties': {},
  // https://cssdb.org/#hexadecimal-alpha-notation
  'postcss-color-hex-alpha': {},
  // https://cssdb.org/#all-property
  'postcss-initial': {},
  // https://cssdb.org/#image-set-function
  'postcss-image-set-function': {},
  // https://cssdb.org/#media-query-ranges
  'postcss-media-minmax': {},

  /*
   * modifiers
   */
  'postcss-calc': {},
  'postcss-flexbugs-fixes': {},
  'postcss-url': {},
  autoprefixer: { grid: 'autoplace' },
};

module.exports = { plugins };
