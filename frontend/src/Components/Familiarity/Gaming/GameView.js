import React from 'react';
import { getgames } from '../../Dbqueries/qgameview';
import { useLocation} from 'react-router-dom';
import GameList from './GameList';
import GameEmbed from './Gameplay';
//const level = [{Topic:'Depression',Level:''},{Topic:'Stress',Level:''},{Topic:'Ptsd',Level:''},{Topic:'Anxiety',Level:''}]
const GameView = () => {
    var showComponent = false;
   // const src = location.state?.src;
   const src = {}

    const value = [
        {Topic:'Depression',Value:src.Depression},
        {Topic:'Stress',Value:src.Stress},
        {Topic:'Ptsd',Value:src.Ptsd},
        {Topic:'Anxiety',Value:src.Anxiety},
    ];

    var level = {};
    function myfunction(item){
        switch(true){
            case (item <= 1):
                return 'Mild'
   
            case (item <= 3):
                return 'Moderate'

            case (item >= 4):
                return 'Severe'


            default:
       
        break;

    }
}
// change values !!!!!

const games = [
    { id: 1, title: 'Game 1', description: 'Description 1',topic:'Depression',genre:'Action',level:'Severe', imageUrl: 'https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg',gameurl:'https://poki.com/en/g/temple-run-2' },
    { id: 1, title: 'Game 2', description: 'Description 2',topic:'Ptsd',genre:'Puzzle',level:'Mild', imageUrl: '/Users/toy/Desktop/Final year modules/Final Project/Application/frontend/src/Components/mylogo.png',gameurl:'https://poki.com/en/g/temple-run-2' },
    { id: 1, title: 'Game 3', description: 'Description 3',topic:'Stress',genre:'Adventure',level:'Moderate', imageUrl: '/Users/toy/Desktop/Final year modules/Final Project/Application/frontend/src/Components/mylogo.png',gameurl:'https://poki.com/en/g/temple-run-2' },
    { id: 1, title: 'Game 4', description: 'Description 4',topic:'Ptsd',genre:'Action',level:'Severe', imageUrl: '/Users/toy/Desktop/Final year modules/Final Project/Application/frontend/src/Components/mylogo.png',gameurl:'https://poki.com/en/g/temple-run-2' },
    { id: 1, title: 'Game 5', description: 'Description 5',topic:'Stress',genre:'Adventure',level:'Mild', imageUrl: '/Users/toy/Desktop/Final year modules/Final Project/Application/frontend/src/Components/mylogo.png',gameurl:'https://poki.com/en/g/temple-run-2' },
    { id: 1, title: 'Game 6', description: 'Description 6',topic:'Ptsd',genre:'Puzzle',level:'Mild', imageUrl: '/Users/toy/Desktop/Final year modules/Final Project/Application/frontend/src/Components/mylogo.png',gameurl:'https://poki.com/en/g/temple-run-2' },
    { id: 1, title: 'Game 7', description: 'Description 7',topic:'Depression',genre:'Puzzle',level:'Mild', imageUrl: '/Users/toy/Desktop/Final year modules/Final Project/Application/frontend/src/Components/mylogo.png',gameurl:"https://cdn.htmlgames.com/BubbleBuster/" },
]
    
    

    value.map((val) => level[val.Topic] = myfunction(val.Value))
    console.log(value);
    console.log(level);

    function handle(){
        showComponent = true;
        console.log(12);
    }



  
  const genre = ['Action','Adventure','Puzzle'];
  const topic = ['Depression','Stress','Anxiety','Ptsd']
  topic.map((array)=>{
  
        console.log(level[array])
        
        
  })
 
    
    //value.map((value) => 

    return(
        <div className="home-page" >
        {topic.map((array)=>(
            
         <div onClick={()=>handle()}>
            
             
            
         <h1>{array} - {level[array]}</h1>
       {genre.map((genre)=>(
         <div>
         <h2>{genre}</h2>
       <GameList games={games.filter((games) => (
         games.topic === array
       )).filter((games)=>(games.genre === genre)).filter((games)=>games.level === level[array])} /> 
       
       </div>
       ))}
       
 
     </div>
))}

</div>
    );
       
       };
       
  
  export default GameView;