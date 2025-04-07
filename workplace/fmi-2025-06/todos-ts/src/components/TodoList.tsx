
import { Todo, TodoStatus } from '../model/todo';
import TodoItem from './TodoItem';



type Props = {
    todos: Todo[]
}

const TodoList = ({todos, ...rest}: Props) => {
    return (
       todos.map(todo => (<TodoItem key ={todo.id} todo={todo} changeStatus = {() => ({})}></TodoItem>))
    )
}



export default TodoList