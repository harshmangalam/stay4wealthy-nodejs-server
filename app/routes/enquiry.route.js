const router = require("express").Router();
const { createEnquiry } = require("../controllers/enquiry.controller");

router.post("/", createEnquiry);

module.exports = router;
