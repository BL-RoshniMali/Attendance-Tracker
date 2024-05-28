const Admin = require("../model/adminModel");

const getDetails = async (req, res) => {
    const admin = await Admin.find();
    res.json(admin);
};

const createAdminAccount = async (req, res) => {
    console.log("The request body is : ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required!")
    }
    res.status(201).json({message: "Created Account"});
};

module.exports = {getDetails, createAdminAccount};