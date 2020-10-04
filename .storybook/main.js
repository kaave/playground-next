const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dartSass = require('sass');
const fibers = require('fibers');

const preCssLoaderConfigs = [
  { loader: 'postcss-loader', options: { sourceMap: true } },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      implementation: dartSass,
      sassOptions: {
        fiber: fibers,
        includePaths: [path.resolve(__dirname, '..', 'src', 'styles')],
      },
    },
  },
];

module.exports = {
  stories: [
    '../src/**/*.story.{ts,md}x',
    '../src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
    '@storybook/addon-docs',
  ],
  webpackFinal: config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(stories|story)\.[tj]sx?$/,
          loader: require.resolve('@storybook/source-loader'),
          options: { injectParameters: true },
          exclude: [/node_modules/],
          enforce: 'pre',
        },
        {
          test: /\.tsx?$/,
          use: [{ loader: require.resolve('babel-loader') }, { loader: require.resolve('react-docgen-typescript-loader') }],
        },
        {
          test: /\.scss$/,
          oneOf: [
            {
              test: /\.module\.scss$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    sourceMap: true,
                    modules: { localIdentName: '[name]--[local]___[hash:base64:5]' },
                  },
                },
                ...preCssLoaderConfigs,
              ],
            },
            {
              use: [
                'style-loader',
                { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
                ...preCssLoaderConfigs,
              ],
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [
        ...config.resolve.extensions,
        '.ts',
        '.tsx',
      ],
      plugins: [
        ...config.resolve.plugins,
        new TsconfigPathsPlugin(),
      ],
    },
  }),
};

