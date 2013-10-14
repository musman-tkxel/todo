var express = require('express'),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Todo = require('./models/todo.js').make(Schema, mongoose);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/node_todos');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://localhost/node_todos');
});

app.configure('test', function(){
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://localhost/test');
});

// Routes

app.get('/', routes.index);


app.post('/todos/add', function(req,res) {

  res.contentType('applicaton/json');

  if (req.body.title) {
    var todo = new Todo({
      title: req.body.title,
      done: false
    });

    todo.save(function(err) {
      if( err ) throw err;
      console.log("Todo Saved.")
      res.send( todo );
    });
  }
});

app.get('/todos/',function(req,res) {

  Todo.find({}, function(err,todos) {
    if(err) throw  err;
    res.send(todos);
  });
});


app.post('/todos/marktodo', function (req, res) {
  return Todo.findById(req.body.id, function (err, todo) {
    todo.done = req.body.status == 'done' ? true : false;
    return todo.save(function (err) {
      if (!err) {
        console.log("TODO Updated.");
      } else {
        console.log(err);
      }
      //return res.send(todo);
    });
  });
});

/**
 * Remove one Todo by ID
 */
app.post('/todos/destroy', function (req, res) {
  return Todo.findById(req.body.id, function (err, todo) {
    if(!err) {
      return todo.remove(function (err) {
        if (!err) {
          console.log("TODO Removed.");
          return res.send('');
        } else {
          console.log(err);
        }
      });
    }
    else{
      return res.send('ID not found.');
    }
  });
});


app.listen(3000, function(){
  console.log("Server Listening Port: %d", app.address().port);
});
