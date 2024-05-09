import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies('access_token', '');
    window.localStorage.clear();
    navigate('/auth');
  };

  return (
    <nav>
      <Link to='/'>Home</Link>

      {!cookies.access_token ? (
        <Link to='/auth'>Login / Register</Link>
      ) : (
        <>
          <Link to='/create-recipe'>Create Recipe</Link>
          <Link to='/saved-recipes'>Saved Recipes</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
