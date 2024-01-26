import { useState } from 'react'
import CreateTodo from '/src/components/CreateTodo.jsx';
import ShowTodo from '/src/components/ShowTodo.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ShowTodo></ShowTodo>
    </>
  )
}

export default App
