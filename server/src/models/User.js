import { Schemama, model } from 'mongoose';

const UserSchema = new Schemama({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const User = model('User', UserSchema);

export default User;
