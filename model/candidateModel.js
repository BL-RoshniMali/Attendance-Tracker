const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
    candidate_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Candidate"
    },
    candidateName: {
        type: String,
        // required: [true, "Name is a required field"],
    },
    role: {
        type: String,
    },
    email: {
        type: String,
        // unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Candidate", candidateSchema);