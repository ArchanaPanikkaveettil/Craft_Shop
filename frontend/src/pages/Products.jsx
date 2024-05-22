import React, { useEffect, useState } from 'react'
import '../styles/products.css'
import '../styles/subcategory.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Products() {

    const [products, setProducts] = useState([])
    console.log('All sub category Products', products);

    const subcategoryname = useParams().name;
    console.log('subcategoryname', subcategoryname);

    useEffect(() => {


        axios.get(`http://localhost:3000/shop/subcatallproducts/${subcategoryname}`).then((res) => {
            // console.log('Products of this subcagory', res.data.Products);
            setProducts(res.data.Products)
        }).catch((err) => {
            console.log(err);
        })


    }, [])

    const role = sessionStorage.getItem('role');



    return (
        <>

            <Navbar />


            <div class="categorylist" id='categorybody'>

                <div class="row row-cols-1 row-cols-md-3 g-4">

                    {products.map((item) => (

                        <div class="col-lg-3">
                            <div class="card" id='eachcard'>
                                <a href={`/productview/${item._id}`} style={{ textDecoration: 'none' }}>
                                    <div id='subcategoryimgdiv'>
                                        <img src="/images/image3copy.jpg" id="subcategoryimg" class="card-img-top" alt="sub category img" />
                                    </div>
                                    <h5 id='subcategoryname'>{item.productname}</h5>
                                    <h5 id='subcategoryname'>{item.productprice}</h5>
                                </a>

                            </div>
                            {role == '1' ? (
                                <button id='addtocartbtn' onClick={() => { window.location.href = `/productview/${item._id}` }}>Add to Cart</button>
                            ) : ('')}
                        </div>
                    ))}

                </div>

            </div >



        </>
    )
}
