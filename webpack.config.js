const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          name: '[name].pug',
          pretty: true,
          self: true,
        },
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/img/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/fonts/',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HTMLWebpackPlugin({
      filename: 'cards.html',
      template: './src/cards.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'colors-type.html',
      template: './src/colors-type.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'form-elements.html',
      template: './src/form-elements.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'headers-footers.html',
      template: './src/headers-footers.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'landing.html',
      template: './src/landing.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'registration.html',
      template: './src/registration.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'room-details.html',
      template: './src/room-details.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'search-room-filter.html',
      template: './src/search-room-filter.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'sign-in.html',
      template: './src/sign-in.pug',
    }),
    new HTMLWebpackPlugin({
      template: './src/demo.pug',
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/img', to: './assets/img' },
      { from: './src/assets/fonts', to: './assets/fonts' },
      { from: './src/assets/favicons', to: './assets/favicons' },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
