import { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import './index.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setId] = useState(null)
  const [showFinished, setshowFinished] = useState(false)
  const inputRef = useRef(null)
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  
  const handleEdit = (id) => {
    const t = todos.find(item => item.id === id)
    setTodo(t.todo)
    setId(id)
    inputRef.current.focus()
    
  }

  const handleAdd = () => {
    if(!todo) return
    if (editId) {
      const updated = todos.map((item) => (
        item.id === editId ? { ...item, todo} : item
      ))

      setTodos(updated)
      setId(null)
    }
    else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("");

  }

  const handleDelete = (id) => {
    const newtodos = todos.filter((item) => item.id !== id)
    setTodos(newtodos)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    const updatedtodos = todos.map((item) => {
      if (item.id == id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item

    })
    setTodos(updatedtodos)
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }
  



  return (
    <>
      <Navbar />
      <div className="container bg-slate-500 mx-auto my-3 rounded-xl p-2 min-h-[90vh]">
        <h1 className='font-semibold text-xl'>Your Tasks</h1>
        <div className="addTodo rounded-xl">
          <h2 >Add a Todo</h2>
          <input ref={inputRef} onChange={handleChange} value={todo} className='bg-white rounded-sm m-auto min-w-[80vw] my-2' type="text" />
          <button onClick={handleAdd} className='mx-3 bg-cyan-600 px-2 rounded-lg text-white hover:bg-cyan-700 transition-all'>{editId ? "Save" : "Add"}</button>
        </div>
        <h2 >Your Todos</h2>
        <div className="h-1 bg-gray-700 rounded-2xl my-2"></div>
        {todos.length === 0 && <div>No todos yet common do something</div>}
        {todos.length !== 0 &&
        <label className='flex gap-1'>
          <input type='checkbox' checked={showFinished} onChange={toggleFinished}/>
          ShowFinished
        </label>}
        {
          todos.map((item) => (
            (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex bg-slate-400 my-2 rounded-xl p-2 justify-between">
              <input className='cursor-pointer' name={item.id} type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through w-screen wrap-anywhere ml-1.5" : "w-screen wrap-anywhere ml-1.5"}>{item.todo}</div>
              <div className='buttons flex'>
                <button onClick={() => handleEdit(item.id)} className='mx-3 h-8 bg-cyan-600 px-2 rounded-lg text-white hover:font-semibold hover:bg-cyan-700 transition-all:'><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)} className='mx-3 h-8 bg-cyan-600 px-2 rounded-lg text-white hover:font-semibold hover:bg-cyan-700 transition-all'><MdDelete/></button>
              </div>
            </div>
          )
          )
        }
      </div>
    </>
  )
}

export default App
