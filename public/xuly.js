var socket = io("http://localhost:3000");

socket.on("server-send-dki-thatbai", function(){
    alert("Trung username");
});

socket.on("server-send-dki-thanhcong", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-danhsach-users", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>" + i + "</div>"); 
    });
});

socket.on("1100", function(data){
    $("#listMessages").append("<div class='ms'>"+ data.un +": "+ data.nd +"</div>");
});

socket.on("ai-do-dang-go-chu", function(data){
    $("#thongbao").html(data);
});

socket.on("ai-do-stop-go-chu", function(){
    $("#thongbao").html("");
});

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function(){
        socket.emit("client-send-user", $("#txtUsername").val());
    }); 
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(1000);
        $("#chatForm").hide(2000);
    });
    $("#btnSendMessages").click(function(){
        socket.emit("1000", $("#txtMessages").val());
    });

    $("#txtMessages").focusin(function(){
        socket.emit("toi-dang-go-chu");
    });
    $("#txtMessages").focusout(function(){
        socket.emit("toi-stop-go-chu");
    });

});
