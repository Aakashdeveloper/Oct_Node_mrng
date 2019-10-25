var http = require('http');
var os = require('os');
var port = 2400;
var fs = require('fs');

var server = http.createServer(function(req,res){
    fs.readFile('db.json','utf-8',function(err,data){
        if(err) throw err;
        res.write(data);
        res.end();
    })
    //res.write("<h1>Hi "+os.userInfo().username+" you are using "+os.platform)
    //res.write("<h1> This is my first node Server</h1>")
});

server.listen(port,function(){
    console.log('Server is running on port '+port)
});