import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

export default function ShopOrdersView() {

    const token = sessionStorage.getItem('token');
    console.log(token);

    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        // fetch data
        axios.get('http://localhost:3000/shop/vieworders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            setOrders(res.data);
        })
    },[])

    return (
        <>
            <Navbar />


        </>
    )
}
