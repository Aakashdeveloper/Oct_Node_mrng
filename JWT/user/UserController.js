const express = require('express');
const router = express.Router();
const app = express();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('./User');

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static(__dirname+'/public'))

router.get('/signup', (req,res) => {
    res.render('signup')
})

router.get('/profile',(req,res) => {
    var token = localStorage.getItem('authtoken');
    if(!token){
        const stri = encodeURIComponent('Please login First')
        res.redirect('/signin?msg='+stri)
    }
    jwt.verify(token, config.secret, (err,decode) => {
        console.log(token)
        if(err){
            const stri = encodeURIComponent('Please login Correct')
            res.redirect('/signin?msg='+stri)
        }else{
            User.findById(decode.id, {password:0}, (err,user) => {
                if(err) res.send('Problem in finding user')
                if(!user) res.status(404).send('No User found')
                res.render('profile',{user})
            })
        }
    })
})

router.get('/logout',(req,res) => {
    localStorage.removeItem('authtoken')
    res.redirect('/signin')
})
module.exports = router