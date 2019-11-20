const app = require('./app');
const express = require('express');
const port = process.env.port || 7800;


app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(__dirname+'/public'))




app.get('/signin', (req,res) => {
    res.render('index',{msg :req.query.msg?req.query.msg:''})
})


app.listen(port,() => {
    console.log(`Running on port ${port}`)
})