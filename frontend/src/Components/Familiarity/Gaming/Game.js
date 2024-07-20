import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.scss'
import { FiberManualRecord } from '@mui/icons-material';
import { orange } from '@mui/material/colors';



const Game = ({ title, description,genre, imageurl,gameurl,gid }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Information you want to pass to the new route
    console.log(gameurl)
    navigate('/gameplay', { state: { src: gameurl ,title:title ,img:imageurl,gid:gid}});
  }

return(
<figure class="card card--3" style={{"--image-src": 'url('+imageurl+')'}} onClick={handleRedirect}>
		<figcaption>
			<span class="info">
        <div class ="inline">
				<h3>{title}</h3> </div> <br></br>
        <span style={{color:"orange"}}>{genre}</span> <br></br>
				<span>{description}</span>
			</span>
			{/* <div class="hidden-text"><span>This is the text that will be shown on hover</span></div> */}
		</figcaption>
	</figure>

  
);
  };

export default Game;
