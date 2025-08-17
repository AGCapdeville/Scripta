import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <Link to="/scripta">Home</Link>
      <Link to="/scripta/record">Record</Link>
    </nav>
  );
}
