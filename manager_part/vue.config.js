const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        client: {
            webSocketURL: 'ws://127.0.0.1:8080/ws',
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    transpileDependencies: true,
    lintOnSave: false
})