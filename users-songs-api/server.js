import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/",UserRouter);

connectDB();

app.listen(PORT, () => {
    console.log("server is running on port",PORT);
});

