import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/create" element={<TaskForm />} />
      <Route path="/edit/:id" element={<TaskForm />} />
      <Route path="/view/:id" element={<TaskDetails />} />
    </Routes>
  );
};

export default AppRoutes;
