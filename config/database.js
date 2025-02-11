const mongoose = require("mongoose");

const dbConnection = async()=> {
    try{
        const connect = await mongoose.connect(process.env.DATABASE_CONNECTION);
        console.log("Connected to the Database...", connect.connection.host, connect.connection.name);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbConnection;