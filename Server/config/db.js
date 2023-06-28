const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected : " + connection.host);
    } catch (error) {
        console.log(error);

    }
}

module.exports = connectDb;