const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(
   process.env.MONGO_URI
    /* 'mongodb://localhost:27017/signalTV' */
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));