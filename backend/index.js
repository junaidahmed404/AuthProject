import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";  // ✅ Import CORS

import { connectDB } from './db/connectDB.mjs';
import authRoutes from './Routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS before defining routes
app.use(cors({
    origin: "http://localhost:5173",  // Change if frontend runs on a different port
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Auth Project Running');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is Running on Port ${PORT}`);
});
