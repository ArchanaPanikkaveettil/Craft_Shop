import React, { useState } from 'react'
import AdminNav from '../components/AdminNav'
import '../styles/addcategory.css'
import axios from 'axios';

export default function AddCategory() {

    //form data
    const [categoryInput, setCategoryInput] = useState({
        categoryname: '',
        categorydescription: '',
        
    })
    console.log(categoryInput);

    const categoryInputChange = (e) => {

        const { name, value } = e.target;
        setCategoryInput({
            ...categoryInput,
            [name]: value
        })
    }

    //form validation
    const [errors, setErrors] = useState({});
    console.log('Validation Errors:', errors);

    const formValidation = (data) => {

        var error = {};

        if (!data.categoryname) {
            error.categoryname = "! Category Name is required";
        }

        if (!data.categorydescription) {
            error.categorydescription = "! Category Description is required";
        }

        return error;

    }

    //onsubmit 
    const add_category = () => {

        setErrors(formValidation(categoryInput));

        if (Object.keys(errors).length == 0) {

            axios.post('https://craft-shop-ftlg.onrender.com/shop/addproductcategory', categoryInput).then(res => {
                console.log('Added category details', res.data.CategoryDetails);
                alert(res.data.message);

            }).catch((err) => {
                console.log(err);
            })

        }

    }



    return (
        <>
            <AdminNav />

            <div class="registration-form" id="addcategorybody">
                <form>

                    <div class="form-group">
                        <span class='Errorspan' style={{ color: errors.categoryname ? "red" : "", }}>{errors.categoryname}</span>
                        <input type="text" class="form-control item" id="categoryname" name="categoryname" placeholder="category Name" onChange={categoryInputChange} onClick={() => { setErrors({ ...errors, categoryname: "" }) }} />
                    </div>

                    <div class="form-group">
                        <span class='Errorspan' style={{ color: errors.categorydescription ? "red" : "", }}>{errors.categorydescription}</span>
                        <input type="text" class="form-control item" id="categorydescription" name="categorydescription" placeholder="Category Description" onChange={categoryInputChange} onClick={() => { setErrors({ ...errors, categorydescription: "" }) }} />
                    </div>


                    <div class="form-group">
                        <button type="button" class="btn btn-block add-category" onClick={add_category}>Add category</button>
                    </div>

                </form>


            </div>


        </>
    )
}
