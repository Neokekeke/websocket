
$(function(){
    var socket = new io();
    var notify = $("<span>"); // 底部用户状态通知，connect或disconnect

    socket.on("user-connects" , function(msg){
        $(".chatPanel").append(notify.text(msg.data).addClass(`connectStatus user-connects`));
        notify.fadeOut(2500); // 当有新用户创建时，服务器广播显示
    });

    socket.on("user-disconnect" , function(msg){
        console.log(msg.data);
        notify.text(msg.data).addClass(`user-disconnects`);
        notify.fadeIn();
        notify.fadeOut(2500); // 当有新用户退出时，服务器广播显示
    });

    $("#send").on("click" , function(){
        socket.emit("chat message" , $("#text").val());
        $("#text").val('');
    });

    socket.on("chat message" , function(msg){
        $("#message").append($("<li>").text("我："+msg));
    });


});
