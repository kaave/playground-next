module.exports = {
  presets: ['next/babel'],
  plugins: [
    /**
     * for TypeScript
     */
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-private-methods',
  ],
};
