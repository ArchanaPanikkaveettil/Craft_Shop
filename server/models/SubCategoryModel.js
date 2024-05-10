const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({

    categoryid : {type: Schema.Types.ObjectId, ref: 'product_category_tb'},
    subcategoryname: { type: String, required: true },
    subcategorydes: { type: String, required: true },
    subcategoryimg: { type: String, required: true },
})

const SubCategoryModel = mongoose.model('sub_category_tb', subcategorySchema);
module.exports = SubCategoryModel;