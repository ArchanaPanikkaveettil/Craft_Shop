import React, { useEffect, useState } from 'react'
import '../styles/login.css'
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


export default function Login() {


    const navigate = useNavigate();



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

    // -----------------------------------sign up form---------------------------------------------------

    //store sign in form data
    const [input, setInput] = useState({

        name: '',
        username: '',
        address: '',
        email: '',
        phone: '',
        gender: '',
        password: '',

    })
    console.log(input);


    //func for uploading values to coressponding keys in input usestate
    const inputChange = (e) => {

        const { name, value } = e.target
        setInput({ ...input, [name]: value })

    }

    //form validation for signup
    const [formError, setFormError] = useState({}); //usestate for storing error message
    console.log(formError);


    const formValidation = (data) => {

        var error = {} //empty object for collecting validation errors

        if (!data.name) { //checks if the field in the form is empty 
            error.name = "! Enter your full name" // a error message is assigned to error.name| error.name--is a key-value pair - key is 'name' and value is "Enter your name".
        }

        if (!data.username) {
            error.username = "! Enter your username"
        }

        if (!data.address) {
            error.address = "! Enter your address"
        }

        if (!data.email) {
            error.email = "! Enter your email"
        } else if (!isValidEmail(data.email)) {
            error.email = 'Enter a valid email address';
        }
        if (!data.phone) {
            error.phone = "! Enter your phone number"
        } else if (!isValidPhone(data.phone)) {
            error.phone = 'Enter a valid phone number';
        }
        if (!data.gender) {
            error.gender = "! Select your gender"
        }

        if (!data.password) {
            error.password = "! Enter your password"
        } else {
            // Additional password criteria
            if (data.password.length < 8) {
                error.password = 'Password must be at least 8 characters long';
            }
            if (!/[A-Z]/.test(data.password)) {
                error.password = 'Password must contain at least one uppercase letter';
            }
            if (!/[a-z]/.test(data.password)) {
                error.password = 'Password must contain at least one lowercase letter';
            }
            if (!/\d/.test(data.password)) {
                error.password = 'Password must contain at least one digit';
            }
            if (!/[!@#$%^&*]/.test(data.password)) {
                error.password = 'Password must contain at least one special character (!@#$%^&*)';
            }
        }

        return error; //returns the error object

    }

 
    //adduser-registration
    const onSignup = () => {

        //validation
        setFormError(formValidation(input)) //calling formValidation function passing input(sign up form data) as a parameter//sets FormError useState the ouput of formValidation function - ie error message


        if (Object.keys(formError).length == 0) { //checks if the formError usestate is empty // ie; no error message

            axios.post('https://craft-shop-ftlg.onrender.com/user/adduser', input).then((response) => {

                console.log(response.data);
                alert(response.data.message);

            }).catch((err) => {
                console.log(err.message);
            })
        }
    }

// ----------------------------------------login form---------------------------------------------------

    //login form data
    const [loginInput, setLoginInput] = useState({

        username: '',
        password: '',

    })
    console.log(loginInput);


    //uploading values to coressponding keys
    const loginInputChange = (e) => {
        const { name, value } = e.target
        setLoginInput({ ...loginInput, [name]: value })
    }


    //form validation for login 
    const [loginError, setLoginError] = useState({});
    console.log(loginError);

    const loginValidation = (data) => {

        var error = {}

        if (!data.username) {
            error.username = "! Enter your username"
        }

        if (!data.password) {
            error.password = "! Enter your password"
        }

        return error;

    }

    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const isValidPhone = (phone) => {
        // Regular expression for phone number validation
        const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
        return phonePattern.test(phone);
    };

   
    //login
    const onLogin = () => {

        //validation
        setLoginError(loginValidation(loginInput)) // calling loginValidation function passing loginInput( login form data) as a parameter//sets FormError useState the ouput of loginValidation function - ie error message


        if (Object.keys(loginError).length == 0) { //if the loginError usestate is empty ie; no error message

            axios.post('https://craft-shop-ftlg.onrender.com/login', loginInput).then((response) => {

                console.log('login response', response.data);
                alert(response.data.message);

                //saving data in session storage - for conditional rendering
                if (response.data.user.role == 1) { //user

                    sessionStorage.setItem('role', response.data.user.role)
                    sessionStorage.setItem('username', response.data.user.username)
                    sessionStorage.setItem('loginId', response.data.user._id)

                    navigate('/')

                }
                else if (response.data.user.role == 0) {

                    sessionStorage.setItem('role', response.data.user.role)
                    sessionStorage.setItem('username', response.data.user.username)
                    sessionStorage.setItem('loginId', response.data.user._id)

                    navigate('/home')
                }

            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <>
            <Navbar />

            <div id='wholebody'>
                <div class="form-structor" id='signupform'>


                    <div class="signup">
                        <h2 class="form-title" id="signup"><span>or</span>Sign up</h2>

                        <div class="form-holder">

                            {/* {/* here the error is showed by style - border color to red */}
                            {/* if error message is to be displayed somewhere use --- {formError.name} and style it */}

                            <input type="text" id='name' name='name' class="input" placeholder="Full Name" onChange={inputChange} style={{ borderColor: formError.name ? 'red' : '', borderWidth: formError.name ? '2px' : '', borderStyle: formError.name ? 'solid' : '', borderRadius: formError.name ? '15px' : '' }} onClick={() => { setFormError({ ...formError, name: "" }) }} />
                            <input type="text" id='username' name='username' class="input" placeholder="User Name" onChange={inputChange} style={{ borderColor: formError.username ? 'red' : '', borderWidth: formError.username ? '2px' : '', borderStyle: formError.username ? 'solid' : '', borderRadius: formError.username ? '15px' : '' }} onClick={() => { setFormError({ ...formError, username: "" }) }} />
                            <input type="text" id='address' name='address' class="input" placeholder="Address" onChange={inputChange} style={{ borderColor: formError.address ? 'red' : '', borderWidth: formError.address ? '2px' : '', borderStyle: formError.address ? 'solid' : '', borderRadius: formError.address ? '15px' : '' }} onClick={() => { setFormError({ ...formError, address: "" }) }} />
                            <input type="email" id='email' name='email' class="input" placeholder="Email" onChange={inputChange} style={{ borderColor: formError.email ? 'red' : '', borderWidth: formError.email ? '2px' : '', borderStyle: formError.email ? 'solid' : '', borderRadius: formError.email ? '15px' : '' }} onClick={() => { setFormError({ ...formError, email: "" }) }} />
                            <input type="text" id='phone' name='phone' class="input" placeholder="Phone" onChange={inputChange} style={{ borderColor: formError.phone ? 'red' : '', borderWidth: formError.phone ? '2px' : '', borderStyle: formError.phone ? 'solid' : '', borderRadius: formError.phone ? '15px' : '' }} onClick={() => { setFormError({ ...formError, phone: "" }) }} />

                            <select className="input" id='gender' name='gender' onChange={inputChange} style={{ borderColor: formError.gender ? 'red' : '', borderWidth: formError.gender ? '2px' : '', borderStyle: formError.gender ? 'solid' : '', borderRadius: formError.gender ? '15px' : '' }} onClick={() => { setFormError({ ...formError, gender: "" })}} >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input type="password" id='password' name='password' class="input" placeholder="Password" onChange={inputChange} style={{ borderColor: formError.password ? 'red' : '', borderWidth: formError.password ? '2px' : '', borderStyle: formError.password ? 'solid' : '', borderRadius: formError.password ? '15px' : '' }} onClick={() => { setFormError({ ...formError, password: "" }) }} />

                        </div>

                        <button class="submit-btn" onClick={onSignup}>Sign up</button>
                    </div>



                    <div class="login slide-up">
                        <div class="center">
                            <h2 class="form-title" id="login"><span>or</span>Log in</h2>
                            <div class="form-holder">
                                <input type="text" id='username' name='username' class="input" placeholder="User Name" onChange={loginInputChange} style={{ borderColor: loginError.username ? 'red' : '', borderWidth: loginError.username ? '2px' : '', borderStyle: loginError.username ? 'solid' : '', borderRadius: loginError.username ? '15px' : '' }} onClick={() => { setLoginError({ ...loginError, username: "" }) }} />
                                <input type="password" id='password' name='password' class="input" placeholder="Password" onChange={loginInputChange} style={{ borderColor: loginError.password ? 'red' : '', borderWidth: loginError.password ? '2px' : '', borderStyle: loginError.password ? 'solid' : '', borderRadius: loginError.password ? '15px' : '' }} onClick={() => { setLoginError({ ...formError, password: "" }) }} />
                            </div>
                            <button class="submit-btn" onClick={onLogin} >Log in</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Render error container only when there is a email error  */}

            {formError.email && (

                <div id="error-container1">
                    <span style={{ color: 'red', fontSize: '15px' }}>{formError.email}</span>
                </div>

            )}

            {/* Render error container only when there is a phone error  */}

            {formError.phone && (

                <div id="error-container2">
                    <span style={{ color: 'red', fontSize: '15px' }}>{formError.phone}</span>
                </div>
            )}

            {/* Render error container only when there is a password error  */}

            {formError.password && (

                <div id="error-container3">
                    <span style={{ color: 'red', fontSize: '15px' }}>{formError.password}</span>
                </div>
            )}
        </>
    )
}
