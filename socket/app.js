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

io.on('connection' , function(socket){
    var nickname;
    var userGroup = [];

    // 连接状态
    socket.on("connects" , function(msg){
       nickname = msg;
       io.emit("user-connects" ,  nickname);
        userGroup.push(nickname);
       //console.log(nickname + " connects");
    });

    // 断开状态
    socket.on("disconnect" , function(){    //断开服务连接
        io.emit("user-disconnect" , nickname);
        //console.log(nickname + " disconnected");
    });

    // 聊天广播
    socket.on("chat message" , function(msg){
        io.emit("chat message" , nickname + "：" + msg);
        //console.log(msg);
    });


});



