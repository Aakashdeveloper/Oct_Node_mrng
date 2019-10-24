var http = require('http');
var port = 2700;

var server = http.createServer(function(req,res){
    res.write("<h1> This is my old node Server</h1>")
});

server.listen(port,function(){
    console.log('Server is running on port '+port)
});