const express = require("express");
const app = express();

const db = require("./models");

const userRouter = require('./routes/Users')
app.use("/userdata", userRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
