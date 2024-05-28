const dotenv = require("dotenv").config();

const express = require("express");
const app = express();

const dbConnection = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT;

dbConnection();

app.use(express.json());
app.use("/api/users", require("./routes/adminRoutes"));
app.use("/api/candidate", require("./routes/candidateRoutes"));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})