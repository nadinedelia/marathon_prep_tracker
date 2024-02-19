import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Alert, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../App.css';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${config.apiUrl}/auth/signup`, formData);
      if (response.data === 'User registered successfully!') {
        onSignup(formData.username);
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="app-container">
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Sign Up</Typography>
      <form onSubmit={handleSignup}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <Button
          variant="contained"
          type="submit"
          className="gradient-button"
          style={{ marginTop: '20px' }}
        >
          Sign up
        </Button>
      </form>
      <Typography sx={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </Typography>
    </Container>
  );
};

export default Signup;
