import React, { useEffect, useState } from 'react'
import '../styles/productview.css'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function ProductView() {


    const role = sessionStorage.getItem('role');
    const Navigate = useNavigate();

    const [producInfo, setProductInfo] = useState({})
    console.log('Product Details ', producInfo);

    const { id } = useParams();
    console.log(producInfo);

    useEffect(() => {
        axios.get(`https://craft-shop-ftlg.onrender.com/shop/productdetails/${id}`).then((res) => {
            // console.log(res.data.ProductDetails);
            setProductInfo(res.data.ProductDetails);
        })
    }, [])

    //delete product
    const DeleteProduct = (id) => {

        axios.delete(`https://craft-shop-ftlg.onrender.com/shop/deleteproduct/${id}`).then(res => {
            console.log(res.data);
            Navigate(`/products/${producInfo.subcategory}`);
        }).catch((err) => {
            console.log(err);
        })
    }

    //add to cart
    const addtocart = () => {

        // console.log(producInfo._id);

        axios.post(`https://craft-shop-ftlg.onrender.com/cart/addtocart`,producInfo,
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }

        ).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            <Navbar />

            <div class="categorylist" id='categorybody'>

                <div class="row row-cols-1 row-cols-md-3 g-4">

                    <div class="col-lg-3">
                        <div class="card" id='eachcard'>

                            <div id='subcategoryimgdiv'>
                                <img src="/images/image3copy.jpg" id="subcategoryimg" class="card-img-top" alt="sub category img" />
                            </div>
                            <h5 id='subcategoryname'>{producInfo.productname}</h5>
                            <h5 id='subcategoryname'>{producInfo.productprice}</h5>
                            <p style={{ zIndex: '10' }}>{producInfo.productdescription}</p>
                        </div>

                        {role == '0' ? (
                            <div id='buttons'>
                                <button class="btn" id='edit_buttn' >Edit</button>
                                <button class="btn" id='delete_buttn' onClick={() => { DeleteProduct(producInfo._id) }} >Delete</button>
                            </div>
                        ) : ('')}

                        {/* <h5 id='subcategoryname' style={{ color: 'black' }}>{producInfo._id}</h5> */}

                        {role == '1' ? (
                            <button id='addtocartbtn' onClick={addtocart} >Add to Cart</button>
                        ) : ('')}

                    </div>


                </div>

            </div >
        </>
    )
}
