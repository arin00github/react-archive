const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { fileURLToPath } = require("url");
// const { dirname } = require("path");
const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        // babel-loader를 이용해 규칙에 적용
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", //HTML 템플릿 파일 경로
      favicon: "public/favicon.ico",
      env: process.env,
    }),
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 3000,
    static: { directory: path.resolve(__dirname) }, // 실제로 존재하는 정적 파일들의 경로
    historyApiFallback: true,
    hot: true,
  },
};
