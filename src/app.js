import express from "express";
import dotenv from "dotenv";
import connectDataBase from "./config/database.js";
import Bookroutes from "./router/bookRoutes.js";

dotenv.config();


const MONGO_URI = process.env.MONGO_URI;
connectDataBase(MONGO_URI);

const app = express();
app.use(express.json());
app.use("/book-collection", Bookroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))