const mongoose = require("mongoose");


mongoose
  .connect(
    "mongodb+srv://rodrigosturpie:Kid5Ir85nz0W0leF@signaltv.cpwdycn.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));