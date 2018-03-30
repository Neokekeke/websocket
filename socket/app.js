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
    console.log("a user connects");

    io.emit("user-connects" , {data : "a user connects"});

    socket.on("disconnect" , function(){    //断开服务连接
        console.log("a user disconnected");
        io.emit("user-disconnect" , {data : "a user disconnected"});
    });

    socket.on("chat message" , function(msg){
        io.emit("chat message" , msg);
        console.log(msg);
    });


});



