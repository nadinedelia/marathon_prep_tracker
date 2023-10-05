import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically send the username to your API
    console.log('User submitted:', username);

    // Clear the username input field
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
    </div>
  );
};

export default CreateUser;
