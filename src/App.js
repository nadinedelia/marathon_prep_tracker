import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from './components/createUser';
import TrackExercise from './components/trackExercise';
import React, { useState, useEffect } from 'react';

function App() {
  const [activeWindowCounter, setActiveWindowCounter] = useState(0);
  const [textUnderNavigationArrows, setTextUnderNavigationArrows] = useState(['','']);

  const handleNavigation = () => {
    if (activeWindowCounter === 0) {
      setActiveWindowCounter(1);
    } else {
      setActiveWindowCounter(0);
    }
  };
  
  useEffect(() => {
    setTextUnderNavigationArrows(
      activeWindowCounter === 0 ? ['','Track Exercise'] : ['Create User','']
    );
  }, [activeWindowCounter]);

  return (
    <div className="App">
        <div className="appTitle">
          <h1>CFG Fitness App</h1>
        </div>

        <div className="navigationArrowsContainer">
          <button onClick={handleNavigation} className="navigationButton">
            {textUnderNavigationArrows[activeWindowCounter === 0 ? 1 : 0]}
          </button>
        </div>

        <div className="componentContainer">
          <CreateUser className={activeWindowCounter === 0 ? 'activeWindow' : 'hiddenWindow'}/>
          <TrackExercise className={activeWindowCounter === 1 ? 'activeWindow' : 'hiddenWindow'}/>
        </div>
    </div>
  );
}

export default App;
