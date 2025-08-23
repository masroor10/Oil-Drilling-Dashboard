import { merge } from "webpack-merge";
import common from "./webpack.common.config.js";
import Dotenv from "dotenv-webpack";

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./build",
    hot: true,
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [new Dotenv({ path: ".env.development.local" })],
});
