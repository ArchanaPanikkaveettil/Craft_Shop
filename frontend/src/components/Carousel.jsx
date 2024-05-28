import React from 'react'
import '../styles/carousel.css'

export default function Carousel() {
    return (
        <>


            {/* to fill the page, remove class=container */} {/* add time -- data-interval="4000" */}
            {/* remove data-ride="carousel" */}
                
            <div id="carouselExampleIndicators" class="carousel slide">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="/images/photo1copy.jpg" alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/images/photo2copy.jpg" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/images/photo3copy.jpg" alt="Third slide"/>
                    </div>
                </div>
                
            </div>
        </>
    )
}
