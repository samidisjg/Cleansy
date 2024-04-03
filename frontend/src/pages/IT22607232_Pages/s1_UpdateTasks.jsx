import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/taskAssign/all');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (TaskID) => {
    try {
      await axios.delete(`/api/taskAssign/delete/${TaskID}`);
      setTasks(tasks.filter(task => task.TaskID !== TaskID));
      navigate('/dashboard?tab=maintenance'); // Redirect to dashboard maintenance tab
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async (TaskID) => {
    // Implement the update functionality
    // You can redirect to a new page or display a modal for updating the task
    console.log('Update task with ID:', TaskID);
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <p>Task ID: {task.TaskID}</p>
            <p>Category: {task.Category}</p>
            <p>Name: {task.Name}</p>
            <p>Description: {task.Description}</p>
            <p>WorkGroupID: {task.WorkGroupID}</p>
            <p>Date: {task.Date}</p>
            <p>Location: {task.Location}</p>
            <p>Duration: {task.DurationDays}</p>
            <button onClick={() => handleDelete(task.TaskID)}>Delete</button>
            <button onClick={() => handleUpdate(task.TaskID)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
