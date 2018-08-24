const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Rules
const jsRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    'babel-loader',
    // 'eslint-loader',
  ],
};

const ImagesRule = {
  test: /\.(png|jpg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 25000,
    },
  },
};

const CSSRule = {
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
  ],
};

const LESSRule = {
  test: /\.less$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: ' ' },
  ],
};


const SASSRule = {
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]_[local]_[hash:base64:5]',
        sourceMap: true,
        minimize: true,
      },
    },
    { loader: 'postcss-loader' },
    { loader: 'sass-loader' },
  ],
};

// Plugins
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});


const output = {
  path: path.join(__dirname, '/dist'),
  publicPath: '/',
  filename: 'main.js',
};

module.exports = {
  entry: './src/index.js',
  output,
  module: {
    rules: [
      jsRule,
      CSSRule,
      SASSRule,
      LESSRule,
      ImagesRule,
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [htmlPlugin],
};
