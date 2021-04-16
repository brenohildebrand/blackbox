const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production', //! Set the default mode to production
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], //! Order matters (and they load in reverse order --> starting by css-loader)
        //? css-loader puts the css into the javascript
        //? style-loader puts the css in javascript into the DOM
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    //! Generates a custom html file (important for the [contenthash])
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
});
