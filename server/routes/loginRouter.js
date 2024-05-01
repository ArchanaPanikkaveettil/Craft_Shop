const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcrypt'); //library for hashing password // 'npm install bcrypt'
const jwt = require('jsonwebtoken'); //library for token generation //used for authentication

const loginModel = require('../models/LoginModel');

loginRouter.post('/', async (req, res) => {

    try {

        const user = await loginModel.findOne({ username: req.body.username, password: req.body.password });
        console.log(user);

        if (!user) { //if not registered

            return res.status(200).json({ success: true, error: false, message: "user not registered" });
        }


        const {password}= req.body; // OR const password = req.body.password;
        const isspassword = await bcrypt.compare(password, user.password); //bcrypt.compare method is used to compare a plaintext password (password) with a hashed password (user.password).
    

        //password check
        if (isspassword) { //simply - user.password == req.body.password

            return res.status(200).json({ success: true, error: false, message: "login successful", user: user });
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