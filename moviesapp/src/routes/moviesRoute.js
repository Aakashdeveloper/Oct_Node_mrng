var express = require('express');
var moviesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

function router(menu){
    moviesRouter.route('/')
        .get((req,res) => {
            mongodb.connect(url,(err,db)=>{
              if(err){
                res.status(401).send('Error connecting')
              } else {
                const dbo = db.db('classdatabase');
                dbo.collection('movies').find({}).toArray(
                  (err,data) => {
                    if(err){
                      res.status(401).send('Error connecting')
                    }else{
                      res.render('movies',
                          {title:'Movies Page', 
                            menu:menu, movies:data})
                    }
                  }
                )
              }
            })
            
    })
  
    moviesRouter.route('/details/:id')
        .get((req,res) => {
            var {id} = req.params;
            mongodb.connect(url,(err,db) => {
              if(err){
                res.status(401).send('Error connecting db')
              } else {
                const dbo = db.db('classdatabase');
                dbo.collection('movies').findOne({_id:id},(err,data) => {
                  if(err){
                    res.status(401).send('Error connecting db')
                  }else{
                    console.log(">>>>",data)
                    res.render('moviesDetails',{title:'Movies Details Page', menu:menu,
                    movies:data})
                  }
                })
              }
            })
            
    })

    return moviesRouter
}


module.exports = router;