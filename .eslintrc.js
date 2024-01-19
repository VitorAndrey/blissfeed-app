module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['@tanstack/query', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^react', '^react-native'],
          ['^\\u0000$'],
          ['^@?\\w'],
          ['^\\u0000$'],
          [
            '^@screens',
            '^@routes',
            '^@assets',
            '^@models',
            '^@contexts',
            '^@services',
          ],
          ['^\\u0000$'],
          ['^lucide-react-native'],
          ['^\\u0000$'],
          ['^@theme'],
          ['^\\u0000$'],
          ['^@components'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
