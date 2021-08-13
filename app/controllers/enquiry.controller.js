const Enquiry = require("../models/enquiry.model");

exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, address, question } = req.body;

    const enquiry = new Enquiry({
      name,
      phone,
      address,
      question,
    });

    const saveEnquiry = await enquiry.save();

    return res.status(201).json({
      status: "success",
      message: "Your enquiry is created",
      data: saveEnquiry,
    });
  } catch (error) {
    next(error);
  }
};
