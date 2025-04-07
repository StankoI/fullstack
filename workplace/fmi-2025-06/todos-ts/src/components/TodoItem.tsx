// import React from "react";
import { Todo, TodoStatus } from "../model/todo";
import './TodoItem.css';

type Props = {
    todo: Todo;
    changeStatus: (status: TodoStatus) => void
}

const TodoItem = ({todo, changeStatus}: Props) => {
    return(
        <div className="TodoItem-card">
        <div key ={todo.id} className="content">{todo.id}: {todo.text}[{TodoStatus[todo.status]}]</div>
        <div key ={todo.id} className="buttons">
            <button className="button" onClick={() => changeStatus(TodoStatus.COMPLETED)}>Complete</button>
        </div>
        </div>

    )
}

export default TodoItem