import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSortBy } from '../features/tasks/tasksSlice';
import { Box, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterSort = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);
  const sortBy = useSelector((state) => state.tasks.sortBy);

  return (
    <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => {
          if (newFilter !== null) {
            dispatch(setFilter(newFilter));
          }
        }}
        aria-label="task filter"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
      </ToggleButtonGroup>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSort;