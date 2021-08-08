const { STRIPE_SECRET_TEST } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET_TEST);

exports.chargeAmount = async (req, res, next) => {
  let { amount, id, description } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "INR",
      description: description,
      payment_method: id,
      confirm: true,
    });

    return res.status(201).json({
      type: "success",
      message: "Payment successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};
