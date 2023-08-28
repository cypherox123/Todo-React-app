// App.js
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AppRoutes from './Routes'; // Import the Routes component

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <Button component={Link} to="/create" color="inherit">
            Create Task
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ padding: '20px' }}>
        <AppRoutes /> {/* Use the AppRoutes component */}
      </Container>
    </Router>
  );
}

export default App;
