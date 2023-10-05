import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as api from '../api';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState(''); 

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
        await api.createUser({ username });
        console.log('User added successfully:', username);
        setMessage(`User ${username} has been created successfully!`); 
        setTimeout(() => setMessage(''), 2000); 
    } catch (error) {
        console.error('There was an error adding the user!', error);
        setMessage(''); 
    }

    setUsername('');
  };

  return (
    <div>
      <h3>Create New User</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create User
        </Button>
      </Form>
      {message && <p className="success-message">{message}</p>} 
    </div>
  );
};

export default CreateUser;
