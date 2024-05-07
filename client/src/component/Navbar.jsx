import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/create-recipe'>Create Recipe</Link>
      <Link to='/saved-recipe'>Saved Recipe</Link>
      <Link to='/auth'>Login / Register</Link>
    </nav>
  );
};

export default Navbar;
