var express = require('express');
var router = express.Router();
var InstallmentModel = require('../models/InstallmentModel'); 
var ResponseModel = require('../models/ResponseModel');
var mongoose = require('mongoose'); 

const moment = require('moment');




router.get('/', async (req, res, next) => {
    try {
        const statusInstallments = await InstallmentModel.find();
        if (statusInstallments.length > 0) {
        }
        console.log('Data fetched successfully!');
        res.status(200).json(new ResponseModel(200, true, 'successful', statusInstallments,null));    
    }
    catch (err) {
        console.error('Error fetching data:', err); 
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
    
})

router.post('/', async (req, res, next) => {
    console.log('Request Body:', req.body); 
  
    const { 
      statusTH,
      statusEN
    } = req.body; 

    if (!statusTH || !statusEN) {
        console.log()
        return res.status(400).json(new ResponseModel(400, false, 'Missing required fields'));
    }

    try {
      const newInstallment = await InstallmentModel.create({
        statusTH,
        statusEN
      });
  
      return res.status(200).json(new ResponseModel(200, true, 'Installment created successfully', newInstallment));
    } catch (err) {
      console.error('Error during Installment creation:', err); 
      res.status(500).json(new ResponseModel(500, false, 'Error during Installment creation', null, err));
    }
});

  

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id.length !== 24) {
        return res.status(400).json(new ResponseModel(400, false, 'Invalid ID format'));
      }

      console.log('Fetching Installment with ID:', id);
      const installment = await InstallmentModel.findById(id);

      if (!installment) {
        return res.status(404).json(new ResponseModel(404, false, 'Installment not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Installment fetched successfully', installment));
    } catch (err) {
      console.error('Error fetching StatusInsurance:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching StatusInsurance', null, err));
    }
});

  
  
  

router.put('/:id', async (req, res, next) => {
    try {
        const installment = await InstallmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!installment) {
            res.status(500).json(new ResponseModel(500, false, 'Installment not found',installment,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Installment updated successfully', installment));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedInstallmentModel = await InstallmentModel.findByIdAndDelete(req.params.id); 
        if (!deletedInstallmentModel) {
            res.status(500).json(new ResponseModel(500, false, 'Installment not found',deletedInstallmentModel,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Installment deleted successfully',deletedInstallmentModel,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router; 
