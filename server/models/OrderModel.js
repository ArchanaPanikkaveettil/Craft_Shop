const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    productId: { type: Schema.Types.ObjectId, ref: 'product_tb' },
    loginId: { type: Schema.Types.ObjectId, ref: 'user_reg_tb' },
    quantity: { type: String, required: true },
    // orderDate: { type: Date, default: Date.now() },
    // orderStatus: { type: String, required: true },

})

const orderModel = mongoose.model('order_tb', orderSchema);
module.exports = orderModel;