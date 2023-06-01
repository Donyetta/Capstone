const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true
  }
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
