var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var mongoose = require('./model/db.js');

// routes
var routes = require('./routes/index');
var users = require('./routes/users')

var User = require('./model/userSchema.js'),
    Poetry = require('./model/poetrySchema.js'),
    Song = require('./model/songSchema.js');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
//app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/', routes);
app.use('/user', users);


// 添加错误处理代码:, --> 仅当前面有进行next()时
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
