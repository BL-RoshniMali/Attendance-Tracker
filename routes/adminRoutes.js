const express = require("express");
const router = express.Router();
const {getDetails, createAdminAccount} = require("../controllers/adminController");

router.route("/").get(getDetails).post(createAdminAccount);

module.exports = router;