import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import { userRoutes } from './routes/userRoutes.js';
import { recipeRoutes } from './routes/recipeRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth/', userRoutes);
app.use('/api/recipe/', recipeRoutes);

try {
  await mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.oyznd4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  );
  console.log(`Connected to MongoDB`);
} catch (error) {
  console.error(`Error connecting to MongoDB, ${error}`);
}

app.listen(port, () => console.log(`Server is running in port ${port}`));
