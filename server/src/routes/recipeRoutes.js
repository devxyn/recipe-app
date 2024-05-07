import { Router } from 'express';
import mongoose from 'mongoose';
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

router.post('/', async (req, res) => {
  try {
    const response = await Recipe.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as recipeRoutes };
