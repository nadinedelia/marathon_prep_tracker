import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const apiBaseUrl = process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:8080';
    const signupUrl = `${apiBaseUrl}/api/auth/signup`;

    try {
      const response = await axios.post(signupUrl, formData);

<<<<<<< HEAD
        if (response.data === 'User registered successfully!') {
            console.log('User registered successfully');
            onSignup(formData.username);
        } else {
            setError(response.data);
        }
=======
      if (response.data === 'User registered successfully!') {
        console.log('User registered successfully');
        onSignup(formData.username); 
      } else {
        // This assumes the server responds with a plain text error message
        setError(response.data);
      }
>>>>>>> s4-arch-pipeline-split
    } catch (error) {
      console.error('Error during registration', error);
      
      // Extracting error message from server response or using a default error message
      const errorMessage = error.response?.data?.error || error.response?.data || 'An error occurred during registration. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
          Signup
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
