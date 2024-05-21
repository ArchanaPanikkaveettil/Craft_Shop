import React, { useEffect, useState } from 'react'
import '../styles/productview.css'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProductView() {

    const [producInfo, setProductInfo] = useState({})
    console.log('Product Details ',producInfo);

    const {id} = useParams();

    useEffect (() => {
        axios.get(`http://localhost:3000/shop/productdetails/${id}`).then((res) => {
            // console.log(res.data.ProductDetails);
            setProductInfo(res.data.ProductDetails);
        })
    },[])


    return (
        <>
            <Navbar />

            <div class="categorylist" id='categorybody'>

                <div class="row row-cols-1 row-cols-md-3 g-4">

                        <div class="col-lg-3">
                            <div class="card" id='eachcard'>
                                <a href='' style={{ textDecoration: 'none' }}>
                                    <div id='subcategoryimgdiv'>
                                        <img src="/images/image3copy.jpg" id="subcategoryimg" class="card-img-top" alt="sub category img" />
                                    </div>
                                    <h5 id='subcategoryname'>{producInfo.productname}</h5>
                                    <h5 id='subcategoryname'>{producInfo.productprice}</h5>
                                </a>
                            </div>
                            <h5 id='subcategoryname' style={{color:'black'}}>{producInfo._id}</h5>
                            <button id='addtocartbtn'>Add to Cart</button>

                        </div>
                   

                </div>

            </div >
        </>
    )
}
