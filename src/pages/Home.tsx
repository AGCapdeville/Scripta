import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Scripta</h1>
      <p>Select a game:</p>
      <Link to="/scripta/daily">Daily Word</Link>
    </div>
  );
}