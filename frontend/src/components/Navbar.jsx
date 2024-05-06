import React from 'react'
import '../styles/navbar.css'



export default function Navbar() {
    return (
        <>

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
                                <a class="nav-link" href="#">Home</a>
                            </li>


                            <div class="dropdown">
                                <a class="btn dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown">Categories</a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" id="dropdownmenu">

                                    <a class="dropdown-item" href="#">Category 1</a>
                                    <a class="dropdown-item" href="#">Category 2</a>
                                    <a class="dropdown-item" href="#">Category 3</a>

                                </div>

                            </div>

                            <li class="nav-item active">
                                <a class="nav-link" href="#">Contact</a>
                            </li>


                            {/* <div id='searchbar'>
                                <Searchbar />
                            </div> */}

                            
                            <button type="button" class="btn" id='loginbutton'>Login</button>
                            

                            
                        </ul>
                    </div>
                </nav>
            </div>


        </>
    )
}
