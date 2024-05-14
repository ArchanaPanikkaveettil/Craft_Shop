import React, { useEffect, useState } from 'react'
import '../styles/login.css'
import axios from 'axios';
import Navbar from '../components/Navbar';


export default function Login() {

    //js file of login---
    useEffect(() => {
        // Add event listener for login button
        const loginBtn = document.getElementById('login');
        const signupBtn = document.getElementById('signup');

        const handleLoginButtonClick = (e) => {
            let parent = e.target.parentNode.parentNode;
            Array.from(e.target.parentNode.parentNode.classList).find((element) => {
                if (element !== 'slide-up') {
                    parent.classList.add('slide-up');
                } else {
                    signupBtn.parentNode.classList.add('slide-up');
                    parent.classList.remove('slide-up');
                }
            });
        };

        const handleSignupButtonClick = (e) => {
            let parent = e.target.parentNode;
            Array.from(e.target.parentNode.classList).find((element) => {
                if (element !== 'slide-up') {
                    parent.classList.add('slide-up');
                } else {
                    loginBtn.parentNode.parentNode.classList.add('slide-up');
                    parent.classList.remove('slide-up');
                }
            });
        };

        loginBtn.addEventListener('click', handleLoginButtonClick);
        signupBtn.addEventListener('click', handleSignupButtonClick);

        // Cleanup event listeners when component unmounts
        return () => {
            loginBtn.removeEventListener('click', handleLoginButtonClick);
            signupBtn.removeEventListener('click', handleSignupButtonClick);
        };
    }, []);
    //-----js file of login




    const submitForm = (e) => {
        e.preventDefault();


        axios.post('http://localhost:3000/user/adduser', {

            name: document.getElementById('userfullname').value, //('username') is - id of input field
            address: document.getElementById('useraddress').value,
            email: document.getElementById('useremail').value,
            phone: document.getElementById('userphone').value,
            gender: document.getElementById('usergender').value,
            username: document.getElementById('username').value, //loginTB
            password: document.getElementById('userpassword').value,//loginTB

        }).then((res) => {

            console.log(res);
            alert(res.data.message);

        }).catch((err) => {
            console.log(err);
        })

    }

    const login = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/login', {

            username: document.getElementById('loginusername').value,
            password: document.getElementById('loginpassword').value,

        }).then((res) => {

            console.log(res);
            alert(res.data.message);

        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
        <Navbar/>

        <div id='wholebody'>
            <div class="form-structor" id='signupform'>
                <div class="signup">
                    <h2 class="form-title" id="signup"><span>or</span>Sign up</h2>
                    <div class="form-holder">
                        <input type="text" id='userfullname' class="input" placeholder="Full Name" />
                        <input type="text" id='username' class="input" placeholder="User Name" />
                        <input type="text" id='useraddress' class="input" placeholder="Address" />
                        <input type="email" id='useremail' class="input" placeholder="Email" />
                        <input type="text" id='userphone' class="input" placeholder="Phone" />
                        <select className="input" id='usergender'>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input type="password" id='userpassword' class="input" placeholder="Password" />

                    </div>
                    <button class="submit-btn" onClick={submitForm}>Sign up</button>
                </div>
                <div class="login slide-up">
                    <div class="center">
                        <h2 class="form-title" id="login"><span>or</span>Log in</h2>
                        <div class="form-holder">
                            <input type="text" id='loginusername' class="input" placeholder="User Name" />
                            <input type="password" id='loginpassword' class="input" placeholder="Password" />
                        </div>
                        <button class="submit-btn" onClick={login}>Log in</button>
                    </div>
                </div>
            </div>
            </div>

        </>
    )
}
