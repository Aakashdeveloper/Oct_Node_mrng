import express from 'express';
const app = express()
import mongo from 'mongodb'
const MongoClient = mongo.MongoClient;
import bodyParser from 'body-parser';
const port = process.env.port || 7600;
const mongourl = "mongodb://127.0.0.1:27017/";
let db;
const col_name = 'user_list'

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

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
            res.status(200).render('index',{data:result})
        }
    })
})

app.post('/find_by_id',(req,res) => {
    db.collection(col_name).find({"name":req.body.name}).toArray((err,result)=>{
        if(err){
            res.status(401).send('No Data inserted')
        }else{
            res.status(200).send(result)
        }
    })
});

app.post('/adduser',(req,res) => {
    console.log(req.body)
    db.collection(col_name).insertOne(req.body,(err,result)=>{
        if(err){
            res.status(401).send('No Data inserted')
        }else{
            res.redirect('/user')
        }
    })
});

app.put('/updateuser', (req,res) => {
    db.collection(col_name).findOneAndUpdate({"name":req.body.name},{
        $set:{
            rollno:req.body.rollno,
            name:req.body.name,
            class:req.body.class
        }},{
            upsert:true
        },(err,result) => {
            if(err){
                res.status(401).send('No Data found')
            }else{
                res.send('data updated')
            }
        })
    })


app.delete('/deleteuser',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "name":req.body.name
    },(err,result) => {
        if(err){
            res.status(401).send('No Data found')
        }else{
            res.send('data deleted')
        }
    })
})

app.get('/add',(req,res)=>{
    var id = Math.floor(Math.random()*100)
    res.render('addUser',{id: id})
})
MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('classTest');
    app.listen(port,(err) => {
        console.log(`Server is runninf on ${port}`)
    })
})



