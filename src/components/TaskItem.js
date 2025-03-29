import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleComplete, updateTask } from '../features/tasks/tasksSlice';
import { Card, CardContent, Typography, IconButton, Box, TextField, MenuItem, Chip } from '@mui/material';
import { Delete, Edit, Save, Cancel, DragIndicator } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const TaskItem = ({ task, provided }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    dispatch(updateTask(editedTask));
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'success',
      medium: 'warning',
      high: 'error'
    };
    return colors[priority] || 'default';
  };

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      sx={{ mb: 2, opacity: task.completed ? 0.7 : 1 }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <div {...provided.dragHandleProps}>
            <DragIndicator sx={{ mr: 1, cursor: 'move' }} />
          </div>
          
          {isEditing ? (
            <Box sx={{ width: '100%' }}>
              <TextField
                fullWidth
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                margin="dense"
              />
              <TextField
                select
                fullWidth
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                margin="dense"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
              <TextField
                type="date"
                fullWidth
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                margin="dense"
                InputLabelProps={{ shrink: true }}
              />
              <Box sx={{ mt: 1 }}>
                <IconButton onClick={handleSave} color="primary">
                  <Save />
                </IconButton>
                <IconButton onClick={() => setIsEditing(false)} color="error">
                  <Cancel />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography
                  variant="h6"
                  sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.title}
                </Typography>
                <Box>
                  <IconButton onClick={() => dispatch(toggleComplete(task.id))}>
                    {task.completed ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
                  </IconButton>
                  <IconButton onClick={() => setIsEditing(true)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => dispatch(deleteTask(task.id))} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                {task.description}
              </Typography>
              <Box sx={{ mt: 2 }} display="flex" gap={1}>
                <Chip
                  label={task.priority}
                  color={getPriorityColor(task.priority)}
                  size="small"
                />
                {task.dueDate && (
                  <Chip
                    label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                    size="small"
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;