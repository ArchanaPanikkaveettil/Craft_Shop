import React from 'react'
import '../styles/carousel.css'

export default function Carousel() {
    return (
        <>
    

            {/* to fill the page, remove class=container */}
            <   div class="carousel_slide" id='carouselcontainer'>
                                                                                        {/* add time -- data-interval="4000" */}
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval='3000'> 
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>

                    <div class="carousel-inner" id='slider'>

                        <div class="carousel-item active">
                            <img class="d-block w-100" src="/images/photo1copy.jpg" alt="First slide" />
                        </div>

                        <div class="carousel-item">
                            <img class="d-block w-100" id='sliderimg' src='/images/photo2copy.jpg' alt='Second slide' />
                        </div>

                        <div class="carousel-item">
                            <img class="d-block w-100" src="/images/photo3copy.jpg" alt="Third slide" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
