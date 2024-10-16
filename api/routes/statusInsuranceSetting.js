var express = require('express');
var router = express.Router();
var StatusInsuranceSettingModel = require('../models/StatusInsuranceSettingModel'); 
var ResponseModel = require('../models/ResponseModel');
var mongoose = require('mongoose'); 

const moment = require('moment');




router.get('/', async (req, res, next) => {
    try {
        const statusInsurances = await StatusInsuranceSettingModel.find();
        if (statusInsurances.length > 0) {
        }
        console.log('Data fetched successfully!');
        res.status(200).json(new ResponseModel(200, true, 'successful', statusInsurances,null));    
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
      statusEN,
      code
    } = req.body; 

    if (!statusTH || !statusEN || !code ) {
        console.log()
        return res.status(400).json(new ResponseModel(400, false, 'Missing required fields'));
    }

    try {
      const newStatusInsurance = await StatusInsuranceSettingModel.create({
        statusTH,
        statusEN,
        code
      });
  
      return res.status(200).json(new ResponseModel(200, true, 'User created successfully', newStatusInsurance));
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

      console.log('Fetching Status Insurance with ID:', id);
      const statusInsurances = await StatusInsuranceSettingModel.findById(id);

      if (!statusInsurances) {
        return res.status(404).json(new ResponseModel(404, false, 'Status Insurance not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Status Insurance fetched successfully', statusInsurances));
    } catch (err) {
      console.error('Error fetching StatusInsurance:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching StatusInsurance', null, err));
    }
});

  
  
  

router.put('/:id', async (req, res, next) => {
    try {
        const statusInsurance = await StatusInsuranceSettingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!statusInsurance) {
            res.status(500).json(new ResponseModel(500, false, 'Status Insurance not found',statusInsurance,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Status Insurance updated successfully', statusInsurance));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedStatusInsurance = await StatusInsuranceSettingModel.findByIdAndDelete(req.params.id); 
        if (!deletedStatusInsurance) {
            res.status(500).json(new ResponseModel(500, false, 'Status Insurance not found',deletedStatusInsurance,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Status Insurance deleted successfully',deletedStatusInsurance,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router; 
