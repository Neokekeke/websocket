
$(function(){
    var socket = new io();
    var notify = $("<span>"); // 底部用户状态通知，connect或disconnect
    var username = new Map();

    // 登录成功后发送昵称
    $(".comfirm").on("click" , function(){
        socket.emit("connects" , $("#nickname").val());
        username.set("username" , $("#nickname").val()); // map保存用户名
        $(".wrap").remove(); // 移除登录界面
    });

    // 连接状态
    socket.on("user-connects" , function(msg){
        if(msg === null){
            return false;
        }else {
            msg += " 加入了房间";
            $(".chatPanel").append(notify.text(msg).addClass(`connectStatus user-connects`));
            notify.removeClass(`user-disconnects`);
            notify.fadeIn();
            notify.fadeOut(2500);  // 当有新用户创建时，服务器广播显示
        }
    });

    // 断开连接
    socket.on("user-disconnect" , function(msg){
        if(msg === null){
            return false;
        }else {
            msg += " 离开了房间";
            notify.addClass(`user-disconnects`);
            notify.text(msg).removeClass(`user-connects`);
            notify.fadeIn();
            notify.fadeOut(2500);  // 当有用户离开时，服务器广播显示
        }
    });

    // 发送聊天信息
    $("#send").on("click" , function(){
        socket.emit("chat message" , $("#text").val());
        $("#text").val('');
    });

    // 服务器广播聊天信息
    socket.on("chat message" , function(msg){
        $("#message").append($("<li>").text(msg));
    });


});
