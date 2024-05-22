import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/adminnav.css'

export default function AdminNav() {




    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear('role');
        navigate('/');
    }



    return (
        <>


            <div>
                <nav class="navbar navbar-expand-lg" >

                    <div >
                        <h2 id='brand_name'>UR Crafts</h2>
                    </div>

                    <div class="collapse navbar-collapse" id="navbar_Nav">
                        <ul class="navbar-nav">

                            <li class="nav-item active">
                                <a class="nav-link" href="/home">Home</a>
                            </li>



                            <li class="nav-item active">
                                <a class="nav-link" href="/addcategory">Add Category</a>
                            </li>

                            <li class="nav-item active">
                                <a class="nav-link" href="/addsubcategory">Add Sub Category</a>
                            </li>

                            <li class="nav-item active">
                                <a class="nav-link" href="/addproduct">Add Product</a>
                            </li>

                            <button type="button" class="btn" id='logout_button' onClick={logout}>Logout</button>

                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}
