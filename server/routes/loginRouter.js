const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcrypt'); //library for hashing password // 'npm install bcrypt'
const jwt = require('jsonwebtoken'); //library for token generation //used for authentication

const userRegModel = require('../models/userRegModel');
const loginModel = require('../models/LoginModel');

loginRouter.post('/', async (req, res) => {

    try {

        const user = await loginModel.findOne({ username: req.body.username });
        console.log(user);

        if (!user) { //if not registered

            return res.status(200).json({ success: true, error: false, message: "user not registered" });
        }


        const { password } = req.body; // OR const password = req.body.password;
        const isspassword = await bcrypt.compare(password, user.password); //bcrypt.compare method is used to compare a plaintext password (password) with a hashed password (user.password).


        //password check
        if (isspassword) { //simply for starter, before encryption - user.password == req.body.password




            //---------token generation/creation-----------
            // console.log(user.role);

            if (user.role == 1) {

                const userDetails = await userRegModel.findOne({ loginId: user._id }); //reg details
                console.log(userDetails);

                const token = jwt.sign({    //sign - this function is used to create/generate token

                    loginId: userDetails.loginId, //reg details is in const userDetails
                    name: userDetails.name,
                    username: user.username, //login details is already get in const user
                    role: user.role,


                },

                    'secret_key_not_exclusive',//secret key
                    { expiresIn: '6h' }

                );

                console.log('token', token);
                return res.status(200).json({ success: true, error: false, message: "login successful", expiresIn: '21600', token: token, loginId: userDetails.loginId, username: user.username, role: user.role });

            }


            if (user.role == 0) {

                const adminDetails = await userRegModel.findOne({ loginId: user._id });
                console.log(adminDetails);

                const token = jwt.sign({

                    loginId: adminDetails.loginId,
                    username: user.username,
                    role: user.role,

                },

                    'secret_key_not_exclusive',
                    { expiresIn: '6h' }

                );
                return res.status(200).json({ success: true, error: false, message: "login successful", expiresIn: '21600', token: token, loginId: adminDetails.loginId, username: user.username, role: user.role});


            }

        }
        else {
            res.status(500).json({ success: true, error: false, message: "password not matched" });
        }


    } catch (err) {

        console.log(err);
        return res.status(500).json({ success: false, error: true, message: "something went wrong in loginRouter" })

    }
})

module.exports = loginRouter;