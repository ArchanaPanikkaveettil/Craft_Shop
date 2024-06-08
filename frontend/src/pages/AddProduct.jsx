import React, { useEffect, useState } from 'react'
import '../styles/addproduct.css'
import AdminNav from '../components/AdminNav'
import axios from 'axios';


export default function AddProduct() {

    const [file, setFile] = useState('');//1.state to keep details(file name, size, path) of uploaded file

    //form data
    const [productInput, setProductInput] = useState({

        productname: '',
        productprice: '',
        productdescription: '',
        productquantity: '',
        quantitytype: '',
        subcategory: '',
        productimage: '', //2.key to store image file name

        // productcategory initial value is not set - to do conditional rendering
        //it will be set when user selects category from dropdown
    })
    console.log(productInput);

    //function for uploading values to usestate productInput
    const productInputChange = (event) => {

        const { name, value } = event.target;
        setProductInput({ ...productInput, [name]: value })

    }

    //form validation
    const [formError, setFormError] = useState({});
    console.log('Form Validation Errors', formError);


    const formValidation = (data) => {

        var error = {};

        if (!data.productname) {
            error.productname = '! Product Name is required';
        }

        if (!data.productprice) {
            error.productprice = '! Enter Product Price';
        }

        if (!data.productdescription) {
            error.productdescription = '! Product Description is required';
        }

        if (!data.productcategory) {
            error.productcategory = '! Product Category is required';
        }

        if (!data.subcategory) {
            error.subcategory = '! Product Subcategory is required';
        }

        if (!data.productimage) {
            error.productimage = '! Product Image is required';
        }

        if (!data.productquantity) {
            error.productquantity = '! Enter Product Quantity';
        }

        if (!data.quantitytype) {
            error.quantitytype = '! Enter Quantity Type';
        }

        return error;
    }


    const addnewProduct = () => {

        setFormError(formValidation(productInput));

        if (Object.keys(formError).length == 0) {

            //we have 2 objects - one which have file details - other which have form inputs/data
            //3.  pass data, from both object to an api => convert to formdata method

            const Data = new FormData(); //4.  create a formdata object

            const filename = file.name; //5.  get file name

            //to add data to formdata-->data.append

            //6.  pass image data to formdata
            Data.append('name', filename);  //file name
            Data.append('file', file);     //file object

            //7.  pass form data to api
            Data.append('productname', productInput.productname);
            Data.append('productprice', productInput.productprice);
            Data.append('productdescription', productInput.productdescription);
            Data.append('productcategory', productInput.productcategory);
            Data.append('subcategory', productInput.subcategory);
            Data.append('productquantity', productInput.productquantity);


            //8.  pass Data to api instead of productInput
            axios.post('https://craft-shop-ftlg.onrender.com/shop/addproduct', Data).then((res) => {
                console.log('Product Added Details', res.data);
                alert(res.data.message);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const [productcategories, setProductcategories] = useState([])
    console.log('Product Categories', productcategories);

    const [subcategories, setSubcategories] = useState([])
    console.log('Product Subcategories', subcategories);


    useEffect(() => {

        axios.get('https://craft-shop-ftlg.onrender.com/shop/productcategories').then((res) => {
            // console.log('Product Categories', res.data.Categories);
            setProductcategories(res.data.Categories);

        }).catch((err) => {
            console.log(err);
        })

    }, [])



    useEffect(() => {

        const category_id = productInput.productcategory;
        console.log('Category Id', category_id);

        axios.get(`https://craft-shop-ftlg.onrender.com/shop/subcategoryof/${category_id}`).then((res) => {
            console.log('Product Subcategories', res.data);
            setSubcategories(res.data.SubCategories);
        })
            .catch((err) => {
                console.log(err);
            })
    }, [productInput.productcategory]) //subcategory only shows if category is selected



    return (
        <>

            <AdminNav />

            <div class="registration-form" id="addproductbody">
                <form>

                    <div class="form-group">
                        <span class='errorspan' style={{ color: formError.productname ? "red" : "", }}>{formError.productname}</span>
                        <input type="text" class="form-control item" id="productname" name="productname" placeholder="Product Name" onChange={productInputChange} onClick={() => { setFormError({ ...formError, productname: "" }) }} />
                    </div>


                    <div class="form-group">
                        <span class='errorspan' style={{ color: formError.productdescription ? "red" : "" }}>{formError.productdescription}</span>
                        <input type="text" class="form-control item" id="productdescription" name="productdescription" placeholder="Description" onChange={productInputChange} onClick={() => { setFormError({ ...formError, productdescription: "" }) }} />
                    </div>



                    <div style={{ display: "flex" }}>
                        <span class='errorspan' style={{ color: formError.productprice ? "red" : "" }}>{formError.productprice}</span>
                        <span class='errorspan' style={{ color: formError.productquantity ? "red" : "" }}>{formError.productquantity}</span>
                        <span class='errorspan' style={{ color: formError.quantitytype ? "red" : "" }}>{formError.quantitytype}</span>
                    </div>

                    <div class="form-group" style={{ display: "flex" }}>

                        <input type="text" class="form-control item" id="productprice" name="productprice" placeholder="Price in Rs" onChange={productInputChange} onClick={() => { setFormError({ ...formError, productprice: "" }) }} />

                        <input type="text" class="form-control item" id="productquantity" name="productquantity" placeholder="Total Quantity" onChange={productInputChange} onClick={() => { setFormError({ ...formError, productquantity: "" }) }} />

                        <select
                            class='form-control'
                            name="quantitytype"
                            id="quantitytype"
                            onChange={productInputChange}
                            onClick={() => { setFormError({ ...formError, quantitytype: "" }) }}
                        >
                            <option value='Piece'>Piece</option>
                            <option value='Packet'>Packet</option>
                            <option value='Packet'>meter</option>
                        </select>
                    </div>





                    <div id='selectcategory' class="form-group">
                        <span class='errorspan' style={{ color: formError.productcategory ? "red" : "" }}>{formError.productcategory}</span>
                        <select
                            class='form-control'
                            name="productcategory"
                            id="productcategory"
                            onChange={productInputChange}
                            onClick={() => { setFormError({ ...formError, productcategory: "" }) }}
                        >
                            <option value="">Select Category</option>

                            {productcategories.map((item) => (

                                <option value={item._id}>{item.categoryname}</option>

                            ))}
                        </select>
                        <br />
                    </div>

                    {/* conditional rendering if any value in subcategories*/}

                    {productInput.productcategory ? (
                        <div id="selectsubcategory" class="form-group">
                            <span class='errorspan' style={{ color: formError.subcategory ? "red" : "" }}>{formError.subcategory}</span>
                            <select
                                class='form-control'
                                name="subcategory"
                                id="subcategory"
                                onChange={productInputChange}
                                onClick={() => { setFormError({ ...formError, subcategory: "" }) }}
                            >
                                <option value="">Select Sub Category</option>

                                {subcategories.map((item) => (

                                    <option value={item.subcategoryname}>{item.subcategoryname}</option>

                                ))}
                            </select>
                            <br />
                        </div>
                    ) : ('')}

                    <div id='selectimage' class="form-group">
                        <label id='productimage' for="formFile" class="form-label">Product Image</label>
                        <input class="form-control" name="productimage" type="file" id="formFile" onChange={productInputChange} onClick={() => { setFormError({ ...formError, productimage: "" }) }} />
                        <span class='errorspan' style={{ color: formError.productimage ? "red" : "" }}>{formError.productimage}</span>
                    </div>


                    <div class="form-group">
                        <button type="button" class="btn btn-block add-product" onClick={addnewProduct}>Add Product</button>
                    </div>

                </form>


            </div>


        </>
    )
}
