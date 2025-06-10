module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended', // Aktifkan plugin Prettier + tampilkan error saat format salah
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'prettier/prettier': ['error'], // Error jika tidak sesuai format prettier
    // Bisa override rules ESLint lain di sini
  },
};
