var express = require('express');
var router = express.Router();
var {Carbrand ,StatusInsuranceSetting , Installment  }= require('../models/SettingModel'); 
var ResponseModel = require('../models/ResponseModel');
var mongoose = require('mongoose'); 
// Carbrand
router.get('/Carbrand', async (req, res, next) => {
    try {
        const carbrands = await Carbrand.find();
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
router.post('/Carbrand', async (req, res, next) => {
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
      const newCarbrand = await Carbrand.create({
        brandEN,
        modelEN
      });
  
      return res.status(200).json(new ResponseModel(200, true, 'Car Brand created successfully', newCarbrand));
    } catch (err) {
      console.error('Error during user creation:', err); 
      res.status(500).json(new ResponseModel(500, false, 'Error during Car Brand creation', null, err));
    }
});
router.get('/Carbrand/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id.length !== 24) {
        return res.status(400).json(new ResponseModel(400, false, 'Invalid ID format'));
      }

      console.log('Fetching Car Brand with ID:', id);
      const carbrand = await Carbrand.findById(id);

      if (!carbrand) {
        return res.status(404).json(new ResponseModel(404, false, 'Car Brand not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Car Brand fetched successfully', carbrand));
    } catch (err) {
      console.error('Error fetching Car Brand:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching Car Brand', null, err));
    }
});
router.put('/Carbrand/:id', async (req, res, next) => {
    try {
        const carbrand = await Carbrand.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!carbrand) {
            res.status(500).json(new ResponseModel(500, false, 'Car Brand not found',carbrand,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Car Brand updated successfully', carbrand));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});
router.delete('/Carbrand/:id', async (req, res, next) => {
    try {
        const deletedCarbrand = await Carbrand.findByIdAndDelete(req.params.id); 
        if (!deletedCarbrand) {
            res.status(500).json(new ResponseModel(500, false, 'Car Brand not found',deletedCarbrand,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Car Brand deleted successfully',deletedCarbrand,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});
// StatusInsurance
router.get('/StatusInsurance', async (req, res, next) => {
    try {
        const statusInsurances = await StatusInsuranceSetting.find();
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
router.post('/StatusInsurance', async (req, res, next) => {
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
      const newStatusInsurance = await StatusInsuranceSetting.create({
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
router.get('/StatusInsurance/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id.length !== 24) {
        return res.status(400).json(new ResponseModel(400, false, 'Invalid ID format'));
      }

      console.log('Fetching Status Insurance with ID:', id);
      const statusInsurances = await StatusInsuranceSetting.findById(id);

      if (!statusInsurances) {
        return res.status(404).json(new ResponseModel(404, false, 'Status Insurance not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Status Insurance fetched successfully', statusInsurances));
    } catch (err) {
      console.error('Error fetching StatusInsurance:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching StatusInsurance', null, err));
    }
});
router.put('/StatusInsurance/:id', async (req, res, next) => {
    try {
        const statusInsurance = await StatusInsuranceSetting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!statusInsurance) {
            res.status(500).json(new ResponseModel(500, false, 'Status Insurance not found',statusInsurance,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Status Insurance updated successfully', statusInsurance));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});
router.delete('/StatusInsurance/:id', async (req, res, next) => {
    try {
        const deletedStatusInsurance = await StatusInsuranceSetting.findByIdAndDelete(req.params.id); 
        if (!deletedStatusInsurance) {
            res.status(500).json(new ResponseModel(500, false, 'Status Insurance not found',deletedStatusInsurance,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Status Insurance deleted successfully',deletedStatusInsurance,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});
//
router.get('/Installment', async (req, res, next) => {
    try {
        const statusInstallments = await Installment.find();
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
router.post('/Installment', async (req, res, next) => {
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
      const newInstallment = await Installment.create({
        statusTH,
        statusEN
      });
  
      return res.status(200).json(new ResponseModel(200, true, 'Installment created successfully', newInstallment));
    } catch (err) {
      console.error('Error during Installment creation:', err); 
      res.status(500).json(new ResponseModel(500, false, 'Error during Installment creation', null, err));
    }
});
router.get('/Installment/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id.length !== 24) {
        return res.status(400).json(new ResponseModel(400, false, 'Invalid ID format'));
      }

      console.log('Fetching Installment with ID:', id);
      const installment = await Installment.findById(id);

      if (!installment) {
        return res.status(404).json(new ResponseModel(404, false, 'Installment not found'));
      }

      return res.status(200).json(new ResponseModel(200, true, 'Installment fetched successfully', installment));
    } catch (err) {
      console.error('Error fetching StatusInsurance:', err);
      return res.status(500).json(new ResponseModel(500, false, 'Error fetching StatusInsurance', null, err));
    }
});
router.put('/Installment/:id', async (req, res, next) => {
    try {
        const installment = await Installment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!installment) {
            res.status(500).json(new ResponseModel(500, false, 'Installment not found',installment,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Installment updated successfully', installment));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});
router.delete('/Installment/:id', async (req, res, next) => {
    try {
        const deletedInstallment = await Installment.findByIdAndDelete(req.params.id); 
        if (!deletedInstallment) {
            res.status(500).json(new ResponseModel(500, false, 'Installment not found',deletedInstallment,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'Installment deleted successfully',deletedInstallment,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router; 
