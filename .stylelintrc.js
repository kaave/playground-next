module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-scss',
  ],
  ignoreFiles: ['node_modules/**/*', '.cache/**/*', '.next/**/*', 'coverage/**/*', 'out/**/*', 'public/**/*'],
  syntax: 'scss',
  rules: {
    /*
     * Manual
     */
    // コメント記号とコメント本文の間にスペースを強要する 無効化 IntelliJと相性が悪い
    'comment-whitespace-inside': null,
    // 複雑すぎる指定は良くないけどツールで管理しきれないので良しとする
    'selector-max-specificity': null,
    // コメントの前には空行
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    // @なにがしで意味不明なものを無効化 dart-sass & mixin & loop 関係を通す
    'at-rule-no-unknown': [true, { ignoreAtRules: ['use', 'mixin', 'include', 'each', 'for'] }],
    // @extendは難しいから禁止
    'at-rule-disallowed-list': ['extend'],
    // CSS Modules, loop各種用の記法を許可
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local', 'export'] }],
    // 不正なCSSはNGだが、exportの中はなんでもあり
    'property-no-unknown': [true, { ignoreSelectors: [':export'] }],
  },
};
