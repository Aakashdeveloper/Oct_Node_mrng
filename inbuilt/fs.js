var fs = require('fs');

fs.appendFile('mytext.txt', 'This is form nodemon \n', function(err,data){
    if(err) throw err;
    console.log('Data added')
})

/*fs.writeFile('mytext.txt', 'This is form nodemon', function(err,data){
    if(err) throw err;
    console.log('Data added')
})*/

fs.readFile('mytext.txt', 'utf-8', function(err,data){
    if(err) throw err;
    console.log(data)
})