/* Create multiple routes for the todo webapp
1 - /create - post request - to create todos
2 - /mytodos - get request - to get all the todos
3 - /completed - put request - to update the todo status (completed/not completed) 
*/

const express = require('express')
const app = express();
const cors = require('cors')
const {todo} = require("./database");
const bodyParser = require('body-parser');
const { createTodo, updateTodo } = require('./types');
const port = process.env.PORT || 3000;
app.use(bodyParser.json())
app.use(cors())

// ! Creating the TODO database

app.post('/create' , async function (req,res){
    const bodyToParse = req.body;
    const parsedBody = createTodo.safeParse(bodyToParse);
    const title = req.body.title
    const description = req.body.description
    if(!parsedBody.success)
    {
        res.status(400).json({
            message : "Bad Request. The server could not understand the request due to invalid syntax."
        })
    }
    await todo.create({
        title : title,
        description : description,
        completed : false
    })
    res.status(200).json({
        message : "Todo created "
    })
})

// * Fetching all the TODO's and displaying 

app.get('/mytodos' , async function(req, res){
    const allTodos = await todo.find({})
    res.status(200).json({
        todos : allTodos
    })
})

// ! Marking the TODO's completed with the help of their ID's

app.put('/completed' , async function(req, res){
    const bodyToParse = req.body;
    const parsedBody = updateTodo.safeParse(bodyToParse);
    if(!parsedBody.success){
        res.status(400).json({
            message : "Bad Request. The server could not understand the request due to invalid syntax."
        })
    }
    await todo.updateOne({
        _id : req.body.id
    }, {
        completed : true
    })

    res.json({
        message : "Marked the task as complete"
    })

})

app.delete('/deleteTodoAtIndex/:index', async function(req, res) {
    const index = parseInt(req.params.index, 10);
    // Fetch all todos
    const todos = await todo.find({});

    // Check if index is valid
    if (index < 0 || index >= todos.length) {
        res.status(400).json({
            message: "Invalid index."
        });
        return;
    }

    // Get the todo at the specified index
    const todoAtIndex = todos[index];

    // Delete the todo
    await todo.deleteOne({ _id: todoAtIndex._id });

    res.json({
        message: 'Todo deleted successfully'
    });
});
app.listen(port)