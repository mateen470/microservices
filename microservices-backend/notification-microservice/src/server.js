require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notificationRoutes = require("./routes/notificationRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", notificationRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`NOTIFICATION SERVICE RUNNING SUCCESSFULLY!! ON PORT :: ${PORT}`);
});
