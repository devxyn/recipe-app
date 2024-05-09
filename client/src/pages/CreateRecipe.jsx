import { useState } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CreateRecipe = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(['access_token']);
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipe({ ...recipe, [name]: value });
  };

  const handleingredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;

    setRecipe({ ...recipe, ingredients });
  };

  const addingredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/recipe/add', recipe, {
        headers: { Authorization: cookies.access_token },
      });
      alert('Recipe created!');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col'>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3 border'>
          <label htmlFor='name'>Name:</label>
          <input className='border border-black' type='text' name='name' id='name' onChange={handleChange} required />
        </div>
        <div className='flex flex-col gap-3 border'>
          <label htmlFor='ingredient'>ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              className='border border-black'
              type='text'
              name='ingredient'
              id='ingredient'
              value={ingredient}
              onChange={(e) => handleingredientChange(e, index)}
              required
            />
          ))}
          <button type='button' className='border border-black' onClick={addingredient}>
            Add ingredient
          </button>
        </div>
        <div className='flex flex-col gap-3 border'>
          <label htmlFor='instructions'>Instructions:</label>
          <textarea
            className='border border-black'
            name='instructions'
            id='instructions'
            onChange={handleChange}></textarea>
        </div>
        <div className='flex flex-col gap-3 border'>
          <label htmlFor='imageUrl'>Image URL:</label>
          <input
            className='border border-black'
            type='text'
            name='imageUrl'
            id='imageUrl'
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col gap-3 border'>
          <label htmlFor='cookingTime'>Cooking Time (minutes):</label>
          <input
            className='border border-black'
            type='number'
            name='cookingTime'
            id='cookingTime'
            onChange={handleChange}
            required
          />
        </div>
        <button className='w-full border border-black' type='submit'>
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
