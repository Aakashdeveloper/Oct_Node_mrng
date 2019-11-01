var http = require('http');
var fs = require('fs');
var os = require('os');
var port = 7800;

var server = http.createServer(function(req,res){
    fs.readFile('db.json','utf-8',function(err,data){
        if(err) throw err
        res.write(data);
        res.end()
    })
    //res.write('<h1>Welcome to NodeJs  Server</h1>')
})

server.listen(port,function(){
    console.log('Server is running')
})