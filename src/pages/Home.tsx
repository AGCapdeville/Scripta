import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Scripta</h1>
      <p>Select a game:</p>
      <Link to="/Daily">Daily Word</Link>
    </div>
  );
}