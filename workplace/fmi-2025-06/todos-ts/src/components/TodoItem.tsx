import { IdType } from '../common/common-types';
import { Todo, TodoStatus } from '../model/todo';
import './TodoItem.css';


type Props = {
    todo: Todo;
    changeStatus: (Todo: Todo) => void;
    onRemoveTodo: (id: IdType) => void;
}

const TodoItem = ({ todo, changeStatus, onRemoveTodo }: Props) => {
    function completeTodo() {
        const updatedTodo = { ...todo, status: TodoStatus.COMPLETED }; 
        changeStatus(updatedTodo);
    }

    function removeTodo(){
        onRemoveTodo(todo.id);
    }


    return (
        <div className='TodoItem-card'>
            <div className='content'>{todo.id}: {todo.text} [{TodoStatus[todo.status]}]</div>
            <div className='buttons'>
                <button className='button' onClick={completeTodo}>Complete</button>
                <button className='button' onClick={removeTodo}>Remove</button>
            </div>
        </div>
    )
}

export default TodoItem