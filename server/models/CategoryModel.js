const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({

    categoryname: { type: String, required: true },
    categorydescription: { type: String, required: true },
    categoryimage: { type: String, required: true },
})

const CategoryModel = mongoose.model('product_category_tb', categorySchema);
module.exports = CategoryModel;