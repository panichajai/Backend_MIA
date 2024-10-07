const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');


router.get('/', async (req, res, next) => {
    // try {
    //     const products = await Product.find(); 
    //     res.json(products); 
    // } catch (err) {
    //     next(err); 
    // }
  let numbers = [3, 1, 6, 9, 2];
console.log(findMax(numbers)); 
 console.log(findMin(numbers)); 
 console.log(findAverage(numbers)); 
  res.json(200); 
});
function findMax(arr) {
    let max = arr[0]; 9     
    for (let i = 1; i < arr.length; i++) { 
      if (arr[i] > max) {
        max = arr[i]; 
      }
    }
    return max;
}
function findMin(arr) {
    let min = arr[0];   
    for (let i = 1; i < arr.length; i++) { 
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;  
  }
  function findAverage(arr) {
    let sum = 0;//21
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i]; // sum =  19 + 2
    }
    return sum / arr.length; 
  }
  
  
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); 
        }
        res.status(200).json(product); 
    } catch (err) {
        next(err); 
    }
});


router.post('/', async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body); 
        res.status(201).json(newProduct); 
    } catch (err) {
        next(err); 
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // อัปเดตสินค้า
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' }); 
        }
        res.status(200).json(updatedProduct); 
    } catch (err) {
        next(err); 
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id); 
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' }); 
        }
        res.status(200).json({ message: 'Product deleted', product: deletedProduct }); 
    } catch (err) {
        next(err); 
    }
});


module.exports = router;
