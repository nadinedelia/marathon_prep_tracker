import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Container, Paper, Alert, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../App.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/auth/login`, { username, password });
      if (response.status === 200) {
        onLogin(username);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <Container maxWidth="sm" className="app-container">
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          className="gradient-button"
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>
      </form>
      <Typography sx={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/signup">
          Sign up
        </Link>
      </Typography>
    </Container >
  );
};

export default Login;
