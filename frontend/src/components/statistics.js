import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5000/stats'; 

    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []); // Empty dependency array means this useEffect runs once when component mounts

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <p key={index}>{JSON.stringify(item)}</p>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Statistics;
