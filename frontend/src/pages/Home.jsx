import React, { useEffect, useState } from 'react'
import axios from 'axios' //npm i axios
import { Link, useNavigate } from 'react-router-dom'

import '../styles/home.css'

import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'



export default function Home() {

  const [categorylist, Setcategorylist] = useState([]);

  useEffect(() => {

    axios.get('https://craft-shop-ftlg.onrender.com/shop/productcategories').then(res => {
      console.log(res.data);
      Setcategorylist(res.data.Categories);

    })

      .catch(err => {
        console.log('Error fetching categories:', err);
      })

  }, []);

  console.log(categorylist);







  return (
    <>
      <div id='homepage'>

        <Navbar />
        <Carousel />

        <div id='carouselContent'>
          <h2 id='slogan'>Turning Ideas Into <br />Artistic Masterpieces </h2><br />
          <p id='categorydes'> Empower your creativity with our extensive range of quality craft tools, <br/>enabling you to refine your ideas into intricate and captivating <br/>artistic expressions, one tool at a time </p><br />
          <button type="button" class="btn" id='learnmore'
          >Learn More</button>
        </div>

        {/* ---------------------------------- */}


        <div  class="row" id='categorylist'>

          {categorylist.map((item) => (

            <div class="col-sm-4" id="carditems">

              <h3 class="card-title" id='cardtitle'>{item.categoryname}</h3>
              <p class="card-text" id='categorydes'>{item.categorydescription}</p>
              <Link to={`/category/${item._id}`}>
              <button class="btn" id='checkout' >Check Out</button>
              </Link>

            </div>
            
          ))}

        </div>

        {/* --------------------- */}

        <div id='parallaxcontent1'>

        </div>


        {/* --------------------- */}

        <div id='homecontent4' >

          <img src='/images/artist2.jpg' alt='artist1' id='artist1'></img>
          <h1 id='divtitle'>Discover Your<br /> Crafting Oasis Here :) <br />Supplies, Tools, Inspiration</h1>
          <h1 id='divtitle2'>  Await!</h1>
          <p id='divdescription'>Explore our curated collection of premium craft supplies, tools,<br />and materials, carefully selected to inspire your creativity <br /> and empower your crafting journey. From beginner essentials to <br /> advanced specialties, find everything you need to bring your<br />  artistic visions to life with passion and precision.</p>

        </div>

        {/* --------------------- */}

        <div id='parallaxcontent2'>

        </div>


        {/* --------------------- */}






      </div>
    </>
  )
}
