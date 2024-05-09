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
    ingredients: [''],
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
      await axios.post('https://recipe-app-iege.onrender.com/api/recipe/add', recipe, {
        headers: { Authorization: cookies.access_token },
      });
      alert('Recipe created!');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='w-full p-5 flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold text-center'>Create Recipe</h2>
      <form className='w-full md:w-1/2 flex flex-col items-center gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 w-full'>
          <label className='text-xl font-semibold' htmlFor='name'>
            Name:
          </label>
          <input
            className='border border-black px-4 py-3 rounded-2xl'
            type='text'
            name='name'
            id='name'
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col items-center gap-2 w-full'>
          <label className='text-xl font-semibold' htmlFor='ingredient'>
            Ingredients:
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              className='border border-black px-4 py-3 rounded-2xl w-full'
              type='text'
              name='ingredient'
              id='ingredient'
              value={ingredient}
              onChange={(e) => handleingredientChange(e, index)}
              required
            />
          ))}
          <button
            className='md:w-2/6 bg-black text-white px-6 py-3 text-xl font-semibold rounded-3xl active:border active:border-black active:bg-white active:text-black'
            type='button'
            onClick={addingredient}>
            Add ingredient
          </button>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <label className='text-xl font-semibold' htmlFor='instructions'>
            Instructions:
          </label>
          <textarea
            className='border border-black px-4 py-3 rounded-2xl'
            name='instructions'
            id='instructions'
            onChange={handleChange}></textarea>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <label className='text-xl font-semibold' htmlFor='imageUrl'>
            Image URL:
          </label>
          <input
            className='border border-black px-4 py-3 rounded-2xl'
            type='text'
            name='imageUrl'
            id='imageUrl'
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <label className='text-xl font-semibold' htmlFor='cookingTime'>
            Cooking Time (minutes):
          </label>
          <input
            className='border border-black px-4 py-3 rounded-2xl'
            type='number'
            name='cookingTime'
            id='cookingTime'
            onChange={handleChange}
            required
          />
        </div>
        <button
          className='w-full md:w-2/6 bg-black text-white px-6 py-3 text-xl font-semibold rounded-3xl active:border active:border-black active:bg-white active:text-black'
          type='submit'>
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
