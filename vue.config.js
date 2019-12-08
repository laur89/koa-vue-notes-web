// Turn this on to analyze your bundle
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// new BundleAnalyzerPlugin()

module.exports = {
  devServer: {
    clientLogLevel: "info",
    overlay: false,  // disable warnings-errors overlay on DOM
  },
  lintOnSave: "error",
  configureWebpack: {
    plugins: []
  },
  productionSourceMap: false // turn off prod sourcemaps
};
