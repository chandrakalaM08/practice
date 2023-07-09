const express = require("express");
const ProductModel = require("../models/productModel");
const { verifyToken } = require("../middleware/auth.middleware");
const productRouter = express.Router();

productRouter.get("/", (request, response) => {
  response.send("Welcome to the homepage");
});

// Protected routes
productRouter.use(verifyToken);

productRouter.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (error) {
    console.log("Error retrieving products:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

productRouter.post("/products", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new ProductModel({ name, description, price });
    await product.save();
    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    console.log("Error creating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

productRouter.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    let updatedProduct = await ProductModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.send({
      message: `Product with ID ${id} updated successfully,`,
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

productRouter.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.send({ message: `Product with ID ${id} deleted successfully` });
  } catch (error) {
    console.log("Error deleting product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = productRouter;
