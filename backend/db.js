const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&ssl=false";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); 
  }
};

module.exports = connectToMongo;
