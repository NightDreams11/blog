module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', 'eslint-plugin-import'],
  rules: {
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        arrowParens: 'always',
      },
    ],
    'import/no-unresolved': 'off',
    'react/prop-types': 0,
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'no-inline-comments': 'warn',
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
}
