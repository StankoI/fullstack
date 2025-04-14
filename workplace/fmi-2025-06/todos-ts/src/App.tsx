import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import { Todo } from './model/todo'
import TodoInput from './components/TodoInput'
import { ApiClient } from './service/api-client'
import { IdType } from './common/common-types'
import useAsyncEffect from './hook/use-async-effect'

const BASE_URL = 'http://localhost:9000'

const API = new ApiClient(BASE_URL);

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    useAsyncEffect(async () => {
        const todos = await API.findAll(Todo);
        setTodos(todos);
    },[])
    
    function updateTodo(todo: Todo) {
        setTodos(oldTodos => oldTodos.map(td => td.id === todo.id ? todo : td))
    }

    async function createTodo(todo: Todo) {
        try{
            const {id, ...dto} = todo;
            const created = await API.create(Todo,dto);
            setTodos(oldTodos => [...oldTodos, created]);
        }
        catch(err)
        {

        }
    }

    function removeTodo(id: IdType) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    return (
        <>
            <h1>React TODOS Typescript Demo</h1>
            <TodoInput onCreateTodo={createTodo} onError={() => { }} />
            <TodoList todos={todos} changeStatus={updateTodo} onRemoveTodo={removeTodo} />
        </>
    )

    //method delete 
}

export default App