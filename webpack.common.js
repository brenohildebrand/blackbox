const path = require('path');

module.exports = {
  entry: {
    main: './src/App.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    //! if its content change, so does the hash code
    //! else nothing changes
    path: path.resolve(__dirname, 'build'),
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], //! Webpack should resolve these extensions without explicit declaration
  },
};
