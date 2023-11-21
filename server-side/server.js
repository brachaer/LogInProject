import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import corsOptionsConfig from "./config/corsOptions.js";
import router from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptionsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users',router );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});