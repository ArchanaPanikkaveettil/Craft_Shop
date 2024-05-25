import React, { useEffect, useState } from 'react'
import '../styles/shop.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from '../components/AdminNav';


export default function Shop() {



    //category list--------------------
    const [categorylist, Setcategorylist] = useState([]);

    useEffect(() => {

        axios.get('https://craft-shop-ftlg.onrender.com/shop/productcategories').then(res => {
            console.log(res.data);
            Setcategorylist(res.data.Categories);

        })

            .catch(err => {
                console.log('Error fetching categories:', err);
            })

    }, []);

    console.log(categorylist);

    //--------------------- category list


    //delete category
    const Deletecategory = (id) => {

        axios.delete(`https://craft-shop-ftlg.onrender.com/shop/deletecategory/${id}`).then(res => {
            console.log(res.data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })

    }


    return (
        <>

            {/*---------------navbar------------------- */}


            <AdminNav />

            {/* -----------------product categories----------- */}


            <div id='productcategories'>

                <h3 id='categoryhead'>Product Categories</h3>

                <div class="row" id='categorylist'>

                    {categorylist.map((item) => (

                        <div class="col-sm-4" id="carditems" data-aos="fade-down">

                            <h3 class="card-title" id='cardtitle'>{item.categoryname}</h3>
                            <p class="card-text" id='categorydes'>{item.categorydescription}</p>
                            <Link to={`/category/${item._id}`}>
                                <button class="btn" id='checkout' >Check Out</button>
                            </Link>

                            <button class="btn" id='edit_btn' onClick={() => { window.location.href = `/editcategory/${item._id}` }}>Edit</button>

                            <button class="btn" id='delete_btn' onClick={() => { Deletecategory(item._id) }} >Delete</button>

                        </div>

                    ))}

                </div>

            </div>

        </>
    )
}
