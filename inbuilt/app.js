var http = require('http');
var port = 7900;

var server = http.createServer(function(req,res){
    res.write('<h1>Welcome to NodeJs Server</h1>')
})

server.listen(port,function(){
    console.log('Server is running')
})
