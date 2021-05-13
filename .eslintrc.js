module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard'
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    React: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks', 'import'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'error',
    'import/named': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '_' }],
    'react-hooks/exhaustive-deps': [
      'warn',
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true }
    ]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
}
