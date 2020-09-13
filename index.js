var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000, function(){
    console.log("Listening on 3000");
});

var mangUsers = [];


io.on("connection", function(socket){
    console.log("Co nguoi ket noi --- id: "+ socket.id);
    
    socket.on("disconnect", function(){
        console.log(socket.id + " ngat ket noi");
    });

    socket.on("client-send-user", function(data){
        if(mangUsers.indexOf(data)>=0){
            //fail
            socket.emit("server-send-dki-thatbai");     
        }else{
            //thanh cong
            mangUsers.push(data);   
            socket.Username = data;  
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danhsach-users", mangUsers);
        }
    });
    socket.on("logout", function(){
        mangUsers.splice(mangUsers.indexOf(socket.Username), 1);
        socket.broadcast.emit("server-send-danhsach-users", mangUsers);
    });
    socket.on("1000", function(data){
        io.sockets.emit("1100", {un: socket.Username, nd: data} );
    });
    socket.on("toi-dang-go-chu", function(){
        var s = socket.Username + " dang go chu";
        socket.broadcast.emit("ai-do-dang-go-chu", s);
    });
    socket.on("toi-stop-go-chu", function(){
        socket.broadcast.emit("ai-do-stop-go-chu");
    });
   
});

app.get("/", function(req, res){
    res.render("trangchu");
});