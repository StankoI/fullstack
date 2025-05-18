import { useMemo, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import { Todo } from './model/todo'
import TodoInput from './components/TodoInput'
import { ApiClient } from './service/api-client'
import { IdType } from './common/common-types'
import useAsyncEffect from './hook/use-async-effect'
import TodoFilter, { TodoFilterType } from './components/TodoFilter'

const BASE_URL = 'http://localhost:9000'

const API = new ApiClient(BASE_URL);

function App() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [filter, setFilter] = useState<TodoFilterType>()
    const filteredTodos = useMemo(
        () => filterTodos(todos,filter),
        [todos, filter]
    )

    useAsyncEffect(async () => {
        const todos = await API.findAll(Todo);
        setTodos(todos);
    },[])
    
    async function updateTodo(todo: Todo) {

        try{
            const updated = await API.update(Todo, todo);
            setTodos(oldTodo => oldTodo.map(td => td.id === updated.id? updated: td)); 
        }
        catch(err){
            console.log(err);
        }
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

    async function removeTodo(id: IdType) {
        try{
            await API.deleteById(Todo,id);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } 
        catch(err){
            console.log(err);
        }
    }

    function filterTodos(todos: Todo[], filter: TodoFilterType){
        return todos.filter(todo => !filter || todo.status === filter)
    }

    return (
        <>
            <h1>My to do list</h1>
            <TodoInput onCreateTodo={createTodo} onError={() => { }} />
            <TodoFilter filter={filter} onFilterChange={setFilter} />
            <TodoList todos={filteredTodos} changeStatus={updateTodo} onRemoveTodo={removeTodo} />
        </>
    )

}

export default App