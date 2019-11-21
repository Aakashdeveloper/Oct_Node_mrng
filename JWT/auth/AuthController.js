const express = require('express');
var router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword,
      role:req.body.role?req.body.role:'user'
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      //res.send('userRegistered')
      var stri = encodeURIComponent('Successfully register pleae login now')
      res.redirect('/signin?msg='+stri)
    }); 
  });

router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send('Error on server')
        if(!user){ res.send('Not Registered user')}
        else{
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
            if(!passwordIsValid) return res.status(401).send({auth:false,token:null})
            var token = jwt.sign({id:user._id},config.secret,{
                expiresIn:86400
            })
            localStorage.setItem('authtoken',token)
            res.redirect('/user/profile')
            // res.status(200).send({auth:true,token:token})
        }            
    })
})

router.get('/userinfo',(req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.status(401).send({auth:false, message:'NO Token Found'})
    jwt.verify(token, config.secret,(err,decode) => {
        if(err) return ress.status(500).send({auth:false,token:'fail to validate'})
        User.findById(decode.id,{password:0},(err,user) => {
            if(err) return res.status(404).send('User Not Found')
            res.send(user)
        })
    })
})

router.get('/user',(req,res)=>{
    User.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

module.exports = router;
