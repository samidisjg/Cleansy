import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './dbConfig/dbConnection.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());

dbConnection();

app.listen(3000, () => {
   console.log('Server is running on http://localhost:3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   res.status(statusCode).json({
      success: false,
      statusCode,
      message
   })
})