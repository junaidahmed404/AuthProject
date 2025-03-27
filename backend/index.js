import express from 'express';

import dotenv from "dotenv"

import cookieParser from 'cookie-parser';

// ____________________________________

import { connectDB } from './db/connectDB.mjs';

import authRoutes from './Routes/auth.route.js';

// ____________________________________


dotenv.config()

// ____________________________________

const app = express();

const PORT = process.env.PORT || 5000;




// ____________________________________

app.get('/', (req, res) => {

    res.send('Auth Project Running')

})

app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', authRoutes)

// ____________________________________

app.listen(PORT, () => {

    connectDB()

    console.log(`Server is Running on Port ${PORT}`);

})