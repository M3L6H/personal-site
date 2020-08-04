const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = {
  context: __dirname,
  entry: "./frontend/index.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js"
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd()
    })
  ],
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/env", "@babel/react"]
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            }
          },
        ],
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
    alias: {
      images: path.resolve(__dirname, "app", "assets", "images")
    }
  }
}