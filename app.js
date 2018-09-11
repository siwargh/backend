var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var appConfig=require('./appConfig/config.json');



//routes
var user=require('./routes/users');
var invitation=require('./routes/invitations');
var post=require('./routes/posts');
var avatar=require('./routes/upload-avatar');
var friends=require('./routes/friends');
var comments=require('./routes/comments');

mongoose.Promise = require('bluebird');
mongoose.connect(appConfig.prodMongoUrl, {promiseLibrary: require('bluebird') })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));


var app = express();


 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads/avatars', express.static(path.join(__dirname, "uploads/avatars")));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);


app.use('/users',user);
app.use('/invitations',invitation);
app.use('/posts',post);
app.use('/friends',friends);
app.use('/comments',comments);
app.use('/avatar',avatar);

module.exports = app;
