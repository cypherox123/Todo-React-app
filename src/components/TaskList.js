import React, { useState } from 'react';
import {
  TableContainer,
  Paper,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteTask } from '../Redux/taskReducer';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableHead, TableBody, Table } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState('All'); 

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = Object.values(tasks).filter((task) => {
    if (statusFilter === 'All') {
      return true;
    }
    return task.status === statusFilter;
  });

  return (
    <div>
      <h1>Task List</h1>
      <FormControl>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={5}>No data found</StyledTableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <StyledTableRow key={task.id}>
                  <StyledTableCell>{task.title}</StyledTableCell>
                  <StyledTableCell>{task.description}</StyledTableCell>
                  <StyledTableCell>{task.status}</StyledTableCell>
                  <StyledTableCell>{task.dueDate}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => handleEdit(task.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      component={Link}
                      to={`/view/${task.id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
