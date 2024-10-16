var express = require('express');
var router = express.Router();
var CarbrandModel = require('../models/CarbrandModel'); 
var ResponseModel = require('../models/ResponseModel');
var mongoose = require('mongoose'); 

const moment = require('moment');




router.get('/', async (req, res, next) => {
    try {
        const carbrands = await CarbrandModel.find();
        if (carbrands.length > 0) {
        }
        console.log('Data fetched successfully!');
        res.status(200).json(new ResponseModel(200, true, 'successful', carbrands,null));    
    }
    catch (err) {
        console.error('Error fetching data:', err); 
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
    
})

router.post('/', async (req, res, next) => {
    console.log('Request Body:', req.body); 
  
    const { 
        brandEN,
        modelEN
    } = req.body; 

    if (!brandEN || !modelEN  ) {
        console.log()
        return res.status(400).json(new ResponseModel(400, false, 'Missing required fields'));
    }

    try {
      const newCarbrand = await CarbrandModel.create({
        brandEN,
        modelEN
      });
  
      return res.status(200).json(new ResponseModel(200, true, 'Car Brand created successfully', newCarbrand));
    } catch (err) {
      console.error('Error during user creation:', err); 
      res.status(500).json(new ResponseModel(500, false, 'Error during Car Brand creation', null, err));
    }
});

  

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id.length !== 24) {
        return res.status(400).json(new ResponseModel(400, false, 'Invalid ID format'));
      }

      console.log('Fetching Car Brand with ID:', id);
      const carbrand = await CarbrandModel.findById(id);

      if (!carbrand) {
        return res.status(404).json(new ResponseModel(404, false, 'Car Brand not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Car Brand fetched successfully', carbrand));
    } catch (err) {
      console.error('Error fetching Car Brand:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching Car Brand', null, err));
    }
});

  
  
  

router.put('/:id', async (req, res, next) => {
    try {
        const carbrand = await CarbrandModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!carbrand) {
            res.status(500).json(new ResponseModel(500, false, 'Car Brand not found',carbrand,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Car Brand updated successfully', carbrand));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedCarbrand = await CarbrandModel.findByIdAndDelete(req.params.id); 
        if (!deletedCarbrand) {
            res.status(500).json(new ResponseModel(500, false, 'Car Brand not found',deletedCarbrand,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Car Brand deleted successfully',deletedCarbrand,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router; 
