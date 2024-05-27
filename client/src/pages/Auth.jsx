import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='flex flex-col md:flex-row w-full p-5 md:p-32 justify-center items-center gap-5 md:gap-10'>
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies('access_token');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://recipe-app-server-three.vercel.app/api/auth/login', {
        username,
        password,
      });
      alert(response.data.message);

      setCookies('access_token', response.data.token);
      window.localStorage.setItem('userID', response.data.userID);
      navigate('/');
    } catch (e) {
      console.error(e);
      alert(e.response.data.message);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={'Login'}
      onSubmit={handleSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://recipe-app-server-three.vercel.app/api/auth/register', { username, password });
      alert('Registration successfully');
    } catch (e) {
      console.error(e);
      alert(e.response.data.message);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={'Register'}
      onSubmit={handleSubmit}
    />
  );
};

// eslint-disable-next-line react/prop-types
const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <form
      className='flex flex-col items-center justify-center w-full md:w-1/2 gap-4 py-10 border border-black rounded-2xl'
      onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>{label}</h2>
      <div className='flex flex-col gap-1 w-3/4'>
        <label className='text-xl' htmlFor={`${label}-username`}>
          Username:
        </label>
        <input
          className='border border-black px-4 py-3 rounded-2xl'
          type='text'
          name={`${label}-username`}
          id={`${label}-username`}
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-1 w-3/4'>
        <label className='text-xl' htmlFor={`${label}-password`}>
          Password:
        </label>
        <input
          className='border border-black px-4 py-3 rounded-2xl'
          type='password'
          name={`${label}-password`}
          id={`${label}-password`}
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='bg-black text-white px-6 py-3 text-xl font-semibold rounded-3xl active:border active:border-black active:bg-white active:text-black'
        type='Submit'>
        Submit
      </button>
    </form>
  );
};
