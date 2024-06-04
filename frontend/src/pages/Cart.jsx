import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import '../styles/cart.css'

export default function Cart() {


    const [cartitems, setcartitems] = useState([])
    console.log('cartitems:', cartitems);


    const token = sessionStorage.getItem('token');
    // console.log('token:', token);

    useEffect(() => {

        axios.get(`http://localhost:3000/cart/getcartitems`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {

                // console.log(res.data)
                setcartitems(res.data)
                // const grandtotal = res.data.grandtotal;
                // console.log('grandtotal:', grandtotal)

            }).catch(err => {
                console.log(err)
            })
    }, [])

    const deletecartitem = (id) => {

        axios.delete(`http://localhost:3000/cart/deletecartitem/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)

                const filter = (cartitems.details).filter(item => { return item._id !== id }) // filter the cartitems.details (array) and return the item that does not match the id
                setcartitems({ ...cartitems, details: filter }); //catitems contain data removing the item that matches the id

            }).catch(err => {
                console.log(err)
            })
    }

    const increment = (id) => {

        axios.put(`http://localhost:3000/cart/increment/${id}`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)

                const data = cartitems.details.find(item => item._id === id);

                const quantity = data.quantity;
                const increment = Number(quantity) + 1;
                data.quantity = increment;

                setcartitems([...cartitems.details, data])

            }).catch(err => {
                console.log(err)
            })
    }

    const decrement = (id) => {

        axios.put(`http://localhost:3000/cart/decrement/${id}`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                window.location.reload(false);
            }).catch(err => {
                console.log(err)
            })
    }

    const Clear = () => {
        axios.delete(`http://localhost:3000/cart/clearcart`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                setcartitems([]); // setcartitems(...cartitems.details,[] ); 
            }).catch(err => {
                console.log(err)
            })
    }

    const Pay = () => {
        // window.location.href = "/payment"
        alert("Payment Successfull")
        Clear();
    }

    return (
        <>
            <Navbar />


            <div id="cartpagebody">

                {cartitems.details?.length === 0 ? (
                    <div id='cartsubbody' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '500px' }}>
                        <h2 id='card_title'>
                            Your
                            &nbsp;
                            <i class="fa fa-shopping-cart" aria-hidden="true" />
                            &nbsp;
                            Is Empty
                            :(
                        </h2>
                    </div>

                ) : (

                    <div id='cartsubbody'>

                        <h2 id='card_title'>
                            Your
                            &nbsp;
                            <i class="fa fa-shopping-cart" aria-hidden="true" />
                        </h2>

                        {cartitems.details?.map((item, index) => (
                            <div id='cartitems'>
                                <p class='productdetail'>{index + 1}</p>
                                <p class='productdetail'>{item.productname}</p>
                                <i class="fa fa-minus decrement" aria-hidden="true" onClick={() => { decrement(item._id) }} />
                                <p class='productdetail'>{item.quantity}</p>
                                <i class="fa fa-plus increment" aria-hidden="true" onClick={() => { increment(item._id) }} />
                                <p class='productdetail'>{item.total}</p>
                                <img src='/images/beads.jpg' id='productimgsmall' alt='image' />
                                <i class="fa fa-times-circle remove" aria-hidden="true" onClick={() => { deletecartitem(item._id) }} />
                            </div>
                        ))}

                        <br />
                        <h3 id='grandtotal'>
                            Total : {cartitems.grandtotal}
                            <i class="fa fa-inr" aria-hidden="true" style={{ position: 'relative', top: '2px', left: '5px' }} />
                        </h3>
                        <button type='button' id='clearbtn' onClick={Clear} >Clear</button>
                        <button type='button' id='paybtn' onClick={Pay}>Pay</button>
                    </div>

                )}

            </div>
        </>
    )
}

