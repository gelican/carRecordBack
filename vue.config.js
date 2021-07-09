let path = require('path')


function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('images', resolve('src/assets/img/'))
            .set('styles', resolve('src/assets/styles/'))
    },
    // 关闭esline
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',
        port: 5099,
        proxy: {
            '/api': {
                target: 'http://localhost:6819/api/',
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                ws: true, //是否代理websockets
                pathRewrite: {
                    '^/api': ''
                }
            },

        }
    }
}
