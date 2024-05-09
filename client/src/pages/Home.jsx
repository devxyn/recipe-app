import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Home = () => {
  return (
    <div className='h-full'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
