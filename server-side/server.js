import express from "express";
import cors from "cors";
import corsOptionsConfig from "./config/corsOptions.js";
import router from "./routes/users.js";

const app = express();
const PORT = 8080;

app.use(cors(corsOptionsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/users',router );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});