const Product = require('../models/product');
const express =require('express')
const productRouter = express.Router()

// API Endpoints

// Add a Product
productRouter.post('/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add the product.' });
    }
  });
  
  // Read All Products
  productRouter.get('/products', async (req, res) => {
    try {
      const products = await Product.find().populate('reviews');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve products.' });
    }
  });
  
  // Read Product by ID
  productRouter.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('reviews');
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Product not found.' });
    }
  });
  
  // Update a Product
  productRouter.patch('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({ message: "Product Updated", product });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the product.',error });
    }
  });
  
  // Delete a Product
  productRouter.delete('/products/:id', async (req, res) => {
    try {
      await Product.findByIdAndRemove(req.params.id);
      res.json({ message: 'Product deleted.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the product.' });
    }
  });
  
  module.exports={
    productRouter
  }