var express = require('express');
var router = express.Router();
var User = require('../models/User'); // นำเข้าโมเดล User
const bcrypt = require('bcryptjs');
var ResponseModel = require('../models/ResponseModel');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey'; 
// POST: เส้นทางสำหรับล็อกอิน
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

            // สร้าง token โดยใช้ user ID และ secret key
            const token = jwt.sign(
                { id: user._id, email: user.user_email }, // payload
                secretKey, // secret key สำหรับเข้ารหัส
                { expiresIn: '1h' } // token มีอายุ 1 ชั่วโมง
            );

            // ส่ง token กลับไปใน response
            return res.status(200).json(new ResponseModel(200, true, 'successful', token, null));
        } else {
            return res.status(401).json(new ResponseModel(401, false, 'Password incorrect'));
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));

    }
});

// เส้นทาง GET สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find(); // รอการดึงข้อมูลจากฐานข้อมูล
        console.log('Data fetched successfully!'); // แสดง log เมื่อดึงข้อมูลสำเร็จ
        res.status(200).json(new ResponseModel(200, true, 'successful',users,null));
        
    } 
    catch (err) {
        console.error('Error fetching data:', err); // แสดง log ข้อผิดพลาด
        res.status(501).json(new ResponseModel(501, false, 'error',null,err));
    }
});

// เส้นทาง GET สำหรับดึงข้อมูลผู้ใช้ตาม id
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

// เส้นทาง POST สำหรับสร้างผู้ใช้ใหม่
router.post('/', async (req, res, next) => {
    try {
        // ตรวจสอบว่ามีผู้ใช้อีเมลนี้อยู่ในระบบแล้วหรือไม่
        const { user_email, user_password } = req.body;
        if (!user_email || !user_password) {
            return res.status(400).json(new ResponseModel(400, false, 'Email or password is missing'));
        }
        const user = await User.findOne({ user_email });
        
        // ถ้าผู้ใช้มีอยู่แล้ว แจ้งกลับว่ามีผู้ใช้อีเมลนี้แล้ว
        if (user) {
            return res.status(400).json(new ResponseModel(400, false, 'The email is already in use.'));
        }

        // แฮชรหัสผ่านก่อนบันทึกลงฐานข้อมูล
        const hashedPassword = await bcrypt.hash(user_password, 10); 

        // สร้างผู้ใช้ใหม่พร้อมกับรหัสผ่านที่ถูกแฮช
        const newUser = await User.create({
            user_email,
            user_password: hashedPassword
        });

        // ส่งข้อมูลผู้ใช้ใหม่กลับไปในรูปแบบ JSON
        return res.status(200).json(new ResponseModel(200, true, 'User created successfully', newUser));
    } catch (err) {
        console.error('Error during user creation:', err);
        res.status(500).json(new ResponseModel(500, false, 'Server error', null, err));
    }
});



// เส้นทาง PUT สำหรับอัปเดตผู้ใช้
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

// เส้นทาง DELETE สำหรับลบผู้ใช้
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

module.exports = router; // ส่งออก router
