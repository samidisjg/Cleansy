import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './dbConfig/dbConnection.js';

dotenv.config();

const app = express();

dbConnection();

app.listen(3000, () => {
   console.log('Server is running on http://localhost:3000');
});