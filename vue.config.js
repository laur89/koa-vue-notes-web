// Turn this on to analyze your bundle
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// new BundleAnalyzerPlugin()

module.exports = {
  devServer: {
    clientLogLevel: "info",
    overlay: {
      warnings: false,
      errors: true
    }
  },
  lintOnSave: "default",
  configureWebpack: {
    plugins: []
  },
  productionSourceMap: false // turn off prod sourcemaps
};
