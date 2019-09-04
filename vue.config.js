const webpack = require("webpack")
const path = require("path")
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 55567,
    proxy: "http://w265040w10.wicp.vip"
  },
  chainWebpack: config => {
    config.plugin("provide-plugin").use(webpack.ProvidePlugin, [{
      $K: "@/js/k.js",
      $http: "@/js/http.js"
    }])
  },
  configureWebpack: config => {
    return {
      resolve: {
        alias: {
          "@coms": path.resolve(__dirname, 'src/components'),
          "@imgs": path.resolve(__dirname, 'src/assets/images'),
          "@js": path.resolve(__dirname, 'src/js'),
        }
      },
    }
  }
}
