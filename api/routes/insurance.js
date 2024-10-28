var express = require('express');
var router = express.Router();
var Insurance = require('../models/InsuranceModel');
var ResponseModel = require('../models/ResponseModel');
var mongoose = require('mongoose'); 

router.get('/Insurance', async (req, res, next) => {
    try {
        const insurances = await Insurance.find();
        if (insurances.length > 0) {
        }
        console.log('Data fetched successfully!');
        res.status(200).json(new ResponseModel(200, true, 'successful', insurances,null));    
    }
    catch (err) {
        console.error('Error fetching data:', err); 
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
    
})
router.post('/Insurance', async (req, res, next) => {
    console.log('Request Body:', req.body); 
  
    const { 
        installmentConfirmDate,
        insuranceCustomer,
        policyHolder,
        phoneNumber,
        IDCard,
        carBrand,
        carModel,
        carLicensePlate,
        province,
        carChassisNumber,
        policyType,
        coverage,
        premium,
        installmentDesire,
        installment        
    } = req.body; 

    if (
        !installmentConfirmDate ||
        !insuranceCustomer ||
        !policyHolder ||
        !phoneNumber ||
        !IDCard ||
        !carBrand ||
        !carModel ||
        !carLicensePlate ||
        !province ||
        !carChassisNumber ||
        !policyType ||
        !coverage ||
        !premium ||
        !installmentDesire ||
        !installment
    ) 
    {
        console.log()
        return res.status(400).json(new ResponseModel(400, false, 'Missing required fields'));
    }
    
    try {
      const newInsurance = await Insurance.create({
        installmentConfirmDate,
        insuranceCustomer,
        policyHolder,
        phoneNumber,
        IDCard,
        carBrand,
        carModel,
        carLicensePlate,
        province,
        carChassisNumber,
        policyType,
        coverage,
        premium,
        installmentDesire,
        installment  
      });
  
      return res.status(200).json(new ResponseModel(200, true, 'Insurance created successfully', newInsurance));
    } catch (err) {
      console.error('Error during Insurance creation:', err); 
      res.status(500).json(new ResponseModel(500, false, 'Error during Insurance creation', null, err));
    }
});

  

router.get('/Insurance/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id.length !== 24) {
        return res.status(400).json(new ResponseModel(400, false, 'Invalid ID format'));
      }

      console.log('Fetching Status Insurance with ID:', id);
      const insurance = await Insurance.findById(id);

      if (!insurance) {
        return res.status(404).json(new ResponseModel(404, false, 'Insurance not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Insurance fetched successfully', insurance));
    } catch (err) {
      console.error('Error fetching Insurance:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching Insurance', null, err));
    }
});

  
  
  

router.put('/Insurance/:id', async (req, res, next) => {
    try {
        const updatedInsurance = await Insurance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInsurance) {
            res.status(500).json(new ResponseModel(500, false, 'Insurance not found',updatedInsurance,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Insurance updated successfully', updatedInsurance));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

router.delete('/Insurance/:id', async (req, res, next) => {
    try {
        const deletedInsurance = await Insurance.findByIdAndDelete(req.params.id); 
        if (!deletedInsurance) {
            res.status(500).json(new ResponseModel(500, false, 'Status Insurance not found',deletedInsurance,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Status Insurance deleted successfully',deletedInsurance,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router;
