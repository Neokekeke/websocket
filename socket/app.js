var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// 路由模板文件
app.get("/" , function(req , res){
    res.sendfile(__dirname + "/www/index.html");
});

// 获取在www目录下的静态文件
app.use(express.static(__dirname + "/www"));

http.listen(8082 , function(){
    var host = http.address().address;
    var port = http .address().port;
    console.log("listening on http://%s:%s" , host , port);
});

var userGroup = []; // 用户列表记录
io.on('connection' , function(socket){
    var nickname;

    // 连接状态
    socket.on("connects" , function(msg){
        nickname = msg;
        io.emit("user-connects" ,  nickname);
        userGroup.push(nickname);
        io.emit("userGroup" , userGroup);
    });

    // 断开状态
    socket.on("disconnect" , function(){    //断开服务连接
        io.emit("user-disconnect" , nickname);
        userGroup.pop();
    });

    // 聊天广播
    socket.on("chat message" , function(msg){
        io.emit("chat message" , {
            user : nickname,
            data : nickname + "：" + msg
        });
    });


});



