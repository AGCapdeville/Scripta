import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/scripta">Home</Link>
      <Link to="/scripta/record">Record</Link>
    </nav>
  );
}

export default Navbar;
