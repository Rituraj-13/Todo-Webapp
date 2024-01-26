import React, { useEffect, useState } from 'react';
import './createTodo.css'
const backend_url = "https://todo-webapp-bise.onrender.com"
function CreateTodo({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [increaseCount, setIncreaseCount] = useState(0);

  const handleAddTodo = () => {
    if (!(title || description)) {
      alert("Please fill the details")
      return
    }
    else {
      fetch(`${backend_url}/create`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("TODO creation failed");
          }
        })
        .then((json) => {
          setIncreaseCount(increaseCount + 1);
          onTodoAdded();
          // Notify parent component about the new todo added
          alert("TODO Created !");
        })
        .catch((error) => {
          console.error("Error creating TODO:", error);
        });
    }
  };

  return (
    <>
      <div className='outerDiv border-2 border-black p-8 w-1/3 h-1/2 flex justify-center items-center'>
        <div className='innerDiv justify-center w-[90%]'>
          <h1 id='task_title'>Task Title</h1>
          <input
            type="text"
            placeholder='Enter title'
            className='border-2 p-1.5 border-black rounded-md w-full'
            onChange={(e) => setTitle(e.target.value)}
            id='task_input'
          />
          <br />
          <br />
          <h1 id='task_desc'>Task Description</h1>
          <input
            type="text"
            placeholder='Enter Description'
            className='border-2 p-1.5 border-black rounded-md w-full'
            onChange={(e) => setDescription(e.target.value)}
            id='desc_input'
          />
          <br />
          <br />
          <div className="buttonDiv h-full w-full justify-center items-center flex">
            <button
              className='border-2 border-black p-2 w-[35%] rounded-md'
              onClick={handleAddTodo} id='add_button'>
              Add Todo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTodo;
