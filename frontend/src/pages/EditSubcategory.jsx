import React, { useEffect, useState } from 'react'
import '../styles/addsubcategory.css'
import AdminNav from '../components/AdminNav'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function EditSubcategory() {



    const subid = useParams().id;
    console.log('sub category id', subid);


    //form data
    const [subCategoryInput, setsubCategoryInput] = useState({})
    console.log('Sub Category Info', subCategoryInput);

    const subCategoryInputChange = (e) => {

        const { name, value } = e.target;
        setsubCategoryInput({
            ...subCategoryInput,
            [name]: value
        })
    }

    //form validation
    const [errors, setErrors] = useState({});
    console.log('Validation Errors:', errors);

    const formValidation = (data) => {

        var error = {};

        if (!data.subcategoryname) {
            error.subcategoryname = "! Sub Category Name is required";
        }

        if (!data.subcategorydes) {
            error.subcategorydes = "! Sub Category Description is required";
        }

        if (!data.subcategoryimg) {
            error.subcategoryimg = "! sub Category Image is required";
        }

        if (!data.categoryid) {
            error.categoryid = '! Product Category is required';
        }

        return error;

    }

    //onsubmit 
    const edit_subcategory = () => {

        setErrors(formValidation(subCategoryInput));

        if (Object.keys(errors).length == 0) {

            axios.post('https://craft-shop-ftlg.onrender.com/shop/addsubcategory', subCategoryInput).then(res => {
                console.log('Added category details', res.data);
                alert(res.data.message);


            }).catch((err) => {
                console.log(err);
            })

        }

    }


    const [productcategories, setProductcategories] = useState([])
    console.log('Product Categories', productcategories);

    useEffect(() => {

        axios.get('https://craft-shop-ftlg.onrender.com/shop/productcategories').then((res) => {
            // console.log('Product Categories', res.data.Categories);
            setProductcategories(res.data.Categories);

        }).catch((err) => {
            console.log(err);
        })


        axios.get(`https://craft-shop-ftlg.onrender.com/shop/subcategories/${subid}`).then((res) => {
            // console.log('Product Sub Category Info', res.data);
            setsubCategoryInput(res.data.SubCategoryDetails);
        }).catch((err) => {
            console.log(err);
        })

    }, [])




    return (
        <>
            <AdminNav />

            <div class="registration-form" id="add_subcategorybody">
                <form>

                    <div class="form-group">
                        <span class='Errorspan' style={{ color: errors.subcategoryname ? "red" : "", }}>{errors.subcategoryname}</span>
                        <input type="text" class="form-control item" id="subcate_goryname" name="subcategoryname" placeholder="Sub Category Name" value={subCategoryInput.subcategoryname} onChange={subCategoryInputChange} onClick={() => { setErrors({ ...errors, subcategoryname: "" }) }} />
                    </div>

                    <div class="form-group">
                        <span class='Errorspan' style={{ color: errors.subcategorydes ? "red" : "", }}>{errors.subcategorydes}</span>
                        <input type="text" class="form-control item" id="subcategorydes" name="subcategorydes" placeholder="Sub Category Description" value={subCategoryInput.subcategorydes} onChange={subCategoryInputChange} onClick={() => { setErrors({ ...errors, subcategorydes: "" }) }} />
                    </div>


                    <div id='selectcategory' class="form-group">
                        <span class='Errorspan' style={{ color: errors.categoryid ? "red" : "" }}>{errors.categoryid}</span>
                        <select
                            class='form-control'
                            name="categoryid"
                            id="categoryid"
                            onChange={subCategoryInputChange}
                            onClick={() => { setErrors({ ...errors, categoryid: "" }) }}
                            value={subCategoryInput.categoryid}
                        >
                            <option value="">Select Category</option>

                            {productcategories.map((item) => (

                                <option value={item._id}>{item.categoryname}</option>

                            ))}
                        </select>
                        <br />
                    </div>


                    <div id='selectimage' class="form-group">
                        <label id='subcategory_img' for="formFile" class="form-label">Sub Category Image</label>
                        <input class="form-control" name="subcategoryimg" type="file" id="formFile" onChange={subCategoryInputChange} onClick={() => { setErrors({ ...errors, subcategoryimg: "" }) }} />
                        <span class='Errorspan' style={{ color: errors.subcategoryimg ? "red" : "", }}>{errors.subcategoryimg}</span>
                    </div>


                    <div class="form-group">
                        <button type="button" class="btn btn-block add-sub-category" onClick={edit_subcategory}>Edit Sub category</button>
                    </div>

                </form>


            </div>
        </>
    )
}
