// Steps:
// 1 initialize with the express generator.
// --express mongodb2
// --this will create an entire folder structure with everything we need to get started making an express web (dub dub dub) application
// 2. add a .gitignore file that will (at least) ignore everything inside of node_modules
// --reason for this? If someone wants to run your app, they can do an npm install themselves. These modules should not be committed to the ropisotry
// unless there if very good reason. Don't want to clog up the repository. This is "best practice"
// 3.Copy the compass boilerplate into the project
// --this will give you access to compass. Need to change the ruby config file to write to the correct spot. 
// This means changing the path of the css write to the directory to ../public/stylesheets
// 4. Init git the repo 
// from the command line
// -- --git init
// -- --git add * (this will add ALL files in the direcotry to be committed
// -- --git commit -m "Init commit to github"
// -- --git push/add origin/open up github desktop
// 5. npm install ejs --save
// 6. npm install mongodb --save
// --These two steps will get two more modules from the npm market for us to use in our app.
// 7. npm install
// this will install express, all its dependeies, etc. What is inside of package.json
// 8. Sanity Check run nodemon
// 9. switch the templating engine (if desired) from Jade.
// -- in app.js (where its at) go down to the app.set and change it from  .jade file to .ejs file
// 10. In index.ejs set up our common files and include them
// -head
// -header
// -footer
// // creates these files on the fly and serves them up
// 11. Set up a Wrapper div to hold our voting buttons and our image
// 12. Style the homepage
// 13. Set up and test Mongo DB




var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

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
