const mongoose = require('mongoose');


//Defining the schema for the aurora-watch API data
const weatherSchema = new mongoose.Schema({
   statusId: String,
  datetime: String,
  date: { type: Date, default: Date.now }
});



// Creating the database model
const Data = mongoose.model("Data", weatherSchema);



module.exports = Data;