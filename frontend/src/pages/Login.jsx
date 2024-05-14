import React, { useEffect, useState } from 'react'
import '../styles/login.css'


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




    return (
        <>
            <div class="form-structor">
                <div class="signup">
                    <h2 class="form-title" id="signup"><span>or</span>Sign up</h2>
                    <div class="form-holder">
                        <input type="text" class="input" placeholder="Name" />
                        <input type="text" class="input" placeholder="Address" />
                        <input type="email" class="input" placeholder="Email" />
                        <input type="text" class="input" placeholder="Phone" />
                        <select className="input" id='selectgender'>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input type="password" class="input" placeholder="Password" />

                    </div>
                    <button class="submit-btn">Sign up</button>
                </div>
                <div class="login slide-up">
                    <div class="center">
                        <h2 class="form-title" id="login"><span>or</span>Log in</h2>
                        <div class="form-holder">
                            <input type="text" class="input" placeholder="User Name" />
                            <input type="password" class="input" placeholder="Password" />
                        </div>
                        <button class="submit-btn">Log in</button>
                    </div>
                </div>
            </div>

        </>
    )
}
