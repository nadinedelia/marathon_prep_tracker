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

    // Here you would typically send the exercise data to your API
    console.log('Exercise submitted:', state);

    // Clear the form fields
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
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text" 
            required 
            value={state.username} 
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control 
            type="text" 
            required 
            value={state.description} 
            onChange={(e) => setState({ ...state, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="duration">
          <Form.Label>Duration (in minutes):</Form.Label>
          <Form.Control 
            type="number" 
            required 
            value={state.duration} 
            onChange={(e) => setState({ ...state, duration: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save activity
        </Button>
      </Form>
    </div>
  );
};

export default TrackExercise;
