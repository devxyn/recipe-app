/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import useGetUserID from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const Main = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(['access_token']);

  const userID = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get('https://recipe-app-iege.onrender.com/api/recipe');
      setRecipes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSavedRecipe = async () => {
    try {
      const response = await axios.get(`https://recipe-app-iege.onrender.com/api/recipe/saved-recipes/ids/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        'https://recipe-app-iege.onrender.com/api/recipe/',
        { recipeID, userID },
        { headers: { Authorization: cookies.access_token } },
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
      navigate('/auth');
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className='h-screen pt-10 px-5 md:px:0'>
      <h1 className='text-4xl font-bold text-center'>Recipes</h1>
      <div className='flex flex-wrap justify-center py-10 gap-10'>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isRecipeSaved={isRecipeSaved}
            saveRecipe={saveRecipe}
            showDetails={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
