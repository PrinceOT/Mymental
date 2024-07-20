// GameList.js
import React from 'react';
import Game from './Game';
import '../../../App.scss'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const GameList = ({ games }) => {
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  



  return(
    <div class="carousel">
   
    <Slider{...settings}>
    
    {games.map((game) => (
   <div class='game'>
    <Game key={game.id} {...game} />
   </div>
  ))}
  
    {/* Add more slides as needed */}
    </Slider>
   
  </div>
  );
  
    };

export default GameList;
