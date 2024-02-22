import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Container, Paper, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import dayjs from 'dayjs'; 
import { createActivity } from '../api'; 
import './activity.css';

const CreateActivity = ({ currentUser }) => {
  const [state, setState] = useState({
    exerciseType: '',
    description: '',
    duration: 0,
    date: dayjs(), 
    distance: 0,
  });
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      username: currentUser,
      ...state,
      date: state.date.format('YYYY-MM-DD'),
    };

    try {
      const response = await createActivity(dataToSubmit);
      setState({
        exerciseType: '',
        description: '',
        duration: 0,
        date: dayjs(),
        distance: 0,
      });
      setMessage('Activity logged successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('There was an error logging your activity!', error);
    }
  };

  return (
    <div className="app-container">
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Log New Activity</Typography>
      <form onSubmit={onSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Activity Date"
            value={state.date}
            onChange={(newValue) => setState({ ...state, date: newValue })}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <br />
        <Typography variant="p" style={{ marginBottom: '10px' }}>Outdoor or Indoor Run?</Typography>
        <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
          <Grid item>
            <IconButton color={state.exerciseType === 'Outdoor Run' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Outdoor Run' })}>
              <DirectionsRunIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color={state.exerciseType === 'Indoor Run' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Indoor Run' })}>
              <FitnessCenterIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <TextField
          label="Description"
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
        />
        <TextField
          label="Duration (in minutes)"
          type="number"
          fullWidth
          margin="normal"
          required
          value={state.duration}
          onChange={(e) => setState({ ...state, duration: e.target.value })}
        />
        <TextField
          label="Distance (in km)"
          type="number"
          fullWidth
          margin="normal"
          required
          value={state.distance}
          onChange={(e) => setState({ ...state, distance: e.target.value })}
        />
        <Button
          variant="contained"
          type="submit"
          className="gradient-button"
          style={{ marginTop: '20px' }}
        >
          Save Activity
        </Button>
      </form>
      {message && <Typography color="success.main" style={{ marginTop: '20px' }}>{message}</Typography>}
    </div>
  );
};

export default CreateActivity;
