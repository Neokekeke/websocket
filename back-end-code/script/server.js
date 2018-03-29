/**
 * Created by neo on 2018/3/29.
 */


// WebSocket官方例子参考 ：https://github.com/websockets/ws

const WebSocketServer = require("ws").Server; // 引入ws模块
const wss = new WebSocketServer ({
   port : 8081
});

wss.on("connection" , function(ws){
    console.log("服务器成功建立连接...");
    // 接收客户端消息
    ws.on("message" , function(message){
        console.log("客户端消息: " , message);
        if(message){
            var date = new Date().toLocaleString();
            // 服务器推送
            ws.send("你好客户端，系统当前时间是：" +date);
        }
    });
});




