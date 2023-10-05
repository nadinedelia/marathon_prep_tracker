import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const TrackExercise = () => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    // tbc API
    console.log('Exercise submitted:', state);

    setState({
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
    });
  };

  return (
    <div>
      <h3>Track exercise</h3>
      <Form onSubmit={onSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <Form.Group controlId="username" style={{ marginBottom: '20px' }}>
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text" 
            required 
            value={state.username} 
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="description" style={{ marginBottom: '20px' }}>
          <Form.Label>Description:</Form.Label>
          <Form.Control 
            type="text" 
            required 
            value={state.description} 
            onChange={(e) => setState({ ...state, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="duration" style={{ marginBottom: '40px' }}>
          <Form.Label>Duration (in minutes):</Form.Label>
          <Form.Control 
            type="number" 
            required 
            value={state.duration} 
            onChange={(e) => setState({ ...state, duration: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Save activity
        </Button>
      </Form>
    </div>
  );
};

export default TrackExercise;
