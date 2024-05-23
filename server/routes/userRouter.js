const express = require('express'); //imports the Express framework module. It allows us to create an Express application.
const userRouter = express.Router(); //creates an instance of the Express router.// This is the route handler for the GET /users endpoint.
const mongoose = require('mongoose'); //importing mongoose
const bcrypt = require('bcrypt'); //bcrypt is a library for hashing and salting passwords.

//import models

const loginModel = require('../models/LoginModel');



// creating routes and handling requests


//-------------------------user registration-------------------------


userRouter.post('/adduser', async (req, res) => { //posting data to the database.

    try {
        console.log(req.body);
        // old user check --- avoid duplication --- if anyone of the following conditions is true, the user is not allowed to register.

        //condition1 - username already exists
        const oldUser = await loginModel.findOne({ username: req.body.username }); //findOne - here search for object where the username field in dB matches the username value obtained from the request body (user).
        if (oldUser) {
            return res.status(201).json({ success: false, error: true, message: "user already exists" });
        }

        //condition2 - phone no already exists 
        const oldPhone = await userRegModel.findOne({ phone: req.body.phone });
        console.log(oldPhone);
        if (oldPhone) {
            return res.status(201).json({ success: false, error: true, message: "phone number already exists" });
        }

        //condition3 - email already exists
        const oldEmail = await userRegModel.findOne({ email: req.body.email });
        if (oldEmail) {
            return res.status(201).json({ success: false, error: true, message: "email already exists" });
        }

        // --------------------------------------

        //post data to db - if all conditions are false ^ - ie;new user.
        //Using 2 tables to store data, one for user login and another for user registration.


        const hashedPassword = await bcrypt.hash(req.body.password, 12); //hashing means converting a plain text password into a hashed string.

        //table1-login
        let log = { username: req.body.username, password: hashedPassword, role: 1 }; //getting data from the request body to the database. // log is a object containing user login details.
        const logData = await loginModel(log).save();//save data to login db.//DB loginModel is called and create a new document with specified data - which is the log object. //logData - variable to store the result of the save() method.

        //table2-reg
        let reg = { loginId: logData._id, name: req.body.name, address: req.body.address, phone: req.body.phone, gender: req.body.gender, email: req.body.email, role: 1 }; //getting data from the request body to the database. // reg is a object containing user registration details.
        const regData = await userRegModel(reg).save();
        console.log(regData);

        //response 
        if (regData) {
            return res.status(201).json({ success: true, error: false, message: "user registered successfully", RegistrationData: regData });
        }

    } catch (error) {

        res.status(500).json({ success: false, error: true, message: "something went wrong in backend" });
        console.log(error);
    }


})



// -------------------------to view all registered users-------------------------------------------


userRouter.get('/userdetails', async (req, res) => {

    try {
        const users = await userRegModel.find(); //finds all documents in the collection.

        if (users[0]) { // checks if the 'users' array contains at least one document.

            return res.status(200).json({ success: true, error: false, data: users });
        }
        else {

            return res.status(400).json({ success: false, error: true, message: "No data found" })
        }


    } catch (error) {

        return res.status(400).json({ success: false, error: true, message: "something went wrong" })

    }

})

// ------------------------------------- User Profile -----------------------------------------


userRouter.get('/userprofile/:id', async (req, res) => {

    try {

        const id = req.params.id; //getting the id from the url

        const data = await userRegModel.aggregate([

            {
                '$lookup': {
                    'from': 'login_tbs',
                    'localField': 'loginId',
                    'foreignField': '_id',
                    'as': 'login_details'
                }
            },

            {
                '$unwind': '$login_details' //deconstruct an array field and output separate documents for each element.// :name of the array field you want to unwind.
            },

            //only data of user that match the id of in both table is shown

            {
                '$match': {
                    'loginId': new mongoose.Types.ObjectId(id) // display data of the user that matches the loginId, can change to _id ie; reg id
                }
            },

            // to filter the data to be displayed

            {
                '$group': {

                    '_id': '$_id',
                    'name': { '$first': '$name' }, //from 2nd element use $first keyword
                    'address': { '$first': '$address' },
                    'phone': { '$first': '$phone' },
                    'gender': { '$first': '$gender' },
                    'email': { '$first': '$email' },
                    'username': { '$first': '$login_details.username' },
                    'loginId': { '$first': '$login_details._id' },
                }
            }

        ])

        if (data) {

            return res.status(200).json({ success: true, error: false, user_profile: data });

        }
        else {

            return res.status(400).json({ success: false, error: true, message: "No data found" })
        }

    } catch (error) {

        return res.status(400).json({ success: false, error: true, message: "something went wrong" })

    }

})


// --------------------------------------Delete user--------------------------------------------------

userRouter.delete('/deleteuser/:id', async (req, res) => {

    try {

        // deleting user frm reg table
        const deleteUser = await userRegModel.deleteOne({ loginId: req.params.id }); //deleting the user that matches the loginId
        console.log(deleteUser) // { acknowledged: true, deletedCount: 1 }


        if (deleteUser.deletedCount == 1) { // if the user is deleted from the reg table

            // deleting user frm login table
            const deleteLogin = await loginModel.deleteOne({ _id: req.params.id }); //deleting the user that matches the loginId

            return res.status(200).json({ success: true, error: false, message: "user deleted successfully" });

        }
        else {

            return res.status(400).json({ success: false, error: true, message: "User Not deleted" })
        }

    } catch (error) {

        return res.status(500).json({ success: false, error: true, message: "something went wrong", errormessage: error.message })
    }

})


// --------------------------------------Update user--------------------------------------------------


userRouter.post('/updateuser/:id', async (req, res) => {

    try {
        //updated user info
        const updatedData = {

            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            gender: req.body.gender
        };
        console.log(updatedData); 

        //updating user in reg table DB
        const updatedUser = await userRegModel.updateOne({ _id: req.params.id }, {$set : updatedData});
        console.log(updatedUser); //{acknowledged: true, modifiedCount: 1, upsertedId: null, upsertedCount: 0, matchedCount: 1}


        if (updatedUser.modifiedCount == 1) {
            
            return res.status(200).json({ success: true, error: false, message: "user updated successfully", UpdatedInfo : updatedData  });
        }
        else{

            return res.status(400).json({ success: false, error: true, message: "user not updated" });
        }


    } catch (error) {

        return res.status(500).json({ success: false, error: true, message: "something went wrong", error_message: error.message })
    }






})
module.exports = userRouter //exporting router to server.js
