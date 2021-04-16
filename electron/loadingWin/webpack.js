const path = require('path');

module.exports = {
  mode: 'production', //! Set the default mode to production
  entry: {
    main: './electron/loadingWin/loadingWin.jsx',
  },
  output: {
    filename: 'loadingWin.js',
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jsx|js|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/transform-runtime'], //! Makes possible to use async/await
          },
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'], //! Deal with our html to import and only import images
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
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
  resolve: {
    extensions: ['.js', '.jsx'], //! Webpack should resolve these extensions without explicit declaration
  },
};
