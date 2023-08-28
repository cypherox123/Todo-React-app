import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Container, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, addTask } from '../Redux/taskReducer'; // Import editTask action
import { initialTasks } from '../Data';
import { v4 as uuidv4 } from 'uuid'

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.date().required('Due Date is required'),
  status: Yup.string().required('Status is required'),
});

const TaskForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const tasks = useSelector(state => state.tasks); // Get tasks from Redux store

  const idFromURL = location.pathname.split('/').pop();
  const taskToEdit = tasks[idFromURL]; // Get task details for editing

  const initialValues = taskToEdit
    ? { ...taskToEdit }
    : {
        title: '',
        description: '',
        dueDate: '',
        status: 'To Do',
        id: uuidv4(),
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (taskToEdit) {
        dispatch(editTask(values)); // Dispatch the editTask action
      } else {
        dispatch(addTask(values));
      }
      navigate('/');
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">{taskToEdit ? 'Edit Task' : 'Create Task'}</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={3}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
        />
        <TextField
          fullWidth
          id="dueDate"
          name="dueDate"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dueDate}
          error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
          margin="normal"
        />
        <FormControl fullWidth>
          <Select
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            error={formik.touched.status && Boolean(formik.errors.status)}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
          {taskToEdit ? 'Save Changes' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
