const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");
var connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("connected to database");
    })
    .catch(err => {
      console.error(`error ${err}`);
    });
};

module.exports = connectDB;
