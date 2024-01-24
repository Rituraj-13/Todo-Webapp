const mongoose = require('mongoose')
const dotenv = require('dotenv')
mongoose.connect("mongodb+srv://admin:xQpyxoO4EEcO74uh@cluster0.jybslyg.mongodb.net/todo_app")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}