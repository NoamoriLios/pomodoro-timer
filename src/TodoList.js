import React from 'react';
import './css/TodoList.css'
import TaskElement from './TaskElement';

const TodoList = ({toDoList, handleToggle, handleFilter}) => {

    return (
        <div className='todo_elements'>
            {toDoList.map(todo => {
                return (
                    <TaskElement key={todo.id + todo.task} todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
        </div>
    );
};

export default TodoList;