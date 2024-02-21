import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import config from '../config';
import '../App.css';

const Statistics = ({ currentUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${config.apiUrl}/stats/${currentUser}`;

    axios.get(url)
      .then(response => {
        setData(response.data.stats);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [currentUser]);

  const currentUserData = data.find(item => item.username === currentUser);

  return (
    <Container maxWidth="sm" className="app-container">
      <Typography variant="h5" gutterBottom>
        Total Effort since starting the programme
      </Typography>
      {currentUserData ? (
        <List>
          {currentUserData.exercises.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={item.exerciseType}
                secondary={`Total Duration: ${item.totalDuration} min`}
                tertiary={`Total Distance: ${item.totalDistance} min`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1">No data available</Typography>
      )}
    </Container>
  );
};

export default Statistics;
