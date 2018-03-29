/**
 * Created by neo on 2018/3/29.
 */

// WebSocket官方例子参考 ：https://github.com/websockets/ws

const WebSocketServer = require("ws").Server; // 引入ws模块
const wss = new WebSocketServer ({
   port : 8081
});

wss.on("connection" , function(ws){
    if(ws.readyState === 1){
        console.log("服务器成功建立连接...");
        // 接收客户端消息
        ws.on("message" , function(message){
            console.log("客户端消息: " , message);
            if(message){
                // 服务器推送
                ws.send("欢迎：" ,message);
            }
        });
    }
    else if(ws.readyState === 2){
        ws.send("连接关闭中...");
    }
    else if(ws.readyState === 3){
        ws.send("连接已经关闭了...");
    }
});




