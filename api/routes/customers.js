var express = require('express');
var router = express.Router();
var Customer = require('../models/CustomerModel'); 
var ResponseModel = require('../models/ResponseModel');
var mongoose = require('mongoose'); 

const moment = require('moment');

function convertThaiYearToCE(date) {
    if (!date) return null; 
    const momentDate = moment(date, 'DD/MM/YYYY'); 
    if (!momentDate.isValid()) {
        console.error("Invalid date format:", date);
        return null; 
    }
    const year = momentDate.year();
    return momentDate.year(year - 543).format('YYYY-MM-DD'); 
}


router.get('/', async (req, res, next) => {
    try {
        const customers = await Customer.find();
        if (customers.length > 0) {
            console.log('1');
        }
        console.log('Data fetched successfully!');
        res.status(200).json(new ResponseModel(200, true, 'successful', customers,null));    
    }
    catch (err) {
        console.error('Error fetching data:', err); 
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
    
})

router.post('/', async (req, res, next) => {
    console.log('Request Body:', req.body); 
  
    const { 
      customer_title,
      customer_fname,
      customer_lname,
      customer_phone,
      customer_dateOfBirth,
      customer_gender,
      customer_idCard,
      customer_issuedDate,
      customer_expireDate
    } = req.body; 

    if (!customer_title || !customer_fname || !customer_lname || !customer_phone || !customer_idCard || !customer_dateOfBirth || !customer_gender || !customer_issuedDate || !customer_expireDate) {
        console.log()
        return res.status(400).json(new ResponseModel(400, false, 'Missing required fields'));
    }
    
    if (!['male', 'female'].includes(customer_gender)) {
    return res.status(400).json({ message: 'Invalid gender' });
  }

    try {
      const customer = await Customer.findOne({ customer_idCard });
      if (customer) {
        return res.status(500).json(new ResponseModel(500, false, 'The ID card is already in use.', customer, null));
      }
  
      const dob = moment(customer_dateOfBirth, 'YYYY-MM-DD').toDate();
      const issued = moment(customer_issuedDate, 'YYYY-MM-DD').toDate();
      const expire = moment(customer_expireDate, 'YYYY-MM-DD').toDate();
  
      const newCustomer = await Customer.create({
        customer_title,
        customer_fname,
        customer_lname,
        customer_phone,
        customer_dateOfBirth: dob,
        customer_gender,
        customer_idCard,
        customer_issuedDate: issued,
        customer_expireDate: expire
      });
  
      return res.status(200).json(new ResponseModel(200, true, 'User created successfully', newCustomer));
    } catch (err) {
      console.error('Error during user creation:', err); 
      res.status(500).json(new ResponseModel(500, false, 'Error during user creation', null, err));
    }
});

  

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id.length !== 24) {
        return res.status(400).json(new ResponseModel(400, false, 'Invalid ID format'));
      }

      console.log('Fetching customer with ID:', id);
      const customer = await Customer.findById(id);

      if (!customer) {
        return res.status(404).json(new ResponseModel(404, false, 'Customer not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Customer fetched successfully', customer));
    } catch (err) {
      console.error('Error fetching customer:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching customer', null, err));
    }
});

  
  
  

router.put('/:id', async (req, res, next) => {
    try {
        const updatedUser = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.status(500).json(new ResponseModel(500, false, 'User not found',updatedUser,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'User updated successfully', updatedUser));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await Customer.findByIdAndDelete(req.params.id); 
        if (!deletedUser) {
            res.status(500).json(new ResponseModel(500, false, 'User not found',deletedUser,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'User deleted successfully',deletedUser,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router; 
