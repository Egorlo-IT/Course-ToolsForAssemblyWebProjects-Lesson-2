const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
  },
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|ico|mp3)$/i, use: "file-loader" },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        test: /\.foo\.css$/i,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./src/favicon.ico",
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CssMinimizerPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    port: 5000,
  },
};
