import React, { useState, useEffect } from 'react';
import CreateTodo from './CreateTodo';
import MyIcon from '../assets/bin.svg';
import './showTodo.css'

const backend_url = "https://todo-webapp-bise.onrender.com";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [deleteCount, setDeleteCount] = useState(0);
    const [todoAdded, setTodoAdded] = useState(0);

    useEffect(() => {
        fetch(`${backend_url}/mytodos`)
            .then(response => response.json())
            .then(data => setTodos(data.todos));
    }, [deleteCount, todoAdded]);
    return (
        <>
            <div className='outerMost h-screen w-screen justify-center items-center flex'>
            {/* Render CreateTodo component and pass onTodoAdded callback */}
            <CreateTodo onTodoAdded={() => setTodoAdded(todoAdded + 1)} />
            <br />
            <br />
                <div className='outerDiv w-1/3 h-1/2 border-2 border-black overflow-y-auto m-10'>
                    <div className='w-full h-[15%] p-2'><h1 className='w-full h-full justify-center items-center flex border-2 border-black' id='list_of_todo'>List Of TODO's</h1></div>
                    <div className='innerDiv p-4 h-full'>
                        {todos.map((todo, index) => (
                            <div key={index}>
                                <h1 id='task_no'>Task {index + 1}</h1>
                                <h1 className='flex justify-between' id='title'>
                                    {todo.title}
                                    <button
                                        className='button'
                                        onClick={() => {
                                            console.log(index);
                                            fetch(`${backend_url}/deleteTodoAtIndex/${index}`, {
                                                method: 'DELETE'
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    alert(`Deleted Task ${index + 1}`)
                                                    console.log(data.message);
                                                    setDeleteCount(deleteCount + 1);
                                                })
                                                .catch((error) => {
                                                    console.error('Error:', error);
                                                }); 
                                        }}
                                    >
                                        <img src={MyIcon} alt="Icon" className='h-8 w-6' />
                                    </button>
                                </h1>
                                <p id='desc'>~ {todo.description}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoList;
