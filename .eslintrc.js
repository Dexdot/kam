module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false
      }
    ],
    'linebreak-style': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['airbnb-base', 'prettier']
}
