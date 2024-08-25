import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaRegCheckSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './TaskTracker.css';

const TaskTracker = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [newTask, setTask] = useState('');
    const [newDesc, setDesc] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const handleAdd = () => {
        const newTaskItem = {
            id: Date.now(),
            task: newTask,
            description: newDesc,
            date: startDate,
            time: startTime,
            completed: false,
        };

        setAllTasks([...allTasks, newTaskItem]);
        setTask('');
        setDesc('');
    };

    const handleEdit = (index) => {
        const taskToEdit = allTasks[index];
        setTask(taskToEdit.task);
        setDesc(taskToEdit.description);
        setStartDate(taskToEdit.date);
        setStartTime(taskToEdit.time);
        setEditIndex(index);
    };

    const handleUpdate = () => {
        const updatedTask = {
            ...allTasks[editIndex],
            task: newTask,
            description: newDesc,
            date: startDate,
            time: startTime,
        };

        const updatedTasks = allTasks.map((task, index) =>
            index === editIndex ? updatedTask : task
        );

        setAllTasks(updatedTasks);
        setTask('');
        setDesc('');
        setEditIndex(null);
    };

    const handleDelete = (id) => {
        const updatedTasks = allTasks.filter((task) => task.id !== id);
        setAllTasks(updatedTasks);
    };

    const handleToggleComplete = (id) => {
        const updatedTasks = allTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setAllTasks(updatedTasks);
    };

    return (
        <div className="container mt-5">
            {/* Task Input Form */}
            <div className="card p-4 mb-4 shadow-lg">
                <h3 className="mb-4" style={{color:'white', textAlign:'center'}}>Task Tracker</h3>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Task Name"
                            value={newTask}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Task Description"
                            value={newDesc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="form-control"
                            dateFormat="yyyy/MM/dd"
                        />
                    </div>
                    <div className="col">
                        <DatePicker
                            selected={startTime}
                            onChange={(time) => setStartTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className="form-control"
                        />
                    </div>
                </div>

                {editIndex !== null ? (
                    <button
                        className="btn btn-warning w-100"
                        onClick={handleUpdate}
                    >
                        Update Task
                    </button>
                ) : (
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleAdd}
                    >
                        Add Task
                    </button>
                )}
            </div>

            {/* Task Filter Buttons */}
            <div className="d-flex justify-content-center mb-4">
                <button
                    className={`btn me-2 ${!isCompleteScreen ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setIsCompleteScreen(false)}
                >
                    Tasks Remaining
                </button>
                <button
                    className={`btn ${isCompleteScreen ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setIsCompleteScreen(true)}
                >
                    Completed Tasks
                </button>
            </div>

            {/* Task List */}
            <div className="list-group">
                {allTasks
                    .filter((task) => task.completed === isCompleteScreen)
                    .map((task, index) => (
                        <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center" style={{backgroundColor:'rgb(103, 169, 220)'}}>
                            <div>
                                <h5 className={task.completed ? 'text-decoration-line-through' : ''} style={{color:'white'}}>
                                    {task.task}
                                </h5>
                                <p style={{color:'white'}}>{task.description}</p>
                                <small>
                                    {task.date.toLocaleDateString()} - {task.time.toLocaleTimeString()}
                                </small>
                            </div>
                            <div className="btn-group">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => handleEdit(index)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={() => handleToggleComplete(task.id)}
                                >
                                    <FaRegCheckSquare />
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TaskTracker;
