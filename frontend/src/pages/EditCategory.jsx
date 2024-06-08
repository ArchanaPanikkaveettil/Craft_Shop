import React, { useEffect, useState } from 'react'
import '../styles/editcategory.css'
import AdminNav from '../components/AdminNav'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditCategory() {

  const [categoryInput, setCategoryInput] = useState({})
  console.log('Data', categoryInput);

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

  // const [oldData, setOldData] = useState([]);
  // console.log('oldData:', oldData);

  const categoryId = useParams().id;
  // console.log('categoryId:', categoryId);

  useEffect(() => {

    axios.get(`https://craft-shop-ftlg.onrender.com/shop/productcategories/${categoryId}`).then((res) => {
      // console.log('res:', res.data.CategoryDetails);
      setCategoryInput(res.data.CategoryDetails);
    }).catch((err) => {
      console.log('err:', err);
    })

  }, [])



  const edit_category = () => {

    setErrors(formValidation(categoryInput));

    if (Object.keys(errors).length == 0) {

      axios.put(`https://craft-shop-ftlg.onrender.com/shop/updatecategory/${categoryId}`, categoryInput).then((res) => {

        console.log('Udated Data :', res.data);

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
            <input type="text" class="form-control item" id="categoryname" name="categoryname" placeholder="category Name" value={categoryInput.categoryname} onChange={categoryInputChange} onClick={() => { setErrors({ ...errors, categoryname: "" }) }} />
          </div>

          <div class="form-group">
            <span class='Errorspan' style={{ color: errors.categorydescription ? "red" : "", }}>{errors.categorydescription}</span>
            <input type="text" class="form-control item" id="categorydescription" name="categorydescription" placeholder="Category Description" value={categoryInput.categorydescription} onChange={categoryInputChange} onClick={() => { setErrors({ ...errors, categorydescription: "" }) }} />
          </div>


          <div class="form-group">
            <button type="button" class="btn btn-block add-category" onClick={edit_category}>Update category</button>
          </div>

        </form>


      </div>
    </>
  )
}
