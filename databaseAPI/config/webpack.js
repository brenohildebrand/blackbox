const path = require('path');

console.log('Running this!');

module.exports = {
  mode: 'production',
  entry: {
    main: './index.ts',
  },
  context: path.resolve(__dirname),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'databaseAPIBundle.js',
    path: path.resolve(__dirname, 'typescript'),
  },
};
