import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Home;
