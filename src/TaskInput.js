import React, { useState } from 'react';
import './css/TodoList.css'

const TaskInput = ({ addTask, handleFilter }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim() === "") return;
        addTask(userInput);
        setUserInput("");
    }
    return (
        <div>
            <form id='newTodoForm' onSubmit={handleSubmit}>
                <input value={userInput} type="text" onChange={handleChange} autoFocus required placeholder="Enter task..."/>
            </form>
            <div className='todo_buttons'>
                <input type='submit' form='newTodoForm' className="form-btn" value='Submit'/>
                <button className="form-btn" onClick={handleFilter}>Delete</button>
            </div>
        </div>
    );
};

export default TaskInput;