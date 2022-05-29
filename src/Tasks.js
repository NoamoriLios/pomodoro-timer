import {useEffect, useState} from "react";
import TodoList from "./TodoList";
import TaskInput from "./TaskInput";
import tasks from "./todos.json"
import './css/TodoList.css'

function Tasks() {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) :  tasks;
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const handleToggle = (id) => {
        let mapped = todos.map(task => {
            return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
        });
        setTodos(mapped);
    }

    const handleFilter = () => {
        let filtered = todos.filter(task => {
            return !task.complete;
        });
        setTodos(filtered);
    }

    const addTask = (userInput) => {
        let copy = [...todos];
        copy = [...copy, { id: todos.length + 1, task: userInput, complete: false }];
        setTodos(copy);
    }

    return (
        <div className='task_list'>
            <h1>Your tasks: </h1>
            <TodoList toDoList = {todos} handleToggle={handleToggle} handleFilter={handleFilter}/>
            <TaskInput addTask={addTask} handleFilter={handleFilter}/>
        </div>
    );
}

export default Tasks;