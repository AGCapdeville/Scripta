import { Link } from 'react-router-dom';

export const Home = () => {
  
  // While developing.
  // localStorage.clear(); // Clear local storage for testing purposes  
  return (
    <div>
      <p>Select a game:</p>
      <div className='w:100vw h:100vh flex'>
        <Link to="/scripta/daily">Daily Word</Link>
      </div>
    </div>
  );
}