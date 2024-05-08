import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'recipes' }],
});

const User = model('User', userSchema);

export default User;
