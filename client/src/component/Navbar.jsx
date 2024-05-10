import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { HiBars3, HiMiniXMark } from 'react-icons/hi2';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies('access_token', '');
    window.localStorage.clear();
    setIsOpen(false);
    navigate('/auth');
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className='hidden h-20 w-full bg-black md:flex flex-row justify-center items-center md:gap-4'>
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
      <nav
        className={`bg-black flex md:hidden ${
          isOpen ? 'h-screen fixed w-full flex-col' : 'h-20 relative flex-row'
        }  justify-center items-center`}>
        <Link className='text-white font-semibold text-2xl p-2' to='/' onClick={handleLinkClick}>
          Home
        </Link>

        {!isOpen ? (
          <HiBars3 className=' text-white absolute right-4' size={40} onClick={handleClick} />
        ) : (
          <HiMiniXMark className={`text-white absolute right-4 ${isOpen && 'top-5'}`} size={40} onClick={handleClick} />
        )}

        {isOpen && !cookies.access_token && (
          <Link
            className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white'
            to='/auth'
            onClick={handleLinkClick}>
            Login / Register
          </Link>
        )}

        {isOpen && cookies.access_token && (
          <>
            <Link
              className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white'
              to='/create-recipe'
              onClick={handleLinkClick}>
              Create Recipe
            </Link>
            <Link
              className='text-white font-semibold text-2xl p-2 hover:text-black hover:bg-white'
              to='/saved-recipes'
              onClick={handleLinkClick}>
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
    </>
  );
};

export default Navbar;
