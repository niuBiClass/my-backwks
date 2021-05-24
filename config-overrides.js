const path = require('path')
/*
* addDecoratorsLegacy -支持装饰器
* fixBabelImports  -按需打包
* */
const {addDecoratorsLegacy, override, fixBabelImports, addLessLoader} = require('customize-cra')

//配置
const customize = () => (config, env) => {

    config.resolve.alias['@'] = path.join(__dirname, 'src')
    config.devServer = {
        proxy:{
            '/api':{
                target:'http://39.100.225.255:5000',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'/api'
                }
            }
        },
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
    }
    console.log(config)
    return config
}
const lessLoader = addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'}
})
const BabelImport = fixBabelImports(
    //针对antd实现按需打包，根据import来打包（使用babel-plugin-import）
    'import',
    {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关样式
    }
)
module.exports = override(customize(), BabelImport, lessLoader)