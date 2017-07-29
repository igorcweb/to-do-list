
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Todo = require('./models/todo');


// Connect to Mongoose
mongoose.connect('mongodb://localhost/todolist', function(err) {
	if(err){console.log(err)};
});
var db = mongoose.connection;

app.get('/', function(req, res) {
	res.send('Please use /api/todos');
});

app.get('/api/todos', function(req, res) {
	Todo.getTodos(function(err, todos) {
		if(err){
			console.log(err);
		}
		res.json(todos);
	});
});

app.post('/api/todos', function(req, res) {
	var todo = req.body;
	console.log(todo);
	Todo.addTodo(todo, function(err, todo) {
		if(err){
            console.log(err);
		}
		res.json(todo);
	});
});

app.put('/api/todos/:_id', function(req, res) {
	var id = req.params._id;
	var todo = req.body;
	Todo.updateTodo(id, todo, {}, function(err, todo) {
		if(err){
			console.log(err);
		}
		res.json(todo);
	});
});

app.delete('/api/todos/:_id', function(req, res) {
	var id = req.params._id;
	Todo.removeTodo(id, function (err, todo) {
		if(err){
			console.log(err);
		}
		res.json(todo);
	});
});

app.listen(3000, function() {
    console.log('Running on Port 3000...');
});

