import { Link } from 'react-router-dom';

import { loadPlayerData } from '../utility/UserData';

export const Home = () => {
  
  // While developing.
  localStorage.clear(); // Clear local storage for testing purposes
  
  loadPlayerData();
  
  return (
    <div>
      <h1>Scripta</h1>
      <p>Select a game:</p>
      <Link to="/scripta/daily">Daily Word</Link>
    </div>
  );
}