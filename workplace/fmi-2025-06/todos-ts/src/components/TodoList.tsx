import { IdType } from '../common/common-types';
import { Todo } from '../model/todo'
import TodoItem from './TodoItem'

type Props = {
    todos: Todo[];
    changeStatus: (Todo: Todo) => void;
    onRemoveTodo: (id: IdType) => void;
}

const TodoList = ({ todos, ...rest }: Props) => {
    return (
        <>
        {todos.map(todo => (<TodoItem key={todo.id} todo={todo} {...rest} />))}
        </>
    )
}

export default TodoList