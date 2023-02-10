const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const FoodModel = require("./models/Food.js");
const port = 3001;
const authRoute = require("./routers/auth");
const foodRoute = require("./routers/food");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hkgcklg.mongodb.net/food?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();
app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);
app.listen(port, () => console.log(`Server running on port: ${port}`));
