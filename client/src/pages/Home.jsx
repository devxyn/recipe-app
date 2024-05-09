import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Home = () => {
  return (
    <div className='h-screen'>
      <Navbar />
      <main className='h-full border'>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
