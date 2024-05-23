
import express from "express"
import cors from "cors"
import mongoose from  'mongoose'
import dotenv from "dotenv"
import candiateRoute from "./routes/candidate.routes.js"

dotenv.config({
  path: './.env'
})

const app = express();
const port = 3001;

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.static("public/uploads"));
app.use("/api/v1", candiateRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
