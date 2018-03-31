$(function(){
    var socket = new io();
    var notify = $("<span>"); // 底部用户状态通知，connect或disconnect,warn
    var username = new Map();
    let userArray = [];
    let currentUser; // 当前的用户

    // 登录成功后发送昵称
    $(".comfirm").on("click" , function(){
        if($("#nickname").val() === ""){
            alert("昵称不能为空哦~");
        }else{
            currentUser = $("#nickname").val();
            socket.emit("connects" , currentUser);
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
            let index = userArray.indexOf(msg);
            userArray.splice(index , 1);
            $(".onlinePersons").text(`在线人数是：${userArray.length} 在线用户有：${userArray.join(",")}`);
        }
    });

    // 客户端发送聊天信息
    $("#send").on("click" , function(){
        sendMsg();
    });
    $("#text").keydown(function(e){
        isTyping("connectStatus isTyping");
        if(e.which === 13){  // enter键
            sendMsg();
        }
    });

    // 服务器广播聊天信息,服务器回传
    socket.on("chat message" , function(msg){
        autoFocus("#text");
        $("#message").append($("<li>").text(msg.data));
    });

    // 当前在线用户，数量
    socket.on("userGroup" , function(res){
        console.log(res);
        for(var i in res){
            userArray[i] = res[i];
        }
        $(".onlinePersons").text(`在线人数是：${res.length}  在线用户有：${userArray.join(",")}`);
    });


/*****************************************************************************
*   共用类方法
*/
    // click和键盘事件
    function sendMsg(){
        if($("#text").val() === ""){
            systemMsg("聊天信息不能为空哦 ~" , `connectStatus warnMsg`);
        }
        else{
            if(currentUser === ""){
                return;
            }
            socket.emit("chat message" , $("#text").val());
            $("#text").val('');
            notify.fadeOut(500);
            autoFocus("#text");
        }
    }

    autoFocus("#nickname");
    // input自动聚焦输入框
    function autoFocus(id){
        $(id).blur(function(){
            $(id).focus();
        });
    }

    // 连接，断开，警告，正在输入中公共方法
    function systemMsg(msg , className){
        notify.text(msg).attr("class" , className);
        notify.fadeIn();
        notify.fadeOut(1500);
    }

    // 用户输入中
    function isTyping(className){
        var txt =  currentUser + ' 正在输入中.....';
            notify.text(txt).attr("class" , className);
            notify.fadeIn();
    }



});
