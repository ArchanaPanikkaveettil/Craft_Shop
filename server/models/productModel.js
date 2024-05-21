const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    
    shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'login_tb'},
    productname: { type: String, required: true },
    productprice: { type: String, required: true },
    productdescription: { type: String, required: true },
    productcategory: { type: String, required: true },
    subcategory :{type:String,required:true},
    productimage: { type: String, required: true },
    productquantity: { type: String, required: true },
    quantitytype: { type: String, required: true },

})

const productModel = mongoose.model('product_tb', productSchema)
module.exports = productModel

