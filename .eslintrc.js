module.exports = {
  root: true,
  env: {
    node: true
  },
  "parserOptions": {
    "ecmaVersion": 10
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ["error", "always"],
    'quotes':'off',
    'space-before-function-paren':'off',
    'space-before-blocks': 'off',
    'semi': 'off',
    'no-unused-vars': 'off',
    'quote-props': 'off',
  }
}
