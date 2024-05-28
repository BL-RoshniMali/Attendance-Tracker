
const Candidate = require("../model/candidateModel");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { fetchLocation } = require("../middleware/locationDetector");

/**
 * @description Controller to register a candidate.
 * @access public
 */
const registerCandidate = expressAsyncHandler((async (req, res) => {
    const { candidateName, role, email, password, phoneNumber } = req.body;
    if(!candidateName || !role || !email || !password || !phoneNumber){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    // const candidateAvailable = await Candidate;
    // if(candidateAvailable){
    //     res.status(400);
    //     throw new Error("Candidate Already Registered!")
    // }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const candidate = await Candidate.create({
        candidateName,
        role,
        email,
        password: hashedPassword,
        phoneNumber,
        latitude,
        longitude
    });
    console.log(`Candidate details created ${candidate} successfully`);
    if(candidate){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    res.status(201).json({ _id: candidate.id, email: candidate.email, role: candidate.role, latitude: latitude, longitude: longitude})
                }
            )
            
        }
    }
    else{
        res.status(400);
        throw new Error("Data is not valid...")
    }
    res.json({message: "Registration Successfully"})
}));

/**
 * @description Controller to provide logged in functionality to a candidate.
 * @access public
 */
const loginCandidate = expressAsyncHandler((async (req, res) => {
    
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are Mandatory");
    }
    const candidate = await Candidate.findOne({email});
    if(candidate && (await bcrypt.compare(password, candidate.password))){
        const {location_access} = req.params;
        // console.log(typeof(location_access));
        if(location_access === "true"){
            const accessToken = jwt.sign({
                candidate: {
                    candidateName: candidate.candidateName,
                    email: candidate.email,
                    id: candidate.id
                },
            }, process.env.ACCESS_TOKEN_KEY, 
            // {expiresIn: "5m"}
        );
        const location = await fetchLocation()
        console.log("Location: ", location);
            res.status(200).json({ 
                code : 200,
                data : accessToken,
                location : location

             });

        }
        else{
            res.status(400).json({
                code: 400, 
                data: location_access,
                message: "Please allow access to location for login"
            })
        }  
    }
    else{
        res.status(401)
        throw new Error("Email or Password is Invalid.")
    }
}));

/**
 * @description To get the current information of a candidate.
 * @access public
 */
const currentCandidate = expressAsyncHandler((async (req, res) => {
    res.json(req.candidate);
}));



module.exports = { registerCandidate, loginCandidate, currentCandidate };