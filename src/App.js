import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterSort from './components/FilterSort';

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Task Manager
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <TaskForm />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <FilterSort />
          <TaskList />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;