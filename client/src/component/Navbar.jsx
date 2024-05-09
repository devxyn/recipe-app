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
    <nav className='h-20 bg-black flex justify-center items-center gap-4'>
      <Link className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white' to='/'>
        Home
      </Link>

      {!cookies.access_token ? (
        <Link className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white' to='/auth'>
          Login / Register
        </Link>
      ) : (
        <>
          <Link className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white' to='/create-recipe'>
            Create Recipe
          </Link>
          <Link className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white' to='/saved-recipes'>
            Saved Recipes
          </Link>
          <button
            className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white '
            onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
