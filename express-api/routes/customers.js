var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer'); 
var ResponseModel = require('../models/ResponseModel');
var mongoose = require('mongoose');  // เพิ่ม mongoose เข้ามา


const moment = require('moment');

function convertThaiYearToCE(date) {
    if (!date) return null; // ตรวจสอบว่าค่าวันที่ว่างหรือไม่
    const momentDate = moment(date, 'DD/MM/YYYY'); // ใช้ moment ตรวจสอบฟอร์แมต
    if (!momentDate.isValid()) {
        console.error("Invalid date format:", date);
        return null; // ส่งคืน null ถ้าวันที่ไม่ถูกต้อง
    }
    const year = momentDate.year();
    return momentDate.year(year - 543).format('YYYY-MM-DD'); // ลดปีลง 543 และแปลงเป็นฟอร์แมต YYYY-MM-DD
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
        console.error('Error fetching data:', err); // แสดง log ข้อผิดพลาด
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
    
})

router.post('/', async (req, res, next) => {
    console.log('Request Body:', req.body); // ตรวจสอบ request body
  
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
    
    // ตรวจสอบว่ามีค่าที่จำเป็นหรือไม่
    if (!customer_title || !customer_fname || !customer_lname || !customer_phone || !customer_idCard || !customer_dateOfBirth || !customer_gender || !customer_issuedDate || !customer_expireDate) {
        console.log()
        return res.status(400).json(new ResponseModel(400, false, 'Missing required fields'));
    }
    
    if (!['male', 'female'].includes(customer_gender)) {
    return res.status(400).json({ message: 'Invalid gender' });
  }

    try {
      // ตรวจสอบว่ามีลูกค้าด้วยหมายเลขบัตรประชาชนนี้หรือไม่
      const customer = await Customer.findOne({ customer_idCard });
      if (customer) {
        return res.status(500).json(new ResponseModel(500, false, 'The ID card is already in use.', customer, null));
      }
  
      // แปลงวันที่ให้ถูกต้อง
      const dob = moment(customer_dateOfBirth, 'YYYY-MM-DD').toDate();
      const issued = moment(customer_issuedDate, 'YYYY-MM-DD').toDate();
      const expire = moment(customer_expireDate, 'YYYY-MM-DD').toDate();
  
      // สร้างลูกค้าใหม่
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

      // ตรวจสอบว่า id ไม่ใช่ undefined และมีความยาวที่ถูกต้อง
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
            res.status(500).json(new ResponseModel(500, false, 'User not found',customer,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'User updated successfully', updatedUser));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

// เส้นทาง DELETE สำหรับลบผู้ใช้
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await Customer.findByIdAndDelete(req.params.id); 
        if (!deletedUser) {
            res.status(500).json(new ResponseModel(500, false, 'User not found',customer,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'User deleted successfully',deletedUser,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router; 
