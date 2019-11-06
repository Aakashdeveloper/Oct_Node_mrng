var express = require('express');
var app = express();
var port = 7600;
var morgan = require('morgan');
var chalk = require('chalk');

var menu = [{name:'Home',link:'/'},
            {name:'Movies',link:'/movies'},
            {name:'Artists',link:'/artist'}]

var moviesRouter = require('./src/routes/moviesRoute')(menu);
var artistRouter = require('./src/routes/artistRoute')(menu);

//For Logs
app.use(morgan('tiny'))
//Path for static file
app.use(express.static(__dirname+'/public'))
//Html or rendering path
app.set('views','./src/views');
//View Engine
app.set('view engine','ejs');

app.get('/', function(req,res){
    res.render('home',{title:'Home Page', menu:menu})
});

app.use('/movies', moviesRouter);
app.use('/artist', artistRouter);

app.listen(port, function(err){
    if(err){
        throw err
    } else{
        console.log(`${chalk.gray(`Server running on ${port}`)}`)
    }
})