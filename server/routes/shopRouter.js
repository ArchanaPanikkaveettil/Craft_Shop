const express = require('express');
const shopRouter = express.Router();
const mongoose = require('mongoose');

//models
const productModel = require('../models/productModel');
const CategoryModel = require('../models/CategoryModel');
const SubCategoryModel = require('../models/SubCategoryModel');


//routes



///////////////////
// product routes
///////////////////
//---------------------addproducts------------------------

shopRouter.post('/addproduct', async (req, res) => {

    try {

        let product = { shop_id: new mongoose.Types.ObjectId(req.body.shop_id), productname: req.body.productname, productprice: req.body.productprice, productdescription: req.body.productdescription, productcategory: req.body.productcategory, subcategory: req.body.subcategory, productimage: req.body.productimage, productquantity: req.body.productquantity, quantitytype: req.body.quantitytype, };
        console.log(product);
        let productData = await productModel(product).save();

        if (productData) {

            return res.status(201).json({ success: true, error: false, message: "Product added successfully", ProductDetails: productData });
        }

    } catch (error) {

        res.status(500).json({ success: false, error: true, message: "Something went wrong in adding product" });
    }

})

// ------------------------ view all products------------------------


shopRouter.get('/productdetails', async (req, res) => {

    try {

        const allProducts = await productModel.find();

        if (allProducts[0]) {

            return res.status(200).json({ success: true, error: false, message: "Products fetched successfully", Products: allProducts });
        }

        else {
            res.status(500).json({ success: true, error: false, message: "No Products found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing all product" });
    }


})

// ------------------------- view single product ------------------------------------

shopRouter.get('/productdetails/:id', async (req, res) => {

    try {

        const singleProduct = await productModel.findOne({ _id: req.params.id }) // oR productModel.findById(req.params.id);

        if (singleProduct) {

            return res.status(200).json({ success: true, error: false, message: "Product fetched successfully", ProductDetails: singleProduct });
        }

        else {
            res.status(500).json({ success: true, error: false, message: "No Product found" });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing single product" });
    }
})

// ------------------------- view all products under specific subcategory ------------------------------------

shopRouter.get('/subcatallproducts/:name', async (req, res) => {

    try {

        const allProducts = await productModel.find({ subcategory: req.params.name });
        console.log(allProducts);

        if (allProducts[0]) {

            return res.status(200).json({ success: true, error: false, message: "Products fetched successfully", Products: allProducts });
        }

        else {
            res.status(500).json({ success: true, error: false, message: "No Products found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing products under specific subcategory", error: error });
    }
})





// ---------------------- Update/Edit Product---------------------------------

shopRouter.put('/updateproduct/:id', async (req, res) => {

    try {

        const newData = {

            productname: req.body.productname,
            productprice: req.body.productprice,
            productdescription: req.body.productdescription,
            productcategory: req.body.productcategory,
            productimage: req.body.productimage

        }; console.log(newData);

        const updatedProduct = await productModel.updateOne({ _id: req.params.id }, { $set: newData });
        console.log(updatedProduct);

        if (updatedProduct.modifiedCount == 1) {

            return res.status(200).json({ success: true, error: false, message: "Product updated successfully", ProductDetails: newData });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "No Product found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in updating product" });
    }

})

// ---------------------- Delete Product ------------------------------

shopRouter.delete('/deleteproduct/:id', async (req, res) => {

    try {

        const deletedProduct = await productModel.deleteOne({ _id: req.params.id });

        if (deletedProduct.deletedCount == 1) {

            res.status(200).json({ success: true, error: false, message: "Product deleted successfully" });
        }
        else {

            return res.status(500).json({ success: true, error: false, message: "No Product found" });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in deleting product" });
    }

})




///////////////////
// category routes
///////////////////
// ----------------------------Add a product category--------------------------------------------------

shopRouter.post('/addproductcategory', async (req, res) => {

    try {

        //duplication check
        const existingCategory = await CategoryModel.findOne({ categoryname: req.body.categoryname });
        if (existingCategory) {

            return res.status(200).json({ success: true, error: false, message: "Product category already exists" });
        }

        //create new category
        const Category = { categoryname: req.body.categoryname, categorydescription: req.body.categorydescription, categoryimage: req.body.categoryimage };
        const addCategory = await CategoryModel(Category).save();
        console.log(addCategory);

        if (addCategory) {

            return res.status(200).json({ success: true, error: false, message: "Product category added successfully", CategoryDetails: addCategory });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "Product category not added" });
        }

    } catch (error) {

        return res.status(500).json({ success: false, error: true, message: "Something went wrong in adding product category", error: error });
    }

})

// ----------------------------View all product categories--------------------------------------------------

shopRouter.get('/productcategories', async (req, res) => {

    try {

        const allCategories = await CategoryModel.find();

        if (allCategories[0]) {

            return res.status(200).json({ success: true, error: false, message: "Product categories fetched successfully", Categories: allCategories });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "No Product categories found" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing all product categories", error: error });
    }

})

//-------------------------- View specific category --------------------------------------------------------------

shopRouter.get('/productcategories/:id', async (req, res) => {
    try {

        const specificCategory = await CategoryModel.findOne({ _id: req.params.id });

        if (specificCategory) {

            return res.status(200).json({ success: true, error: false, message: "Product category fetched successfully", CategoryDetails: specificCategory });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "No Product category found" });
        }

    } catch (error) {

        return res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing specific product category", error: error });
    }
})

