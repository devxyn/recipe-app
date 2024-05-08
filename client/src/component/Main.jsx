/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import useGetUserID from '../hooks/useGetUserID';

const Main = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/recipe');
      setRecipes(response.data);
      //console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSavedRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/recipe/saved-recipes/ids/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
      console.log(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put('http://localhost:3000/api/recipe', { recipeID, userID });
      setSavedRecipes(response.data.savedRecipes);
      console.log(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>

              <button
                className='border border-black'
                disabled={isRecipeSaved(recipe._id)}
                onClick={() => saveRecipe(recipe._id)}>
                Save
              </button>
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
