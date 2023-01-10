// 使用node开启的ws的后端
const ws = require('ws');
// 立即执行函数
// 把外界ws传入作用域内部，作为临时变量
;
((ws) => {
    const server = new ws.Server({ port: 8000 });
    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        server.on('open', handleOpen);
        server.on('close', handleClose);
        server.on('error', handleError);
        server.on('connection', handleConnection);
    }

    function handleOpen() {
        console.log('webSocket open');
    }

    function handleClose() {
        console.log('webSocket close');
    }

    function handleError() {
        console.log('webSocket error');
    }

    function handleConnection(ws) {
        console.log('webSocket connect');
        ws.on('message', handleMessage)
    }

    function handleMessage(msg) {
        server.clients.forEach(c => {
                c.send(msg.toString());
            })
            // console.log(msg.toString());
    }

    init();
})(ws);