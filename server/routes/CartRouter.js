const express = require('express');
const CartRouter = express.Router();

const cartModel = require('../models/CartModel');
const checkAuth = require('../middlewares/checkAuth');


CartRouter.post('/addtocart', checkAuth, async (req, res) => {

    try {

        console.log(req.userData);

        let cart = {

            loginId: req.userData.loginId,
            productId: req.body.productId,
            quantity: req.body.quantity

        }
        console.log('cart', cart);

        const result = await cartModel(cart).save();
        console.log('result', result);

        if (result) {

            res.status(201).json({ success: true, error: false, message: "Product Added to cart", details: result });
        }
        else {
            
            res.status(400).json({ success: false, error: true, message: "Product not added to cart" });
        }

    }
    catch (error) {
        
        return res.status(400).json({ success: false, error: true, message: "something went wrong in adding to cart"});
    }

})

module.exports = CartRouter;
