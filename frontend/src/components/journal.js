import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, List, ListItem, ListItemText, Grid } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import './journal.css';
import config from '../config';

const Journal = ({ currentUser }) => {
  const [startDate, setStartDate] = useState(moment().startOf('week').toDate());
  const [endDate, setEndDate] = useState(moment().endOf('week').toDate());
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const url = `${config.apiUrl}/stats/weekly/?user=${currentUser}&start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`;
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      if (response.data.stats && Array.isArray(response.data.stats)) {
        setExercises(response.data.stats);
      } else {
        console.error('Unexpected response structure:', response.data);
        setExercises([]);
      }
    } catch (error) {
      console.error('Failed to fetch exercises', error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [currentUser, startDate, endDate]);

  const goToPreviousWeek = () => {
    setStartDate(moment(startDate).subtract(1, 'weeks').startOf('week').toDate());
    setEndDate(moment(endDate).subtract(1, 'weeks').endOf('week').toDate());
  };

  const goToNextWeek = () => {
    setStartDate(moment(startDate).add(1, 'weeks').startOf('week').toDate());
    setEndDate(moment(endDate).add(1, 'weeks').endOf('week').toDate());
  };

  return (
    <Container maxWidth="sm" className="app-container">
      <Typography variant="h5" gutterBottom>
        Weekly Exercise Journal
      </Typography>
      <div className="date-range">
        <Button className="button-small" onClick={goToPreviousWeek}>&larr; Previous</Button>
        <span>{moment(startDate).format('YYYY-MM-DD')} to {moment(endDate).format('YYYY-MM-DD')}</span>
        <Button className="button-small" onClick={goToNextWeek}>Next &rarr;</Button>
      </div>
        <ul>
      {exercises && exercises.length > 0 ? (
        exercises.map((dayData, index) => (
          <li key={index} className="exercise-journal-day">
            <strong>{moment(dayData.date).format('dddd, YYYY-MM-DD')}</strong>
            <ul>
              {dayData.exercises.map((exercise, exIndex) => (
                <li key={exIndex} className="exercise-journal-data">
                  {exercise.exerciseType} - {exercise.totalDuration} minutes
                </li>
              ))}
            </ul>
          </li>
        ))
      ) : (
        <li>No exercises found for this period.</li>
      )}
    </ul>
    </Container>
  );
};

export default Journal;