var express = require('express');
var app = express();
var port = 7800;
var request = require('request');

//Path for static file
app.use(express.static(__dirname+'/public'))
//Html or rendering path
app.set('views','./src/views');
//View Engine
app.set('view engine','ejs');

const Apiurl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29';

app.get('/',(req,res) => {
    res.send('Api is runnning')
})

app.get('/weather',(req,res) => {
    request(Apiurl, (err,response,body) => {
        if(err){
            res.status(404).send('Api is not running')
        } else {
            var out = JSON.parse(body)
            //res.send(out)
            res.render('index',{title:'WeatherApp',result:out})
        }
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('Api call is running')
})