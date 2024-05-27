/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import useGetUserID from '../hooks/useGetUserID';
import RecipeCard from '../component/RecipeCard';

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    fetchSavedRecipe();
  }, []);

  const fetchSavedRecipe = async () => {
    try {
      const response = await axios.get(`https://recipe-app-server-three.vercel.app/api/recipe/saved-recipes/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='h-screen pt-10 px-5 md:px-0'>
      <h1 className='text-4xl font-bold text-center'>Recipes</h1>
      <div className='flex flex-wrap justify-center py-10 gap-10'>
        {savedRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} showDetails={true} />
        ))}
      </div>
    </div>
  );
};

export default SavedRecipe;
