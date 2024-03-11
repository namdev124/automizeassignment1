import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});

  const handleAddTask = (taskString) => {
    const [taskName, countString] = taskString.split(/\s+(\d+)$/);
    const count = countString ? parseInt(countString) : 1;

    const newTasks = Array.from({ length: count }, () => taskName);
    setTasks([...tasks, ...newTasks]);

    const updatedCounts = { ...taskCounts };
    updatedCounts[taskName] = (updatedCounts[taskName] || 0) + count;
    setTaskCounts(updatedCounts);
  };

  const handleDeleteTask = (index) => {
    const taskName = tasks[index];
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    const updatedCounts = { ...taskCounts };
    updatedCounts[taskName]--;
    if (updatedCounts[taskName] <= 0) {
      delete updatedCounts[taskName];
    }
    setTaskCounts(updatedCounts);
  };

  const handleAddTodoButtonClick = () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim()) {
      handleAddTask(taskInput.value.trim());
      taskInput.value = '';
    }
  };

  return (
    <div className="App">
      <h1 className='heading'>Day Goals!</h1>
      <div className='something'>
        <input
          id="taskInput"
          type="text"
          placeholder="Add a todo"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              handleAddTask(e.target.value.trim());
              e.target.value = '';
            }
          }}
        />
        <br/>
        <button className= "addtodo-button" onClick={handleAddTodoButtonClick}>Add Todo</button>
      </div>
      <ul type='none' className="updated-words">
          {tasks.map((task, index) => (
            <li className='name' key={index}> {task} {taskCounts[task] && <span className='updated-count'> (Updated {taskCounts[task]} times)</span>}
            <button className="edit-button"><FontAwesomeIcon icon={faPencilAlt} /></button>
              <button className='del-icon' onClick={() => handleDeleteTask(index)}>
              <FontAwesomeIcon icon={faTimes} />

              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App;
