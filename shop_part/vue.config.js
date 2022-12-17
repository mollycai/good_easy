const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    devServer: {
        host: '127.0.0.1',
        port: 8081,
        client: {
            webSocketURL: 'ws://127.0.0.1:8081/ws',
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        //配置代理跨域
        proxy: {
            "/shop": {
                target: "http://139.9.48.23:8081",
            },
        },
    },
    transpileDependencies: true,
    lintOnSave: false,
    runtimeCompiler: true //如果有自定义模板，添加这个
});