// importing modules;
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var database = require('./routes/database');
var 
database
var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.json());

var conn = {
    host : 'localhost',
    user : 'username',
    password : 'password',
    database : 'zomato'
};

var knex = require('knex')({client:'mysql',connection:conn});

// get methods -----------------------
// signup page 
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/views/signup.html')
})

app.get('/signin',(req,res)=>{
    res.sendFile(__dirname+'/views/signin.html')
});

app.get('/zomatosearch',(req,res)=>{
    res.sendFile(__dirname+"/views/search.html")
})

app.get('/home',(req,res)=>{
    res.render(__dirname+"/views/zomato.ejs")
})

var users = express.Router();
app.use('/',users)
require('./routes/user')(users,knex)

var zomatos = express.Router();
app.use('/',zomatos)
require('./routes/zomato')(zomatos,knex)

// listening the port
app.listen(port=8000,(err)=>{
    if(!err){console.log('your app is listening on port : ',port)}
})
