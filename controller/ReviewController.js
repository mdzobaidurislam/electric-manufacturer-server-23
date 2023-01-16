const Review = require("../models/ReviewModel");
const Tool = require("../models/ToolsModel");

//getAllreview
const getAllReview = async (req, res) => {
  const result = await Review.find({});
  res.status(200).json(result);
};

// add review
const addReview = async (req, res) => {
  const result = await Review.create(req.body);
  res.status(201);
  res.json({
    success: true,
    msg: "Review Successfully Added!",
  });
};

module.exports = {
  getAllReview,
  addReview,
};
