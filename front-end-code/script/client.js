/**
 * Created by HappyEveryDay on 2018/3/29.
 */

var reg = /^[a-zA-Z0-9_-]{3,10}$/;
var loginBox = $(".login");
var chatBox = `<div class="login chatBox">
                  <div class="checkPanel"></div>
                  <input id="chats" class="chatArea" type="text" placeholder="说点什么好呢~" maxlength="66">
                  <button class="sendMsg" onclick="sendMessage()">发送</button>
               </div>`;

// 客户端推送
function comfirm(){
    if(reg.test($("#username").val()) === true){
        loginBox.remove(); // 登录界面移除
        $("body").append(chatBox); // 加载聊天窗口
        autoFocus();
    }else {
        alert("用户名必须是3到10位字符");
    }
}

function sendMessage(){
    var ws = new WebSocket("ws://localhost:8081");
    ws.onopen = function(){ // 开始建立连接
        ws.send($("#chats").val()); // 向服务器发送信息
        clearChatArea();
        autoFocus();
    };
    ws.onmessage = function(msg){ // 接收服务器推送
        console.log(msg.data);
    };
}

// 输入框自动聚焦
function autoFocus(){
    $("#chats").focus();
}

// 清空输入框
function clearChatArea(){
    $("#chats").val("");
}

// 清屏
function clearChatBox(){

}




