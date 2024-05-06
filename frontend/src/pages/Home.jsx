import React from 'react'
import '../styles/home.css'

import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
// import Button from '../components/Button'


export default function Home() {
  return (
    <>
      <div id='homepage'>

        <Navbar />
        <Carousel />

        <div id='carouselContent'>
          <h2 id='slogan'>Turning Ideas Into <br />Artistic Masterpieces </h2><br />
          <p id='categorydes'> Empower your creativity with our extensive range of quality craft tools,enabling you to refine <br />  your ideas into intricate and captivating artistic expressions, one tool at a time </p><br />
          <button type="button" class="btn" id='learnmore'>Learn More</button>
        </div>





        <div class="row" id='categoryList'>

          <div class="col-sm-4">

            <h3 class="card-title" id='cardtitle'>Catgory tiltle</h3>
            <p class="card-text" id='categorydes'>Category description --- With supporting text below as a natural lead-in to additional content.</p>
            <button class="btn" id='checkout'>Check Out</button>

          </div>

          <div class="col-sm-4">

            <h3 class="card-title" id='cardtitle'>Catgory tiltle</h3>
            <p class="card-text" id='categorydes'>Category description --- With supporting text below as a natural lead-in to additional content.</p>
            <button class="btn" id='checkout'>Check Out</button>

          </div>

          <div class="col-sm-4">

            <h3 class="card-title" id='cardtitle'>Catgory tiltle</h3>
            <p class="card-text" id='categorydes'>Category description --- With supporting text below as a natural lead-in to additional content.</p>
            <button class="btn" id='checkout'>Check Out</button>

          </div>




        </div>









      </div>




    </>
  )
}
