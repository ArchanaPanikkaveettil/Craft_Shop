const express = require('express');
const CartRouter = express.Router();

const mongoose = require('mongoose');
const cartModel = require('../models/CartModel');
const OrderModel = require('../models/OrderModel');
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

            return res.status(201).json({ success: true, error: false, message: "Product Added to cart", details: result });
        }
        else {

            return res.status(400).json({ success: false, error: true, message: "Product not added to cart" });
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

                const total = cartdata[i].productprice * cartdata[i].quantity; //price according to quantity
                console.log('price total', total);
                cartdata[i].total = total;  //replacing total in cartdata 

                grandtotal = grandtotal + total; //grandtotal
            }

            return res.status(200).json({ success: true, error: false, message: "cart items", grandtotal: grandtotal, details: cartdata });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "cart items not found" });
        }

    }
    catch (error) {

        return res.status(400).json({ success: false, error: true, message: "something went wrong in getting cart items" });
    }
})

CartRouter.delete('/deletecartitem/:id', checkAuth, async (req, res) => { //id - cart_id

    try {

        const deleteItem = await cartModel.deleteOne({ _id: req.params.id })

        if (deleteItem.deletedCount == 1) {

            return res.status(200).json({ success: true, error: false, message: "cart item deleted" });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "cart item not deleted" });
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
        console.log(cart_id);

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



// ----------------------------------------------------------------------------------


//order placing
CartRouter.post('/placeorder', checkAuth, async (req, res) => {

    try {

        const orders = await cartModel.find({ loginId: req.userData.loginId }); //array
        console.log('cart data', orders);

        for (i = 0; i < orders.length; i++) {

            const orderData = {

                productId: orders[i].productId,
                quantity: orders[i].quantity,
                loginId: orders[i].loginId,
                // orderDate: new Date(),
                orderStatus: "pending"
            }
            console.log('order data', orderData);


            const orderPlacing = await OrderModel(orderData).save();
            console.log('orderPlacing', orderPlacing);

            if (orderPlacing) {

                const deleteCart = await cartModel.deleteMany({ loginId: req.userData.loginId });
                console.log('deleteCart', deleteCart);
            }
        }

        
        return res.status(200).json({ success: true, error: false, message: "order placed successfully"});
        
    }
    catch (error) {
        return res.status(400).json({ success: false, error: true, message: "something went wrong in placing order" });
    }

})


//placed order details
CartRouter.get('/orderdetails', checkAuth, async (req, res) => {

    try {


        //aggregation
        const orderDetails = await OrderModel.aggregate([

            {
                '$lookup': {
                    'from': 'user_reg_tbs',
                    'localField': 'loginId',
                    'foreignField': 'loginId',
                    'as': 'UserData'
                }
            },
            {
                '$lookup': {
                    'from': 'product_tbs',
                    'localField': 'productId',
                    'foreignField': '_id',
                    'as': 'ProductData'
                }
            },
            {
                '$unwind': '$UserData'
            },
            {
                '$unwind': '$ProductData'
            },
            // {
            //     '$match': {
            //         'loginId': new mongoose.Types.ObjectId(req.userData.loginId)
            //     }
            // },
            {
                '$group': {
                    '_id': '$_id',
                    'productId': { '$first': '$productId' },
                    'Productquantity': { '$first': '$quantity' },
                    'UserloginId': { '$first': '$loginId' },
                    'Username': { '$first': '$UserData.name' },
                    'Useremail': { '$first': '$UserData.email' },
                    'Usermobile': { '$first': '$UserData.phone' },
                    'Useraddress': { '$first': '$UserData.address' },
                    'productName': { '$first': '$ProductData.productname' },
                    'productprice': { '$first': '$ProductData.productprice' },
                    'productImage': { '$first': '$ProductData.productimage' },

                }
            }

        ])
        console.log('orderDetails', orderDetails);

        //price calculation
        if (orderDetails) {

            let grandtotal = 0;
            for (i = 0; i < orderDetails.length; i++) {

                const productprice = orderDetails[i].productprice * orderDetails[i].Productquantity; //price according to quantity
                console.log('price total', productprice);
                orderDetails[i].productprice = productprice;  //replacing total in orderDetails 

                grandtotal = grandtotal + productprice; //grandtotal
                console.log('grandtotal',grandtotal);
            }
            return res.status(200).json({ success: true, error: false, message: "order details", orderDetails: orderDetails, grandtotal: grandtotal });
        }

        else {
            return res.status(500).json({ success: true, error: false, message: "order details not found" });
        }

    }
    catch (error) {
        return res.status(500).json({ success: false, error: true, message: "something went wrong in viewing order details" });
    }
})




module.exports = CartRouter;
