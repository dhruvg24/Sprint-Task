import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from './routes/user.routes.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/api/v1/users", userRoutes);

mongoose.connect(process.env.MONGO_DB_URI).then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`))).catch((err) => console.error(err));
