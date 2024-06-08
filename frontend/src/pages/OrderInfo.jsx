import React, { useEffect, useState } from 'react'
import '../styles/orderinfo.css'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function OrderInfo() {

    const navigate = useNavigate();

    const [orderdetails, setOrderdetails] = useState([]);
    console.log('orderdetails', orderdetails)

    useEffect(() => {

        //get order details
        axios.get('http://localhost:3000/cart/orderdetails', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((response) => {
            // console.log(response.data.orderDetails);
            setOrderdetails(response.data);
            sessionStorage.setItem('TotalAmount',response.data.grandtotal)
        })

    }, [])


    


    return (
        <>
            <Navbar />
            <div id='orderinfopage'>

                {orderdetails.orderDetails != undefined ? (


                    <div class='row' id='orderdetails'>

                        <div class='col-lg-6' id='orderdetailscols'>

                            <h5>Delivery Address</h5>
                            <p>{orderdetails?.orderDetails[0]?.Username}</p>
                            <p>{orderdetails?.orderDetails[0]?.Useraddress}</p>
                            <p>{orderdetails?.orderDetails[0]?.Usermobile}</p>
                            <p>{orderdetails?.orderDetails[0]?.Useremail}</p>

                        </div>


                        <div class='col-lg-6' id='orderdetailscols'>
                            {orderdetails.orderDetails.map((item, index) => (

                                <div>
                                    <h6><b>Product {index + 1}</b></h6>
                                    <div style={{ display: 'flex' }}>
                                        <p>{item.productName}</p>  &nbsp; &nbsp; &nbsp;
                                        <p>{item.Productquantity}</p>  &nbsp; &nbsp; &nbsp;
                                        <p>{item.productprice} Rs</p> &nbsp; &nbsp; &nbsp;
                                    </div>
                                </div>
                            ))}
                            <h3>Total : {orderdetails.grandtotal} Rs</h3>
                            <button id='paybutton' onClick={() => { navigate('/payment') }}>Pay</button>
                        </div>

                    </div>
                ) : ('')}

            </div>
        </>
    )
}
