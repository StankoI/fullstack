import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/ToDoList'
import { Todo } from './model/todo'

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() =>{
        setTodos([
            new Todo('Create Todo App component'),
            new Todo('Create Todo App component'),
            new Todo('Create Todo App component'),
            new Todo('Create Todo App component')
        ])
    },[])


    return (
        <>
            <h1>React TODOS Typescript Demo</h1>
            <TodoList todos={todos} />
        </>
    )
}

export default App