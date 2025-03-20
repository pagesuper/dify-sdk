module.exports = {
  parser: require('postcss-comment'),
  plugins: [require('postcss-import'), require('autoprefixer')],
};
