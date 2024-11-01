require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const requestRoutes = require("./routes/requestRoute");
const connectDB = require("./config/dataBaseConnection");

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", requestRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`REQUESTS SERVICE RUNNING SUCCESSFULLY!! ON PORT :: ${PORT}`);
});
