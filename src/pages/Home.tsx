import { Link } from 'react-router-dom';

export const Home = () => {
  
  // While developing.
  // localStorage.clear(); // Clear local storage for testing purposes  
  return (
    <div>
      <h1>Scripta V:1.0.0 </h1>
      <p>Select a game:</p>
      <Link to="/scripta/daily">Daily Word</Link>
    </div>
  );
}