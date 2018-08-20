var express=require('express');
var http=require('http');
var cors=require('cors');
var mongoClient = require('mongodb').MongoClient;
var bodyParser=require("body-parser");
var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;

mongoose.connect('mongodb://localhost:27017/projectdb',{ useNewUrlParser: true });
var app=express();
app.use(cors());
var user=require('./routes/users');
var invitation=require('./routes/invitations');
app.use('/users',user);
app.use('/invitations',invitation);
app.get("/",function(req,res){
    res.send("good jobs");
})
app.listen(3000,function(){
console.log("Server listening on 3000");
})
