var express = require('express');
var app = express();
var port = 7600;
var morgan = require('morgan');
var chalk = require('chalk');

//For Logs
app.use(morgan('tiny'))
//Path for static file
app.use(express.static(__dirname+'/public'))
//Html or rendering path
app.set('views','./src/views');
//View Engine
app.set('view engine','ejs');

app.get('/', function(req,res){
    res.send("<h1>This is express</h1>")
});

app.get('/home', function(req,res){
    //res.send('<h1>This is home page</h1>')
    res.render('home',{title:'Home Page'})
});

app.get('/movies',(req,res) => {
    res.render('movies',{title:'Movies Page'})
})

app.listen(port, function(err){
    if(err){
        throw err
    } else{
        console.log(`${chalk.gray(`Server running on ${port}`)}`)
    }
})