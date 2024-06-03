const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({

    productId: { type: Schema.Types.ObjectId, ref: 'product_tb' },
    quantity: { type: String, required: true, default: 1 },
    loginId: { type: Schema.Types.ObjectId, ref: 'user_reg_tb' },
})

const cartModel = mongoose.model('cart_tb', cartSchema);
module.exports = cartModel;