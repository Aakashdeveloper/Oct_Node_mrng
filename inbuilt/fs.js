var fs = require('fs');
var os = require('os');

/*fs.writeFile('mytext.txt','This from application',function(err){
    if(err) throw err;
    console.log('Data added')
})*/

var a = 'This is '+os.platform + '\n'
fs.appendFile('mytext.txt', a ,function(err){
    if(err) throw err;
    console.log('Data added')
})

fs.readFile('mytext.txt','utf-8',function(err,data){
    if(err) throw err
    console.log(data)
})