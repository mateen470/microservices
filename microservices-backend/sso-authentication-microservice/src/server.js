require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/", authRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`SSO AUTHENTICATION SERVICE RUNNING SUCCESSFULLY!! ON PORT :: ${PORT}`);
});
