var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose=require('mongoose')
var bodyParser=require('body-parser');


//routes
var user=require('./routes/users');
var invitation=require('./routes/invitations');
var post=require('./routes/posts');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/myproject', { 
promiseLibrary: require('bluebird') })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));


var app = express();


 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use('/users',user);
app.use('/invitations',invitation);
app.use('/posts',post);

module.exports = app;
