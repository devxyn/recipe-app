import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log(`Server is running in port ${port}`));
