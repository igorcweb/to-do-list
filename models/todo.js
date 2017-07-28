const mongoose = require('mongoose');

// Todo Schema
const todoSchema = mongoose.Schema({
	todo:{
		type: String,
		required: true
	}
});

const Todo = module.exports = mongoose.model('Todo', todoSchema);

// Get Todos
module.exports.getTodos = function(callback, limit) {
	Todo.find(callback).limit(limit);
}

// Add Todo
module.exports.addTodo = function(todo, callback) {
	Todo.create(todo, callback);
}

// Update Todo
module.exports.updateTodo = function(id, todo, options, callback) {
	var query = {_id: id};
	var update = {
		name: todo.name
	}
	Todo.findOneAndUpdate(query, update, options, callback);
}


// Delete Todo
module.exports.removeTodo = function(id, callback) {
	var query = {_id: id};
	Todo.remove(query, callback);
}