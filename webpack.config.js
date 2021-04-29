var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  output: {
    filename: "main.[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templet.html",
    }),
  ],
};
