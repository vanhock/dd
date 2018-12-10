const path = require("path");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");

module.exports = {
  baseUrl: "./",
  filenameHashing: false,
  productionSourceMap: true,
  configureWebpack: {
    plugins: [
      new SVGSpritemapPlugin("src/assets/icons/*.svg", {
        styles: path.join(
          __dirname,
          "src/assets/styles/mixins_vars/_sprites.scss"
        )
      })
    ]
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/assets/styles/mixins_vars/*.scss")
      ]
    }
  }
};
