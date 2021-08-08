
const router = require("express").Router()
const { chargeAmount } = require("../controllers/payment.controller")


router.post("/charge",chargeAmount)

module.exports = router