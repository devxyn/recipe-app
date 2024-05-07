import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

try {
  await mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.oyznd4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  );
  console.log(`Connected to MongoDB`);
} catch (error) {
  console.error(`Error connecting to MongoDB, ${error}`);
}

app.listen(port, () => console.log(`Server is running in port ${port}`));
