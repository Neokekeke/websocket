$(function(){
    var socket = new io();
    var notify = $("<span>"); // 底部用户状态通知，connect或disconnect,warn
    var username = new Map();

    // 登录成功后发送昵称
    $(".comfirm").on("click" , function(){
        if($("#nickname").val() === ""){
            alert("昵称不能为空哦~");
        }else{
            socket.emit("connects" , $("#nickname").val());
            $(".wrap").remove(); // 移除登录界面
        }
    });

    // 连接状态
    socket.on("user-connects" , function(msg){
        if(msg === null){
            return false;
        }else {
            msg += " 加入了房间";
            $(".chatPanel").append(notify);
            // 当有新用户创建时，服务器广播显示
            systemMsg(msg , `connectStatus user-connects`);
        }
    });

    // 断开连接
    socket.on("user-disconnect" , function(msg){
        if(msg === null){
            return false;
        }else {
            msg += " 离开了房间";
            // 当有用户离开时，服务器广播显示
            systemMsg(msg , `connectStatus user-disconnects`);
        }
    });

    // 发送聊天信息
    $("#send").bind("click" , function(){
        sendMsg();
    });
    $("#text").keydown(function(e){
        if(e.which === 13){
            sendMsg();
        }
        return;
    });

    // 服务器广播聊天信息,服务器回传
    socket.on("chat message" , function(msg){
        autoFocus("#text");
        $("#message").append($("<li>").text(msg));
    });

    // click和键盘事件
    function sendMsg(){
        if($("#text").val() === ""){
            systemMsg("聊天信息不能为空哦 ~" , `connectStatus warnMsg`);
        }else{
            socket.emit("chat message" , $("#text").val());
            $("#text").val('');
            autoFocus("#text");
        }
    }

    /*****************************************************************************
     *  共用类方法
     */
    autoFocus("#nickname");
    // input自动聚焦输入框
    function autoFocus(id){
        $(id).blur(function(){
            $(id).focus();
        });
    }

    // 连接，断开，警告公共样式
    function systemMsg(msg , className){
        notify.text(msg).attr("class" , className);
        notify.fadeIn();
        notify.fadeOut(2500);
    }
});
