import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


import '../styles/subcategory.css'
import Navbar from '../components/Navbar';



export default function SubCategories() {


    const [subcategory, setSubcategory] = useState([]);
    console.log('SubCategories', subcategory);


    const { id } = useParams();

    useEffect(() => {


        axios.get(`http://localhost:3000/shop/subcategoryof/${id}`).then((response) => {

            // console.log(response.data);
            setSubcategory(response.data.SubCategories);

        }).catch((err) => {
            console.log(err);
        })

    }, [])


    return (
        <>
            <Navbar />


            <div class="categorylist" id='categorybody'>

                <div class="row row-cols-1 row-cols-md-3 g-4">

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
                        </div>
                    ))}

                </div>

            </div>

        </>
    )
}
