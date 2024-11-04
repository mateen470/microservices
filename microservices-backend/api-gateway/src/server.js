require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRoutes = require("./routes/SSOAuthenticationRoute");
const requestRoutes = require("./routes/requestRoute");
const notificationRoutes = require("./routes/notificationRoute");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//ROUTES REDIRECTOR TO RELEVANT MICROSERVICES
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API GATEWAY RUNNING SUCCESSFULLY!! ON PORT :: ${PORT}`);
});
