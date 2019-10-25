var express = require('express');
var app = express();
var port = 7800;

// for static file
app.use(express.static(__dirname+'/public'))
// Help to define path of views folder
app.set('views','./src/views')
// Define template engine
app.set('view engine', 'ejs')

app.get('/', function(req,res){
    res.send('Hi from express')
})

app.get('/user', function(req,res){
    //res.send('<h1>This is user route</h1>')
    res.render('first')
})

app.listen(port, function(err){
    if(err) throw err;
    console.log('Server is running on port '+port)
})

