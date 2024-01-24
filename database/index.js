const mongoose = require('mongoose')
const { string, boolean } = require('zod')
mongoose.connect('mongodb+srv://admin:xQpyxoO4EEcO74uh@cluster0.jybslyg.mongodb.net/')

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}