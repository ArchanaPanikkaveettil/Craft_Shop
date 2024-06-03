import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import '../styles/cart.css'

export default function Cart() {


    useEffect(() => {
        axios.get(`http://localhost:3000/cart/getcartitems`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    return (
        <>
            <Navbar />

            





        </>
    )
}
