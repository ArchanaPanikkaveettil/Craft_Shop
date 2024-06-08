import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/navbar.css'



export default function Navbar() {

    const role = sessionStorage.getItem('role')
    console.log('role', role);

    const userid = sessionStorage.getItem('userid')
    console.log('userid', userid);

    const navigate = useNavigate();


    const [categorylist, Setcategorylist] = useState([]);
    console.log(categorylist);

    useEffect(() => {

        axios.get('http://localhost:3000/shop/productcategories')
            .then(res => {
                console.log(res.data);
                Setcategorylist(res.data.Categories);

            }).catch((err) => {
                console.log(err.message);
            })

    }, [])

    const logout = () => {
        sessionStorage.clear('role');
        navigate('/');
    }

    return (

        <>

            {role == '1' ? (

                <div>
                    {/* text color and bg color   -- navbar-dark bg-dark" */}
                    <nav class="navbar navbar-expand-lg" >

                        {/* <a className="navbar-brand" href="#" >
                        <img src='/images/craftshoplogo.jpg' alt="Logo" height="30" />
                    </a> */}

                        <div >
                            <h2 id='brandname'>UR Crafts</h2>
                        </div>

                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">


                                <li class="nav-item active">
                                    <a class="nav-link" href="/">Home</a>
                                </li>



                                <div class="dropdown">
                                    <a class="btn dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown">Categories</a>

                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" id="dropdownmenu">
                                        {categorylist.map((item) => (
                                            <a class="dropdown-item" href={`/category/${item._id}`}>{item.categoryname}</a>
                                        ))}
                                    </div>

                                </div>



                                <li class="nav-item active">
                                    <a class="nav-link" href={`/userprofile/${userid}`}>Profile</a>
                                </li>

                                <li class="nav-item active">
                                    <a class="nav-link" href={`/cart/${userid}`}>Cart</a>
                                </li>


                                <button type="button" class="btn" id='loginbutton' onClick={logout}>Logout</button>


                            </ul>
                        </div>
                    </nav>
                </div>
            ) : role == '0' ? (
                <div>
                    {/* text color and bg color   -- navbar-dark bg-dark" */}
                    <nav class="navbar navbar-expand-lg" >

                        {/* <a className="navbar-brand" href="#" >
                        <img src='/images/craftshoplogo.jpg' alt="Logo" height="30" />
                    </a> */}

                        <div >
                            <h2 id='brandname'>UR Crafts</h2>
                        </div>

                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">

                                <li class="nav-item active">
                                    <a class="nav-link" href="/home">Home</a>
                                </li>

                                <div class="dropdown">
                                    <a class="btn dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown">Categories</a>

                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" id="dropdownmenu">
                                        {categorylist.map((item) => (
                                            <a class="dropdown-item" href={`/category/${item._id}`}>{item.categoryname}</a>
                                        ))}
                                    </div>

                                </div>

                                <li class="nav-item active">
                                    <a class="nav-link" href="/shop">Your Shop</a>
                                </li>

                                <li class="nav-item active">
                                    <a class="nav-link" href="/shoporderview">Orders</a>
                                </li>

                                <button type="button" class="btn" id='loginbutton' onClick={logout}>Logout</button>

                            </ul>
                        </div>
                    </nav>
                </div>
            ) : (
                < div >
                    {/* text color and bg color   -- navbar-dark bg-dark" */}
                    < nav class="navbar navbar-expand-lg" >

                        {/* <a className="navbar-brand" href="#" >
                        <img src='/images/craftshoplogo.jpg' alt="Logo" height="30" />
                    </a> */}

                        <div >
                            <h2 id='brandname'>UR Crafts</h2>
                        </div>

                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">


                                <li class="nav-item active">
                                    <a class="nav-link" href="/">Home</a>
                                </li>



                                <div class="dropdown">
                                    <a class="btn dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown">Categories</a>

                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" id="dropdownmenu">
                                        {categorylist.map((item) => (
                                            <a class="dropdown-item" href={`/category/${item._id}`}>{item.categoryname}</a>
                                        ))}
                                    </div>

                                </div>



                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Contact</a>
                                </li>


                                {/* <div id='searchbar'>
                                <Searchbar />
                            </div> */}


                                <button type="button" class="btn" id='loginbutton' onClick={() => { window.location.href = '/login' }}>Login</button>



                            </ul>
                        </div>
                    </nav >
                </div >
            )
            }
        </>
    )
}
