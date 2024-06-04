import React, { useEffect, useState } from 'react'
import '../styles/userprofile.css'
import Navbar from '../components/Navbar'
import axios from 'axios';

export default function UserProfile() {

    const token = sessionStorage.getItem('token');
    // console.log('token', token);


    const [UserDetails, setUserDetails] = useState({});
    console.log('userdetails', UserDetails);

    useEffect(() => {
        axios.get('https://craft-shop-ftlg.onrender.com/user/userprofile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log('userprofile', res);
            setUserDetails(res.data.user_profile[0]);
        }).catch((err) => {
            console.log('error', err);
        })

    }, [])


    return (
        <>

            <Navbar />

            <section class="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <div class="py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100" >
                        <div class="col col-lg-6 mb-4 mb-lg-0">
                            <div class="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div class="row g-0">

                                    <div class="col-md-4 gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                                    >

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" class="img-fluid my-5" style={{ width: '80px' }} />

                                        <h5>{UserDetails?.username}</h5>

                                        <p>{UserDetails?.name}</p>

                                        <i class="far fa-edit mb-5"></i>

                                    </div>

                                    <div class="col-md-8 text-white" style={{ backgroundColor: 'rgb(43, 42, 42)' }}>
                                        <div class="card-body p-4">

                                            <h6>Information</h6>
                                            <hr class="mt-0 mb-4" />

                                            <div class="row pt-1">

                                                <div class="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p class="text_muted">{UserDetails?.email}</p>
                                                </div>

                                                <div class="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p class="text_muted">{UserDetails?.phone}</p>
                                                </div>

                                                <div class="col-6 mb-3">
                                                    <h6>Address</h6>
                                                    <p class="text_muted">{UserDetails?.address}</p>
                                                </div>
                                            </div>



                                            <div class="d-flex justify-content-start">
                                                <a id='social_media' href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                                                <a id='social_media' href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                                                <a id='social_media' href="#!"><i class="fab fa-instagram fa-lg"></i></a>
                                            </div>

                                            <br />
                                            <hr class="mt-0 mb-4" />

                                            <div>
                                                <a href='/orders' id='yourorders' style={{ textDecoration: 'none' }}>
                                                    <h5 >Your Orders </h5>
                                                    <i id='arrow' class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
