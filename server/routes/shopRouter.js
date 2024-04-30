const express = require('express');
const shopRouter = express.Router();
const mongoose = require('mongoose');

//models
const loginModel = require('../models/LoginModel');
const productModel = require('../models/productModel');



//routes

shopRouter.post('/addproduct', async (req, res) => {

    try {

        let product = {shop_id: new mongoose.Types.ObjectId(req.body.shop_id), productname: req.body.productname, productprice: req.body.productprice, productdescription: req.body.productdescription, productcategory: req.body.productcategory,  productimage: req.body.productimage};

    } catch (error) {

        res.status(500).json({ success: false, error: true, message: "Something went wrong in adding product" });
    }

})

module.exports = shopRouter;