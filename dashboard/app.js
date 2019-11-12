var express = require('express');
var app = express()
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var port = process.env.port || 7600;
var mongourl = "mongodb://127.0.0.1:27017/";
var db;
var col_name = 'user_list'

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('app is working')
})

app.get('/user',(req,res) => {
    db.collection(col_name).find().toArray((err,result) => {
        if(err){
            res.status(401).send('No Data found')
        } else {
            res.status(200).send(result)
        }
    })
})

app.post('/adduser',(req,res) => {
    console.log(req.body)
    db.collection(col_name).insertOne(req.body,(err,result)=>{
        if(err){
            res.status(401).send('No Data inserted')
        }else{
            res.status(200).send('Data Added Succesfully')
        }
    })
})

MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('classTest');
    app.listen(port,(err) => {
        console.log(`Server is runninf on ${port}`)
    })
})



