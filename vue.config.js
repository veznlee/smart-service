// vue.config.js
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
// 用于做相应的合并处理
const merge = require('webpack-merge');
console.log(process.env); // development（在终端输出）
// 使用额外配置文件
const configs = require('./config');
// 根据环境判断使用哪份配置
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist', // 输出文件夹，默认dist
  productionSourceMap: true, // 该配置项用于设置是否为生产环境构建生成 source map

  //图标途径
  pwa:{
    iconPaths:{
      favicon32: 'favicon-32x32.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },

  // 使用iview自定义主题时，引入less报错的问题
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  

  // config 参数为已经解析好的 webpack 配置
  chainWebpack: config => {
    config.module
    .rule('images')
    .use('url-loader')
    .tap(options =>
      merge(options, {
        limit: 5120,
      })
    )
          
    // 使用额外配置文件，可在最后的业务代码中进行访问，比如，在main.js中，console.log(process.env)中，会有
    // IP: "127.0.0.1"
    // TYPE: "dev"
    config.plugin('define')
    .tap(args => {
      let name = 'process.env';
      // 使用 merge 保证原始值不变，合并来自额外配置文件的变量
      // 此处改变的是process.env
      args[0][name] = merge(args[0][name], cfg);
      return args
    })
      

    // 为路径设置别名
    // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias
    .set('@', resolve('src'))
    .set('_c', resolve('src/components'))
  }
}