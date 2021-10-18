const webpack = require("webpack");
module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.31.174:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  configureWebpack: {
    plugins: [
      // 支持 jquery
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
    externals: {
      AMap: "AMap", // 高德地图配置
    },
  },
  // css: {
  //     loaderOptions: {
  //         postcss: {
  //             plugins: [
  //                 require("postcss-px-to-viewport")({
  //                     unitToConvert: "px",
  //                     viewportWidth: 7680,
  //                     unitPrecision: 6,
  //                     propList: [
  //                         "*"
  //                     ],
  //                     viewportUnit: "vw",
  //                     fontViewportUnit: "vw",
  //                     selectorBlackList: [],
  //                     minPixelValue: 1,
  //                     mediaQuery: false,
  //                     replace: true,
  //                     exclude: /(\/|\\)(node_modules)(\/|\\)/,
  //                 })
  //             ]
  //         }
  //     }
  // }
};
