import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='h-full flex flex-row justify-center items-center gap-10'>
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
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
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
      await axios.post('http://localhost:3000/api/auth/register', { username, password });
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
    <div>
      <form className='flex flex-col justify-center items-center' onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div>
          <label htmlFor={`${label}-username`}>Username:</label>
          <input
            className='border border-black'
            type='text'
            name={`${label}-username`}
            id={`${label}-username`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${label}-password`}>Password:</label>
          <input
            className='border border-black'
            type='password'
            name={`${label}-password`}
            id={`${label}-password`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='border border-black' type='Submit'>
          Submit
        </button>
      </form>
    </div>
  );
};
