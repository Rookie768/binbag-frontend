import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    dispatch(addTask({
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    }));

    setTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        margin="normal"
        multiline
        rows={2}
      />
      <TextField
        select
        fullWidth
        label="Priority"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        margin="normal"
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
      <TextField
        fullWidth
        type="date"
        label="Due Date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;