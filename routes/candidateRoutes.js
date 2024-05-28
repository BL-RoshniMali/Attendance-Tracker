const express = require("express");
const { registerCandidate, loginCandidate, currentCandidate } = require("../controllers/candidateController");
const validateToken = require("../middleware/validationTokenHandler");

const router = express.Router();

router.post("/register", registerCandidate);

router.post("/login/:location_access", loginCandidate);

router.get("/current", validateToken , currentCandidate);

module.exports = router;