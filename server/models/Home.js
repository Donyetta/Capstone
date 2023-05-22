const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
