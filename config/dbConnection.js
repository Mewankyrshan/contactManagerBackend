const { default: mongoose } = require("mongoose")
require("dotenv").config;
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected");
    }
    catch (err) {
        console.log("Database Connection Error", err);
        process.exit(1);
    }
}

module.exports = connectDb;