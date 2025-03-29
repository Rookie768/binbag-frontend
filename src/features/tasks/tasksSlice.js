import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const initialState = {
  tasks: loadTasksFromStorage(),
  filter: 'all',
  sortBy: 'date'
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    reorderTasks: (state, action) => {
      const { source, destination } = action.payload;
      const tasks = Array.from(state.tasks);
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
});

export const { 
  addTask, 
  deleteTask, 
  toggleComplete, 
  updateTask, 
  setFilter, 
  setSortBy,
  reorderTasks 
} = tasksSlice.actions;

export default tasksSlice.reducer;