import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/subcategory.css'
import Navbar from '../components/Navbar';



export default function SubCategories() {


    const role = sessionStorage.getItem('role');

    const [subcategory, setSubcategory] = useState([]);
    console.log('SubCategories', subcategory);


    const { id } = useParams();

    useEffect(() => {


        axios.get(`https://craft-shop-ftlg.onrender.com/shop/subcategoryof/${id}`).then((response) => {

            // console.log(response.data);
            setSubcategory(response.data.SubCategories);

        }).catch((err) => {
            console.log(err);
        })

    }, [])

    //delete sub category
    const Deletesubcategory = (id) => {

        axios.delete(`https://craft-shop-ftlg.onrender.com/shop/deletesubcategory/${id}`).then(res => {
            console.log(res.data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })

    }


    return (
        <>
            <Navbar />


            <div class="categorylist" id='categorybody'>

                <div class="row">

                    {subcategory.map((item) => (

                        <div class="col-lg-3">
                            <div class="card" id='eachcard'>
                                <a href={`/products/${item.subcategoryname}`} style={{ textDecoration: 'none' }}>
                                    <div id='subcategoryimgdiv'>
                                        <img src="/images/image3copy.jpg" id="subcategoryimg" class="card-img-top" alt="sub category img" />
                                    </div>
                                    <h5 id='subcategoryname'>{item.subcategoryname}</h5>
                                </a>
                            </div>
                            {role == '0' ? (
                                <div id='buttons'>
                                    <button class="btn" id='edit_butn' onClick={() => { window.location.href = `/editsubcategory/${item._id}` }}>Edit</button>
                                    <button class="btn" id='delete_butn' onClick={() => { Deletesubcategory(item._id) }} >Delete</button>
                                </div>
                            ) : ('')}
                        </div>
                    ))}

                </div>

            </div>

        </>
    )
}
