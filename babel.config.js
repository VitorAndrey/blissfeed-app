module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './src/screens',
          '@routes': './src/routes',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@theme': './src/theme',
          '@models': './src/models',
          '@services': './src/services',
          '@utils': './src/utils',
          '@contexts': './src/contexts',
        },
      },
    ],
  ],
};
