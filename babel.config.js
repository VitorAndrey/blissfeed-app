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
          '@hooks': './src/hooks',
          '@theme': './src/theme',
          '@components': './src/components',
          '@types': './src/types',
          '@services': './src/services',
          '@utils': './src/utils',
          '@contexts': './src/contexts',
        },
      },
    ],
  ],
};
