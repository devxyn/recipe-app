import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingridients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userOwnder: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
