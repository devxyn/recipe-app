import { Router } from 'express';
import Recipe from './../models/Recipe.js';

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const response = await Recipe.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/add', async (req, res) => {
  const { name, ingridients, instructions, imageUrl, cookingTime, userOwner } = req.body;

  const recipe = await Recipe.create({ name, ingridients, instructions, imageUrl, cookingTime, userOwner });

  res.status(200).json({ message: 'Recipe added successfully!', recipe });
});

export { router as recipeRoutes };
