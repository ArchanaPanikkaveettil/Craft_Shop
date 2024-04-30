const mongoose = require('mongoose');
const Schema = mongoose.Schema; //mongoose has certains Schemas, it is called to a variable

//creating a Schema (schema is a blueprint for a collection)
const userRegSchema = new Schema({

    //defining collection structure.
    loginId: { type: Schema.Types.ObjectId, ref: 'login_tb' }, //Schema.Types.ObjectId - to store ObjectId values, -- is a data type provided by Mongoose, the ODM (Object Data Modeling) library for MongoDB and Node.js. //ref is used to refer another collection named 'login_tb'. This establishes a relationship between the current collection and the 'login_tb' collection
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },

})

const userRegModel = mongoose.model('user_reg_tb', userRegSchema); //assigned mongoose model to a variable // ( name of the model/collection , structure )
module.exports = userRegModel; 