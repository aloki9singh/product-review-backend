const Product = require('../models/product');
const express =require('express')
const Review = require("../models/review")
const reviewRouter= express.Router()

// Create a Review for a Product
reviewRouter.post('/products/:productId/reviews', async (req, res) => {

    try {
      const product = await Product.findById(req.params.productId);
    
      if (!product) {
        res.status(404).json({ error: 'Product not found.' });
        return;
      }
    //   console.log(req.params.productId);
      const review = new Review(req.body);
      await review.save();
  
      product.reviews.push(review);
      await product.save();
  
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add the review.' });
    }
  })
  
  // Delete a Review
  reviewRouter.delete('/products/:productId/reviews/:reviewId', async (req, res) => {
    try {
      await Review.findByIdAndRemove(req.params.reviewId);
      const product = await Product.findByIdAndUpdate(
        req.params.productId,
        { $pull: { reviews: req.params.reviewId } },
        { new: true }
      );
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the review.' });
    }
  });
  
  // Virtual Population of Reviews for a Product
  reviewRouter.get('/products/:productId/reviews', async (req, res) => {
    try {
      const product = await Review.findById(req.params.productId).populate('reviews');
      res.json(product.reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve reviews.' });
    }
  });

  module.exports={
    reviewRouter
  }