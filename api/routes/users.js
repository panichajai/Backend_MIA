var express = require('express');
var router = express.Router();
var User = require('../models/UserModel'); 
const bcrypt = require('bcryptjs');
var ResponseModel = require('../models/ResponseModel');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey'; 
router.post('/login', async (req, res, next) => {
    console.log('req login : ' , req.body)
    const { user_email, user_password } = req.body; 
    try {    
        const user = await User.findOne({ user_email });
        console.log('check user : ' , user)

        if (!user) {
            console.log('!user : User not found')
            return res.status(500).json(new ResponseModel(500, false, 'User not found'));
        }
   
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (isMatch) {
            console.log('login successful : ')

            const token = jwt.sign(
                { id: user._id, email: user.user_email }, 
                secretKey, // 
                { expiresIn: '1h' } 
            );

            return res.status(200).json(new ResponseModel(200, true, 'successful', token, null));
        } else {
            return res.status(401).json(new ResponseModel(401, false, 'Password incorrect'));
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));

    }
});

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find(); 
        console.log('Data fetched successfully!');
        res.status(200).json(new ResponseModel(200, true, 'successful',users,null));
        
    } 
    catch (err) {
        console.error('Error fetching data:', err); 
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            res.status(501).json(new ResponseModel(501, false, 'User not found',user,null));
        }
        res.status(200).json(new ResponseModel(200, true, 'successful',user,null));
    } catch (err) {
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { user_email, user_password } = req.body;
        if (!user_email || !user_password) {
            return res.status(400).json(new ResponseModel(400, false, 'Email or password is missing'));
        }
        const user = await User.findOne({ user_email });
        
        if (user) {
            return res.status(400).json(new ResponseModel(400, false, 'The email is already in use.'));
        }

        const hashedPassword = await bcrypt.hash(user_password, 10); 

        const newUser = await User.create({
            user_email,
            user_password: hashedPassword
        });

        return res.status(200).json(new ResponseModel(200, true, 'User created successfully', newUser));
    } catch (err) {
        console.error('Error during user creation:', err);
        res.status(500).json(new ResponseModel(500, false, 'Server error', null, err));
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.status(500).json(new ResponseModel(500, false, 'User not found',user,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'User updated successfully', updatedUser));
    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); 
        if (!deletedUser) {
            res.status(500).json(new ResponseModel(500, false, 'User not found',user,null));
        }
        return res.status(200).json(new ResponseModel(200, true, 'User deleted successfully',deletedUser,null));

    } catch (err) {
        res.status(500).json(new ResponseModel(500, false, 'error',null,err));
    }
});

module.exports = router;
