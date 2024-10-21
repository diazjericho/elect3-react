import React, { useState } from 'react';
import './TaskScheduler.css';

function TaskScheduler() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="task-scheduler">
            <h1>Task Scheduler</h1>
            <div className="input-group">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a task"
                    className="form-control"
                />
            </div>
            <button onClick={addTask} className="button">
                Add Task
            </button>
            <ul className="list-group">
                {tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {task}
                        <button onClick={() => deleteTask(index)} className="btn btn-danger btn-sm">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskScheduler;
