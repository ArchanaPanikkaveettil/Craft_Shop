const express = require('express');
const CartRouter = express.Router();

const mongoose = require('mongoose');
const cartModel = require('../models/CartModel');
const checkAuth = require('../middlewares/checkAuth');


CartRouter.post('/addtocart', checkAuth, async (req, res) => {

    try {

        console.log('front end', req.body);
        console.log('user data ', req.userData);
        console.log('product id ', req.body._id);

        let cart = {

            loginId: req.userData.loginId,
            productId: req.body._id,
            quantity: req.body.quantity,

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

        return res.status(400).json({ success: false, error: true, message: "something went wrong in adding to cart" });
    }

})

CartRouter.get('/getcartitems', checkAuth, async (req, res) => {

    try {

        const cartdata = await cartModel.aggregate([

            {

                '$lookup': {
                    'from': 'product_tbs',
                    'localField': 'productId',
                    'foreignField': '_id',
                    'as': 'product_details'
                }

            },

            {
                '$unwind': '$product_details'
            },

            {
                '$match': {
                    'loginId': new mongoose.Types.ObjectId(req.userData.loginId)
                }
            },

            {
                '$group': {

                    '_id': '$_id',
                    'quantity': { '$first': '$quantity' },
                    'loginId': { '$first': '$loginId' },
                    'productId': { '$first': '$productId' },
                    'productname': { '$first': '$product_details.productname' },
                    'productprice': { '$first': '$product_details.productprice' },
                    'productimage': { '$first': '$product_details.productimage' },


                }
            }

        ])

        if (cartdata) {

            let grandtotal = 0;
            for (i = 0; i < cartdata.length; i++) {

                const total = cartdata[i].productprice * cartdata[i].quantity;
                console.log('prise total', total);
                cartdata[i].total = total;
                grandtotal = grandtotal + total;
            }

            res.status(200).json({ success: true, error: false, message: "cart items", grandtotal: grandtotal, details: cartdata });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "cart items not found" });
        }

    }
    catch (error) {

        return res.status(400).json({ success: false, error: true, message: "something went wrong in getting cart items" });
    }
})

CartRouter.delete('/deletecartitem/:id', checkAuth, async (req, res) => {

    try {

        const deleteItem = await cartModel.deleteOne({ _id: req.params.id })

        if (deleteItem.deletedCount == 1) {

            res.status(200).json({ success: true, error: false, message: "cart item deleted" });
        }
        else {
            res.status(500).json({ success: true, error: false, message: "cart item not deleted" });
        }
    }
    catch (error) {
        return res.status(400).json({ success: false, error: true, message: "something went wrong in deleting cart item" });
    }

})

CartRouter.delete('/clearcart', checkAuth, async (req, res) => {

    try {

        const clearCart = await cartModel.deleteMany({ loginId: req.userData.loginId })

        if (clearCart) {
            res.status(200).json({
                success: true, error: false, message: "cart cleared", details: clearCart
            });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "cart not cleared" });
        }

    }
    catch {
        return res.status(400).json({ success: false, error: true, message: "something went wrong in clearing cart" });
    }
})

//product quantity increment
CartRouter.put('/increment/:id', checkAuth, async (req, res) => { //id - cart_id

    try {

        cart_id = req.params.id;

        const productInfo = await cartModel.findOne({ _id: cart_id });
        console.log(productInfo);

        if (productInfo) {

            const increment = parseInt(productInfo.quantity) + 1; //or 5+1=51
            console.log(increment);

            const updateProduct = await cartModel.updateOne({ _id: cart_id }, { $set: { quantity: increment } });

            if (updateProduct.modifiedCount == 1) {
                res.status(200).json({ success: true, error: false, message: "product quantity incremented" });
            }
            else {
                res.status(500).json({ success: true, error: false, message: "product quantity not updated" });
            }
        }
    }
    catch (error) {
        return res.status(400).json({ success: false, error: true, message: "something went wrong in incrementing product item" });
    }
})

//product quantity decrement
CartRouter.put('/decrement/:id', checkAuth, async (req, res) => { //id - cart_id

    try {

        cart_id = req.params.id;

        const productInfo = await cartModel.findOne({ _id: cart_id });
        console.log(productInfo);

        if (productInfo) {

            const decrement = parseInt(productInfo.quantity) - 1;
            console.log(decrement)

            const updateProduct = await cartModel.updateOne({ _id: cart_id }, { $set: { quantity: decrement } });

            if (updateProduct.modifiedCount == 1) {
                res.status(200).json({ success: true, error: false, message: "product quantity decremented" });
            }
            else {
                res.status(500).json({ success: true, error: false, message: "product quantity not updated" });
            }
        }


    }
    catch (error) {
        return res.status(400).json({ success: false, error: true, message: "something went wrong in decrementing product item" });
    }

})

//product price according to quantity
CartRouter.put('/price/:id', checkAuth, async (req, res) => {

    try {

        const cart_id = req.params.id;

        const cartdata = await cartModel.aggregate([

            {

                '$lookup': {
                    'from': 'product_tbs',
                    'localField': 'productId',
                    'foreignField': '_id',
                    'as': 'product_details'
                }

            },

            {
                '$unwind': '$product_details'
            },

            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(cart_id)
                }
            },

            {
                '$group': {

                    '_id': '$_id',
                    'quantity': { '$first': '$quantity' },
                    'loginId': { '$first': '$loginId' },
                    'productId': { '$first': '$productId' },
                    'productname': { '$first': '$product_details.productname' },
                    'productprice': { '$first': '$product_details.productprice' },
                }
            }

        ])
        console.log(cartdata);

        if (cartdata) {


            const price = parseInt(cartdata[0].productprice) * parseInt(cartdata[0].quantity);
            console.log('price', price);

            const updateProduct = await cartModel.updateOne({ _id: cart_id }, { $set: { productprice: price } });
            console.log('updated Product Info', updateProduct);

            if (updateProduct.modifiedCount == 1) {
                res.status(200).json({ success: true, error: false, message: "product price", price: price });
            }

            else {
                res.status(500).json({ success: true, error: false, message: "product price not updated" });
            }

        }
        else {
            return res.status(500).json({ success: true, error: false, message: "cart items not found" });
        }
    }
    catch (error) {
        return res.status(400).json({ success: false, error: true, message: "something went wrong in updating product price" });
    }
})


//total price
// CartRouter.get("/totalprice", async (req, res) => {


// })


module.exports = CartRouter;