//-------------------------- Update category --------------------------------------------------------------


shopRouter.put('/updatecategory/:id', async (req, res) => {

    try {

        const newData = {

            categoryname: req.body.categoryname,
            categorydescription: req.body.categorydescription,
            categoryimage: req.body.categoryimage

        }; console.log(newData);


        const updatedCategory = await CategoryModel.updateOne({ _id: req.params.id }, { $set: newData });
        console.log(updatedCategory);

        if (updatedCategory.modifiedCount == 1) {

            return res.status(200).json({ success: true, error: false, message: "Product category updated successfully", CategoryDetails: newData });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "No Product category found" });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in updating product category" });
    }

})

//-------------------------- Delete category --------------------------------------------------------------
shopRouter.delete('/deletecategory/:id', async (req, res) => {


    try {

        const deletedCategory = await CategoryModel.deleteOne({ _id: req.params.id });

        if (deletedCategory.deletedCount == 1) {

            res.status(200).json({ success: true, error: false, message: "Product category deleted successfully" });
        }
        else {

            return res.status(500).json({ success: true, error: false, message: "No Product category found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in deleting product category", error: error });
    }

})



///////////////////
// sub category routes
///////////////////


// ----------------------------Add a sub category--------------------------------------------------

shopRouter.post('/addsubcategory', async (req, res) => {

    try {

        //duplication check
        const existingCategory = await SubCategoryModel.findOne({ subcategoryname: req.body.subcategoryname });
        if (existingCategory) {

            return res.status(200).json({ success: true, error: false, message: "Sub category already exists" });
        }

        //create new category
        const Category = { categoryid: req.body.categoryid, subcategoryname: req.body.subcategoryname, subcategorydes: req.body.subcategorydes, subcategoryimg: req.body.subcategoryimg };
        const addCategory = await SubCategoryModel(Category).save();
        console.log(addCategory);

        if (addCategory) {

            return res.status(200).json({ success: true, error: false, message: "Sub category added successfully", CategoryDetails: addCategory });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "Sub category not added" });
        }

    } catch (error) {

        return res.status(500).json({ success: false, error: true, message: "Something went wrong in adding product category", error: error });
    }

})

// ----------------------------View all sub categories--------------------------------------------------

shopRouter.get('/subcategories', async (req, res) => {

    try {

        const allCategories = await SubCategoryModel.find();

        if (allCategories[0]) {

            return res.status(200).json({ success: true, error: false, message: "Sub categories fetched successfully", SubCategories: allCategories });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "No sub categories found" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing all Sub categories", error: error });
    }

})


// ---------------------------view specific subcategory ------------------------------------------------
shopRouter.get('/subcategories/:id', async (req, res) => {

    console.log(req.params.id);
    
    try {

        const specificSubCategory = await SubCategoryModel.findOne({ _id: req.params.id });

        if (specificSubCategory) {

            return res.status(200).json({ success: true, error: false, message: "Sub category fetched successfully", SubCategoryDetails: specificSubCategory });
        }
        else {
            return res.status(400).json({ success: true, error: false, message: "No Sub category found" });
        }

    } catch (error) {

        return res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing specific sub category", error: error });
    }
})



// ----------------------------View all sub category of specific main category--------------------------------------------------

shopRouter.get('/subcategoryof/:id', async (req, res) => {

    try {

        const subcategories = await SubCategoryModel.find({ categoryid: req.params.id });

        if (subcategories) {

            return res.status(200).json({ success: true, error: false, message: "Sub categories fetched successfully", SubCategories: subcategories });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "No sub categories found" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: true, message: "Something went wrong in viewing Sub categories", error: error });
    }

})


//-------------------------- Update category --------------------------------------------------------------


shopRouter.put('/updatesubcategory/:id', async (req, res) => {

    try {

        const newData = {

            subcategoryname: req.body.subcategoryname,
            subcategorydes: req.body.subcategorydes,
            subcategoryimg: req.body.subcategoryimg

        }; console.log(newData);


        const updatedCategory = await SubCategoryModel.updateOne({ _id: req.params.id }, { $set: newData });
        console.log(updatedCategory);

        if (updatedCategory.modifiedCount == 1) {

            return res.status(200).json({ success: true, error: false, message: "Sub category updated successfully", CategoryDetails: newData });
        }
        else {
            return res.status(500).json({ success: true, error: false, message: "No Sub category found" });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in updating Sub category" });
    }

})

//-------------------------- Delete category --------------------------------------------------------------

shopRouter.delete('/deletesubcategory/:id', async (req, res) => {


    try {

        const deletedCategory = await SubCategoryModel.deleteOne({ _id: req.params.id });

        if (deletedCategory.deletedCount == 1) {

            res.status(200).json({ success: true, error: false, message: "Sub category deleted successfully" });
        }
        else {

            return res.status(500).json({ success: true, error: false, message: "No Sub category found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong in deleting Sub category", error: error });
    }

})



module.exports = shopRouter;