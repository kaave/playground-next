const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const DotenvWebpack = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withOptimizedImages = require('next-optimized-images');

const production = process.env.NODE_ENV === 'production';

function webpack(config, { dev, isServer }) {
  config.resolve = config.resolve || {};
  config.resolve.plugins = config.resolve.plugins || [];

  config.resolve.plugins.push(new TsconfigPathsPlugin());

  config.plugins = [
    ...config.plugins,
    new DotenvWebpack({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    }),
  ];

  if (dev && !isServer) {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      const entryFile = 'main.js';
      const initializerForDevelopment = './tools/initializerForDevelopment.js';
      if (entries[entryFile] && !entries[entryFile].includes(initializerForDevelopment)) {
        entries[entryFile].unshift(initializerForDevelopment);
      }

      return entries;
    };
  }

  return config;
}

const analyzerOptions = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: './bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html',
    },
  },
};

const optimizedImagesOptions = {
  mozjpeg: {
    quality: 80,
  },
  pngquant: {
    quality: [0.65, 0.8],
  },
};

const nextOptions = {
  webpack,
  ...analyzerOptions,
  ...optimizedImagesOptions,
  cssLoaderOptions: { localIdentName: `${!production ? '[local]---' : ''}[hash:base64:5]` },
  sassOptions: { includePaths: [path.resolve(__dirname, 'src', 'styles')] },
  reactStrictMode: true,
  // ...workboxOptions,
  // exportPathMap: async (defaultPathMap) => {
  //   const posts = await fs.readJson(path.join(__dirname, 'public', 'static', 'posts', 'all.json'));
  //   const paths = posts.map(({ sys: { id } }) => ({ params: { id } }));

  //   return {
  //     ...defaultPathMap,
  //     ...posts.reduce((acc, { sys: { id } }) => ({ ...acc, [`/posts/${id}`]: { page: '/posts/[id]' } }), {}),
  //     // '/about': { page: '/about' },
  //     // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
  //     // '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
  //     // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
  //   };
  // },
};

module.exports = [withOptimizedImages, withBundleAnalyzer].reduce((acc, fn) => fn(acc || nextOptions), undefined);
