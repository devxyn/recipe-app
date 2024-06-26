import { Router } from 'express';
import Recipe from './../models/Recipe.js';
import User from '../models/User.js';
import verifyToken from './../middlewares/verifyToken.js';

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const response = await Recipe.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } = req.body;

  try {
    const recipe = await Recipe.create({ name, ingredients, instructions, imageUrl, cookingTime, userOwner });
    res.status(200).json({ message: 'Recipe added successfully!', recipe });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.put('/', verifyToken, async (req, res) => {
  const { userID, recipeID } = req.body;

  try {
    const recipe = await Recipe.findById(recipeID);
    const user = await User.findById(userID);

    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ message: 'Recipe has been saved successfully!', savedRecipes: user.savedRecipes });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.delete('/saved-recipes/delete', verifyToken, async (req, res) => {
  const { userID, recipeID } = req.body;

  try {
    const user = await User.findById(userID);

    if (!user) res.status(404).json({ message: 'User not found!' });
    if (!user.savedRecipes.includes(recipeID)) res.status(404).json({ message: 'Recipe not found in saved recipes!' });

    user.savedRecipes = user.savedRecipes.filter((id) => id.toString() !== recipeID);
    await user.save();

    res.status(200).json({ message: 'Recipe has been removed successfully!', savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.get('/saved-recipes/ids/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findById(userID);
    res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/saved-recipes/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findById(userID);
    const savedRecipes = await Recipe.find({
      _id: { $in: user?.savedRecipes },
    });

    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as recipeRoutes };
