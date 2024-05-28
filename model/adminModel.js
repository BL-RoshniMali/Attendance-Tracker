const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: [true, "Name is a required field"],
    },
    role: {
        type: String,
    },
    email: {
        type: String,
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Admin", adminSchema);