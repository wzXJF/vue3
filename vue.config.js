const path = require('path')

module.exports = {
  // 1.这个是叠加的
  /*
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
  */
  // 2.这种方式是直接覆盖原来webpack的配置
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }
  },
  // 解决跨域问题
  devServer: {
    open: true,
    hot: true,
    compress: true,
    disableHostCheck: true
    // proxy: {
    //   '^/api': {
    //     target: 'http://xxxx',
    //     pathRewrite: {
    //       '^/api': ''
    //     },
    //     changeOrigin: true
    //   }
    // }
  }
  // 3.链式的配置
  /*
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
  */
}
