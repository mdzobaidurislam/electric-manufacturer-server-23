const Tool = require("../models/ToolsModel");

//getAllTools
const getAllTools = async (req, res) => {
  const result = await Tool.find({});
  res.status(200).json(result);
};

//getAllTools for Admin
const getAllProduct = async (req, res) => {
  const result = await Tool.find({});
  res.status(200).json({ success: true, result });
};

const getToolById = async (req, res) => {
  const result = await Tool.findById(req.params.id);
  if (result) {
    res.status(201).json(result);
  } else {
    res.status(401).res.json("Tool not found");
  }
};

// add product
const addProduct = async (req, res) => {
  const data = req.body;

  const result = await Tool.create(data);
  if (result) {
    res.status(201);
    res.json({
      success: true,
      msg: "Product Successfully Added!",
    });
  } else {
    res.json({
      success: false,
      msg: "Product not Added!",
    });
  }
};

// admin delete product
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const findProduct = await Tool.findOne({ id });
  if (findProduct) {
    const result = await Tool.findByIdAndDelete({ _id: id });
    if (result) {
      res.status(200).json({
        success: true,
        msg: "Product Deleted Successfully!",
      });
    }
  } else {
    res.status(404).json({
      msg: "Product not found!",
    });
  }
};

module.exports = {
  getAllTools,
  getToolById,
  getAllProduct,
  deleteProductById,
  addProduct,
};
