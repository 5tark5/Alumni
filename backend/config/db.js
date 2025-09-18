const mongoose = require("mongoose");


const connectDB = async (database) => {
  try {
    if (!database) throw new Error ("Database name is Required");
    const mongo_uri = `process.env.MONGO_URI/${database}`;
    if (!mongo_uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
