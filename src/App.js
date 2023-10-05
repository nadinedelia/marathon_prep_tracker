import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from './components/createUser';
import TrackExercise from './components/trackExercise';
import React, { useState, useEffect } from 'react';

function App() {
  const [activeWindowCounter, setActiveWindowCounter] = useState(1); 
  const [textUnderNavigationArrows, setTextUnderNavigationArrows] = useState(['Create User', '']);

  const handleNavigation = () => {
    setActiveWindowCounter((prev) => 1 - prev); // toggles between 0 and 1
  };

  useEffect(() => {
    setTextUnderNavigationArrows(
      activeWindowCounter === 1 ? ['Create User', ''] : ['Track Exercise', '']
    );
  }, [activeWindowCounter]);

  return (
    <div className="App">
      <div className="appTitle">
        <h1>CFG Fitness App</h1>
      </div>

      <div className="navigationArrowsContainer">
        <button onClick={handleNavigation} className="navigationButton">
          {textUnderNavigationArrows[0]}
        </button>
      </div>

      <div className="componentContainer">
        {activeWindowCounter === 0 && <CreateUser />}
        {activeWindowCounter === 1 && <TrackExercise />}
      </div>
    </div>
  );
}

export default App;

