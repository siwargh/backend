var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose=require('mongoose')
var bodyParser=require('body-parser');
var app = express();

// view engine setup
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/myproject', { 
promiseLibrary: require('bluebird') })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));

var app=express();
app.use(cors());
var user=require('./routes/users');
var invitation=require('./routes/invitations');
var post=require('./routes/posts');
app.use('/users',user);
app.use('/invitations',invitation);
app.use('/posts',post);
app.get("/",function(req,res){
    res.send("good jobs");
})
module.exports = app;
