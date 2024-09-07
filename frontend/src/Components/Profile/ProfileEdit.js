import { useEffect, useState } from 'react';
import react  from "react";
import { useAuth ,AuthProvider } from '../../Auth/AuthProvider';
import { doc,updateDoc} from 'firebase/firestore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { emojify } from 'node-emoji';
import {getuser,updateuser} from '../../Dbqueries/qprofile';
import "../../App.scss"



const ProfileEdit = () => { 
  const navigate = useNavigate();
 
  const {user} = useAuth();
  const [info,setInfo] = useState({
bio:"",
created_at: "",
email: "",
fbid: "",
profilepic: "",
username: "",
backgroundColor:"",
  });
  const  [form,setForm] = useState({
    username:'',
    bio:'',
    backgroundColor:'',
    profilepic:'',
   
});
const [id,setid] = useState(0);
 
  useEffect(() => {
   //setUpdate(!update)
    const fetchData = async () =>{
      const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      };
            
      const i = await getuser(user);
      
      const date = new Date(i[0].created_at)
      setInfo({...info,created_at:date.toLocaleDateString('en-UK', options),bio:i[0].bio,profilepic:i[0].profilepic,username:i[0].username,email:i[0].email,backgroundColor:i[0].backgroundcolor})
     setForm({...form,username:i[0].username,backgroundColor:i[0].backgroundcolor,bio:i[0].bio,profilepic:i[0].profilepic,})
      //console.log(info);
      //setInfo({...info,created_at:date.toLocaleDateString('en-UK', options),})
      
      }
    
      if(user){
      
      fetchData();
      
    }
   
  
   
    
   } ,[user]);


  const  profilepics = [
    {id:1 , url:"https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=George&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a"},
    {id:2 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Princess&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:3 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Baby&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:4 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Zoe&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:5 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Zoey&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:6 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Samantha&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:7 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Charlie&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:8 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Whiskers&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:9 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Oliver&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:10 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Annie&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:11, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Tiger&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:12, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Buddy&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a'},
    {id:13 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=kitty&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'},
    {id:14 , url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Sadie&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'},
    {id:15, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Fluffy&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'},
    {id:16, url:'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Trouble&backgroundColor=eac393,f5cfa0,ffdbac,ffdfbf&mouthColor=c98276,d29985,transparent'}
    // {id:1 , url:''},
    // {id:2 , url:''},
    // {id:3 , url:''},
    // {id:4 , url:''},
   ]
  




  //  const games = [
  //   { id: 1, title: 'The Journey home', description: 'A short story about the travels of an adventurer and a young girl she meets along the way',topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuG50jO_oRIlUJC-U4YwZ9S0LOQ_W37xjvQ&usqp=CAU',gameurl:'https://www.kongregate.com/games/Raius_/the-journey-home' },
  //   { id: 2, title: 'Home', description: 'A short story abount an adventurer and his home, and the people he meets on his way',topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0064/7650/Untitled.png?',gameurl:'https://www.kongregate.com/games/Raius_/home' },
  //   { id: 3, title: 'Office Escape', description: 'Escape from an office with PCs.',topic:'Depression',genre:'Puzzle',level:'Mild', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3D8Lk-E_dQ80OIyez9SgZoBPSzSq-XlKRcE0Ee5mFyMp96aAJmZAL_D5-76Po67EeOzI&usqp=CAU',gameurl:'https://www.kongregate.com/games/masasgames/escape-game-computer-office-escape' },
  //   { id: 4, title: 'One and One story', description: 'Watch the gameplay change as the protagonists face the euphoria and trials of their relationship.',topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://gamemedia.armorgames.com/12409/icn_heroimage.png',gameurl:'https://www.kongregate.com/games/MaTX222/one-and-one-story' },
  //   { id: 5, title: 'Medival Chronicles', description: 'Lights, Camera… Death!!! When the person playing the dead body actually dies, it is up to Dregg’s Team to figure out who killed him.',topic:'Depression',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0068/2949/TitleScreen.png?',gameurl:'https://www.kongregate.com/games/VasantJ/medieval-chronicles-3' },
  //   { id: 6, title: 'Dragons of the void', description: 'The Void has awoken once more, unleashing all kinds of mythical and arcane horrors into the world.',topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://gamemedia.armorgames.com/19347/icn_heroimage.png',gameurl:'https://www.kongregate.com/games/DragonsOfTheVoid/dragons-of-the-void' },
  //   { id: 7, title: 'Draw and Guess', description: 'a free pictionary online drawing and guessing game You can play with friends, people around the World, draw something for practice or play a guessing game!',topic:'Depression',genre:'Multiplayer',level:'Mild', imageUrl: 'https://data.gameflare.com/games/9175/MAWULDMUlhKdeA-400-300.jpg',gameurl:'https://www.kongregate.com/games/lomboos/draw-and-guess-multiplayer' },
  //   { id: 8, title: 'Worlds Builder', description: 'Command the powerful forces of nature to bring the world of your vision into life!',topic:'Depression',genre:'Adventure',level:'Mild', imageUrl: 'https://static.starbie.co.uk/1/114071/99713/672x448/worlds-builder.webp',gameurl:'https://www.kongregate.com/games/JoyBits/worlds-builder' },
  //   { id: 9, title: 'The Dark One', description: ' In this rpg adventure we can find out more about the world of Landor and The Dark One.',topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://gamemedia.armorgames.com/18642/icn_heroimage.png',gameurl:'https://www.kongregate.com/games/Tenfor/the-dark-one' },
  //   { id: 10, title: 'Landor Quest', description: 'Storyline, more levels, monsters, bosses, upgrades, skills, different strategies for each boss, and a lot more!',topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://gamemedia.armorgames.com/18459/icn_heroimage.png',gameurl:'https://www.kongregate.com/games/Tenfor/landor-quest' },
  //   { id: 11, title: 'Landor Quest 2', description: 'Mild 2',topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://files.armorgames.com/blog/2019/01/9-Landor-1.png',gameurl:'https://www.kongregate.com/games/Tenfor/landor-quest-2' },
  //   { id: 12, title: 'Bloons', description: 'Use the mouse to aim and throw darts at the balloons, popping as many as possible with each dart.',topic:'Depression',genre:'Strategy',level:'Mild', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Bloons_TD_iOS_Logo.jpg',gameurl:'https://www.kongregate.com/games/Ninjakiwi/bloons' },
  //   { id: 13, title: 'Green', description: 'Green, another puzzle game for you! Can you make the screen green in all 25 levels? Each level has its own logic.',topic:'Stress',genre:'Puzzle',level:'Severe', imageUrl: 'https://i.ytimg.com/vi/91aZxhEanvU/mqdefault.jpg',gameurl:'https://www.kongregate.com/games/bontegames/green' },
  //   { id: 14, title: 'Push', description: 'Puzzle game prototype.',topic:'Anxiety',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2599010/capsule_616x353.jpg?t=1695870747',gameurl:'https://www.kongregate.com/games/targaciej/push' },
  //   { id: 14, title: 'Push', description: 'Puzzle game prototype.',topic:'Stress',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2599010/capsule_616x353.jpg?t=1695870747',gameurl:'https://www.kongregate.com/games/targaciej/push' },
  //   { id: 15, title: 'Rhomb', description: 'Moderate 2',topic:'Stress',genre:'Puzzle',level:'Moderate', imageUrl: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/ae7e3e8a72c0e156d8593189d275813b.png',gameurl:'https://www.kongregate.com/games/KekGames/rhomb' },
  //   { id: 16, title: 'Four color', description: 'In mathematics, the four color theorem, or the four color map theorem, states that, given any separation of a plane into contiguous regions',  topic:'Anxiety',genre:'Puzzle',level:'Severe', imageUrl: 'https://d2r55xnwy6nx47.cloudfront.net/uploads/2023/03/FourColorMap-byJames-OBrian-Lede-scaled.webp',gameurl:'https://www.kongregate.com/games/toweld/four-color-theorem-coloring-puzzle-game'},
  //   { id: 124, title: 'Four color', description: 'In mathematics, the four color theorem, or the four color map theorem, states that, given any separation of a plane into contiguous regions',  topic:'Stress',genre:'Puzzle',level:'Severe', imageUrl: 'https://d2r55xnwy6nx47.cloudfront.net/uploads/2023/03/FourColorMap-byJames-OBrian-Lede-scaled.webp',gameurl:'https://www.kongregate.com/games/toweld/four-color-theorem-coloring-puzzle-game'},
  //   { id: 17, title: 'Hexologic', description: 'Immerse yourself in the beautiful world of Hexologic. Solve challenging, yet rewarding puzzles',  topic:'Depression',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/785890/header.jpg?t=1702469952',gameurl:'https://www.kongregate.com/games/mythicowl/hexologic'},
  //   { id: 18, title: 'Klocki', description: 'Puzzle game',  topic:'Anxiety',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/499440/header.jpg?t=1654273901',gameurl:'https://www.kongregate.com/games/targaciej/klocki'},
  //   { id: 17, title: 'Hexologic', description: 'Immerse yourself in the beautiful world of Hexologic. Solve challenging, yet rewarding puzzles',  topic:'Stress',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/785890/header.jpg?t=1702469952',gameurl:'https://www.kongregate.com/games/mythicowl/hexologic'},
  //   { id: 18, title: 'Klocki', description: 'Puzzle game',  topic:'Stress',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/499440/header.jpg?t=1654273901',gameurl:'https://www.kongregate.com/games/targaciej/klocki'},
  //   { id: 19, title: 'Fling', description: 'Fling is a 2D platforming game with Grappling Hook as the only way to move. ', topic:'Depression',genre:'Strategy',level:'Mild', imageUrl: 'https://i.ytimg.com/vi/2ltmW7JgYgM/maxresdefault.jpg',gameurl:'https://www.kongregate.com/games/Alienplay/fling'},
  //   { id: 20, title: 'Gragyriss', description: 'A strategy game about dragon life – devour lambs, grow stronger, raid settlements, fight weak humans, elves and undead, kidnap beautiful princesses',  topic:'Depression',genre:'Strategy',level:'Moderate', imageUrl: 'https://images.crazygames.com/gragyriss-captor-of-princesses/20210118190837/gragyriss-captor-of-princesses-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop',gameurl:'https://www.kongregate.com/games/snowroadgames/gragyriss-captor-of-princesses'},
  //   { id: 21, title: 'Uh Oh Bartender', description: 'In Uh Oh Bartender, you take the role of a bartender at Cyphers, the hottest new bar and grill. However, the drinks served at Cyphers arent just drinks, they are also puzzles!',  topic:'Depression',genre:'Strategy',level:'Mild', imageUrl: 'https://picon.ngfiles.com/916000/flash_916101_card.webp?f1706652024',gameurl:'https://www.newgrounds.com/portal/view/916101'},
  //   { id: 22, title: 'NumNumbers', description: 'Slide the numbered tiles to solve puzzles. Match numbers by color and value.',  topic:'Stress',genre:'Puzzle',level:'Severe', imageUrl: 'https://picon.ngfiles.com/905000/flash_905539_card.webp?f1699108165',gameurl:'https://www.newgrounds.com/portal/view/905539'},
  //   { id: 23, title: 'Recursion', description: 'Recursion is a weird puzzle game based on the concept of abstraction. Think outside the box, changing the colors of the stage to win!',  topic:'Depression',genre:'Puzzle',level:'Mild', imageUrl: 'https://picon.ngfiles.com/909000/flash_909419_card.webp?f1701970973',gameurl:'https://www.newgrounds.com/portal/view/909419'},
  //   { id: 24, title: 'Tri-color', description: 'Tri-color is a hyper-casual game with simple and challenging gameplay. Polished minimalist graphics for a good experience. Tap to switch colors and try your highest score.',  topic:'Stress',genre:'Puzzle',level:'Severe', imageUrl: 'https://picon.ngfiles.com/887000/flash_887765_medium.webp?f1686827345',gameurl:'https://www.newgrounds.com/portal/view/887765'},
  //   { id: 24, title: 'Tri-color', description: 'Tri-color is a hyper-casual game with simple and challenging gameplay. Polished minimalist graphics for a good experience. Tap to switch colors and try your highest score.',  topic:'Anxiety',genre:'Puzzle',level:'Moderate', imageUrl: 'https://picon.ngfiles.com/887000/flash_887765_medium.webp?f1686827345',gameurl:'https://www.newgrounds.com/portal/view/887765'},
  //   { id: 25, title: 'Light Wanderer', description: '"Light Wanderer" is an excellent platformer with puzzle elements. Unforgettable adventures are waiting for you in a monochrome world',  topic:'Stress',genre:'Misc',level:'Moderate', imageUrl: 'https://m.gjcdn.net/game-screenshot/400/2385352-itsvp843-v4.webp',gameurl:'https://www.kongregate.com/games/Kiddo_Victor/light-wanderer'},
  //   { id: 26, title: 'Hyper Dimensional', description: 'Hyper Dimensional Dynamo is an arena survival shooter set on an alien planet. Kill aliens, pick up better weapons and hold on as long as you can.',  topic:'Depression',genre:'Action',level:'Mild', imageUrl: 'https://img.itch.zone/aW1hZ2UvNTE1ODYwLzI2Nzg5MjMucG5n/original/0ugfQ8.png',gameurl:'https://www.kongregate.com/games/Kiddo_Victor/hyper-dimensional-dynamo'},
  //   { id: 27, title: 'Cryomancer', description: 'Cryomancer is a precision-platforming game that makes the player use his ice-making magic to pass through a series of challenges!',  topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0070/0579/CryoGif.gif?',gameurl:'https://www.kongregate.com/games/Kiddo_Victor/cryomancer'},
  //   { id: 28, title: 'Zombie tatics', description: 'Tactical turn-based zombie survival game, featuring full story, survival mode, and four alternative endings!',  topic:'Stress',genre:'Misc',level:'Severe', imageUrl: 'https://gamemedia.armorgames.com/16136/icn_heroimage.png',gameurl:'https://www.kongregate.com/games/epace/zombie-tactics'},
  //   { id: 29, title: 'Castle Wars 2', description: 'Castle wars',  topic:'Stress',genre:'Misc',level:'Mild', imageUrl: 'https://picon.ngfiles.com/538000/flash_538769_card.png?f1601081222',gameurl:'https://www.kongregate.com/games/m0rkeulv/castle-wars-2'},
  //   { id: 30, title: 'Antbuster', description: 'The scenario: your picnic is under attack! You chose a good place to make your lunch, but you didn’t see an anthill nearby',  topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://images.crazygames.com/games/antbuster/cover-1615117186983.png?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=396',gameurl:'https://www.kongregate.com/games/rstein/antbuster'},
  //   { id: 31, title: 'Steamlands', description: 'Build tanks and destroy tanks in this RTS from pixel wizards Nitrome',  topic:'Depression',genre:'Strategy',level:'Mild', imageUrl: 'https://media.moddb.com/images/downloads/1/231/230959/PicsArt_01-08-12.17.04.jpg',gameurl:'https://www.kongregate.com/games/Nitrome/steamlands'},
  //   { id: 32, title: 'Wonderputt', description: 'Adventure golf… but with cows, toads, ski slopes, torpedos and a sprinkle of alien abduction for good measure.',  topic:'Anxiety',genre:'Puzzle',level:'Moderate', imageUrl: 'https://images.crazygames.com/games/wonderputt/cover-1663948798237.png?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop',gameurl:'https://www.kongregate.com/games/dampgnat/wonderputt'},
  //   { id: 33, title: 'Retro bowl', description: 'Retro Bowl is the perfect game for the armchair quarterback to finally prove a point.', topic:'Depression',genre:'Strategy',level:'Mild', imageUrl: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/ee9ca3764ef4289a48a1ebf457ef605441ed1f35a0f2eb12707a70d609e53686.png',gameurl:'https://www.kongregate.com/games/siread/retro-bowl'},
  //   { id: 34, title: 'GravityBot HD', description: 'GravityBot HD is a new challenging arcade game based on realistic physics.',  topic:'Anxiety',genre:'Misc',level:'Severe', imageUrl: 'https://files.vitalitygames.com/games/image/2014/09/18/gravity-bot-hd-200x150-webp.webp',gameurl:'https://www.kongregate.com/games/MartinF115/gravitybot-hd'},
  //   { id: 35, title: 'Sports heads: Tennis', description: 'we’ve go an amazing tennis game for you – Sports Heads: Tennis.',  topic:'Depression',genre:'Strategy',level:'Mild', imageUrl: 'https://a.silvergames.com/j/b/sports-heads-tennis-open.jpg',gameurl:'https://www.kongregate.com/games/Mousebreaker/sports-heads-tennis'},
  //   { id: 36, title: 'Sports heads: Football', description: 'Arcade football that’s all about the headers and volleys.',  topic:'Depression',genre:'Strategy',level:'Mild', imageUrl: 'https://assets.funnygames.org/5/18165/71482/672x448/sports-heads-football.webp',gameurl:'https://www.kongregate.com/games/Mousebreaker/sports-heads-football'},
  //   { id: 35, title: 'Sports heads: Tennis', description: 'we’ve go an amazing tennis game for you – Sports Heads: Tennis.',  topic:'Ptsd',genre:'Strategy',level:'Mild', imageUrl: 'https://a.silvergames.com/j/b/sports-heads-tennis-open.jpg',gameurl:'https://www.kongregate.com/games/Mousebreaker/sports-heads-tennis'},
  //   { id: 36, title: 'Sports heads: Football', description: 'Arcade football that’s all about the headers and volleys.',  topic:'Ptsd',genre:'Strategy',level:'Mild', imageUrl: 'https://assets.funnygames.org/5/18165/71482/672x448/sports-heads-football.webp',gameurl:'https://www.kongregate.com/games/Mousebreaker/sports-heads-football'},
  //   { id: 37, title: 'The perfect tower', description: 'A mix between a strategy and an idle game inspired by many incremental games / tower defense games out there. ',  topic:'Anxiety',genre:'Puzzle',level:'Severe', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2515620/capsule_616x353.jpg?t=1689546615',gameurl:'https://www.kongregate.com/games/XmmmX99/the-perfect-tower'},
  //   { id: 38, title: 'Factory idle', description: 'Welcome to Factory idle! Build factories, keep transporting resources under control and make a lot of money',  topic:'Anxiety',genre:'Puzzle',level:'Mild', imageUrl: 'https://static.wikia.nocookie.net/factoryidle/images/e/eb/A0_Build.png',gameurl:'https://www.kongregate.com/games/Baldurans/factory-idle'},
  //   { id: 39, title: 'ngu idle', description: 'Everyone likes numbers that go up. Play NGU Idle and get the exciting rush of so many numbers going up!',  topic:'Stress',genre:'Idle',level:'Mild', imageUrl: 'https://static.wikia.nocookie.net/nguadventure/images/0/07/Nguidlehomepageedit.png',gameurl:'https://www.kongregate.com/games/somethingggg/ngu-idle'},
  //   { id: 40, title: 'Cannon balls', description: 'Hit the balls with the right colors',  topic:'Anxiety',genre:'Puzzle',level:'Mild', imageUrl: 'https://play-lh.googleusercontent.com/fkE792nhAlDyWPpKl9dnM8Lhl2KK9jKFHkJoFhBF9Hma429K5LanEdgLSs-GgdftMQ',gameurl:'https://play.famobi.com/cannon-balls-3d'},
  //   { id: 41, title: 'ButtonBass Trap Cube 2', description: 'Mix Trap Beats like you want with a 3d cube interface to mix on.',  topic:'Stress',genre:'Music',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/8066/redbluegreen.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/buttonbass-trap-cube-2'},
  //   { id: 42, title: 'ButtonBass Trap Cube 2', description: 'Mix Trap Beats like you want with a 3d cube interface to mix on.',  topic:'Ptsd',genre:'Music',level:'Moderate', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/8066/redbluegreen.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/buttonbass-trap-cube-2'},
  //   { id: 43, title: 'ButtonBass Trap Cube', description: 'Mix Trap Beats like a professional dj on your first try! Easily control individual layers of a beat using a 3d cube user interface.', topic:'Ptsd',genre:'Music',level:'Moderate', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/8051/TrapCubeIcon512.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/buttonbass-trap-cube'},
  //   { id: 44, title: 'ButtonBass Trap Cube', description: 'Mix Trap Beats like a professional dj on your first try! Easily control individual layers of a beat using a 3d cube user interface.', topic:'Stress',genre:'Music',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/8051/TrapCubeIcon512.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/buttonbass-trap-cube'},
  //   { id: 45, title: 'Player Organ', description: 'Program an organ to play to you or choose a song from the list and watch it play.', topic:'Stress',genre:'Music',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/8564/PlayerOrganIcon.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/player-organ'},
  //   { id: 46, title: 'Player Organ', description: 'Program an organ to play to you or choose a song from the list and watch it play.',  topic:'Ptsd',genre:'Puzzle',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/8564/PlayerOrganIcon.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/player-organ'},
  //   { id: 47, title: 'Virtual Piano', description: 'Play the virtual piano with your computer keyboard! Fun and easy to learn.',  topic:'Stress',genre:'Music',level:'Severe', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0053/8561/IconReflect.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/buttonbass-virtual-piano'},
  //   { id: 48, title: 'Virtual Piano', description: 'Play the virtual piano with your computer keyboard! Fun and easy to learn.',  topic:'Ptsd',genre:'Music',level:'Severe', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0053/8561/IconReflect.png?',gameurl:'https://www.kongregate.com/games/ButtonBass1/buttonbass-virtual-piano'},
  //   { id: 49, title: 'One Man Band', description: 'Ladies and Gentlemen! For tonight Mr Hackbracket will entertain you by balancing an ENTIRE ORCHESTRA on his back!',  topic:'Stress',genre:'Misc',level:'Moderate', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/1453/omb.jpg?',gameurl:'https://www.kongregate.com/games/StateOfPlay/one-man-band'},
  //   { id: 50, title: 'One Man Band', description: 'Ladies and Gentlemen! For tonight Mr Hackbracket will entertain you by balancing an ENTIRE ORCHESTRA on his back!',  topic:'Anxiety',genre:'Misc',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/1453/omb.jpg?',gameurl:'https://www.kongregate.com/games/StateOfPlay/one-man-band'},
  //   { id: 51, title: 'One Man Band', description: 'Ladies and Gentlemen! For tonight Mr Hackbracket will entertain you by balancing an ENTIRE ORCHESTRA on his back!',  topic:'Ptsd',genre:'Music',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0053/1453/omb.jpg?',gameurl:'https://www.kongregate.com/games/StateOfPlay/one-man-band'},
  //   { id: 52, title: 'Carnival shootdown', description: 'An addictive carnival shooting gallery, built in Flash and free to play. Moving targets, spinning bottles, and miniature popup cowboys',  topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0053/1393/thum300x250.jpg?',gameurl:'https://www.kongregate.com/games/StateOfPlay/carnival-showdown'},
  //   { id: 53, title: 'Pool live Pro', description: 'Play your favorite billiards for free! Real-world physics, global rankings, variety of game types and really nice collection of cues provide a great gaming experience for every pool fan!',  topic:'Ptsd',genre:'Puzzle',level:'Mild', imageUrl: 'https://www2.minijuegosgratis.com/v3/games/thumbnails/205905_1.jpg',gameurl:'https://www.kongregate.com/games/GanymedeLtd/pool-live-pro'},
  //   { id: 54, title: 'Pool live Pro', description: 'Play your favorite billiards for free! Real-world physics, global rankings, variety of game types and really nice collection of cues provide a great gaming experience for every pool fan!',  topic:'Stress',genre:'Sport',level:'Severe', imageUrl: 'https://www2.minijuegosgratis.com/v3/games/thumbnails/205905_1.jpg',gameurl:'https://www.kongregate.com/games/GanymedeLtd/pool-live-pro'},
  //   { id: 55, title: 'Renegade racing', description: 'A Wacky Races style racing game with amazing stunts, cool missions and crazy AI cars.',topic:'Depression',genre:'Action',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0045/2566/icon250x200.jpg?',gameurl:'https://www.kongregate.com/games/PaulGene/renegade-racing' },
  //   { id: 56, title: 'Renegade racing', description: 'A Wacky Races style racing game with amazing stunts, cool missions and crazy AI cars.',topic:'Stress',genre:'Action',level:'Severe', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0045/2566/icon250x200.jpg?',gameurl:'https://www.kongregate.com/games/PaulGene/renegade-racing' },
  //   { id: 57, title: 'Sport Head: basketball', description: 'The Sports Heads take America with Sports Heads: Basketball.',topic:'Stress',genre:'Sport',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0046/9882/basketballkongicon.jpg?',gameurl:'https://www.kongregate.com/games/Mousebreaker/sports-heads-basketball' },
  //   { id: 58, title: 'Sport Head: basketball', description: 'The Sports Heads take America with Sports Heads: Basketball.',topic:'Ptsd',genre:'Sport',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0046/9882/basketballkongicon.jpg?',gameurl:'https://www.kongregate.com/games/Mousebreaker/sports-heads-basketball' },
  //   { id: 59, title: 'Stunt Master', description: 'Play Stunt Master Smash, bash and crash your way to super stunt stardom.',topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0017/4511/stunt-master-big.png?',gameurl:'https://www.kongregate.com/games/Grester/stunt-master' },
  //   { id: 60, title: 'Freeway Fury', description: 'When plain old driving isn’t enough, unleash your fury and climb to your car’s roof for some fresh air',topic:'Stress',genre:'Action',level:'Moderate', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0017/2159/100x75.png?',gameurl:'https://www.kongregate.com/games/Vasco_F/freeway-fury' },
  //   { id: 61, title: 'Freeway Fury 2', description: 'Freeway Fury is back! Jump from vehicle to vehicle and speed down each stretch of highway before time runs out.',topic:'Stress',genre:'Action',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0031/5316/icon120x100.png?',gameurl:'https://www.kongregate.com/games/Vasco_F/freeway-fury-2' },
  //   { id: 62, title: 'Freeway Fury 3', description: 'Drive, jump, steal vehicles and cause mayhem on the freeway! Freeway Fury 3 includes a new story, new vehicles, levels, bonuses and more!',topic:'Stress',genre:'Action',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0056/7662/FF3_kong.jpg?',gameurl:'https://www.kongregate.com/games/Vasco_F/freeway-fury-3' },
  //   { id: 63, title: 'G-Switch', description: 'Frenetic gravity inversion action for the solo player, or up to 6 players on one keyboard!',topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0013/9643/gswitch_icon.png?',gameurl:'https://www.kongregate.com/games/Vasco_F/g-switch' },
  //   { id: 64, title: 'G-Switch 2', description: 'Run and flip gravity in all directions and discover the truth about your existence. Find the 7 secret orbs and unlock new characters.',topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0063/1725/GS2_500x400.jpg?',gameurl:'https://www.kongregate.com/games/Vasco_F/g-switch-2' },
  //   { id: 65, title: 'G-Switch 3', description: 'G-Switch is back and better than ever! With new clone mode, multiplayer power-ups, new characters and 12 orbs to collect.',topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0065/8959/gs3_Kong_454x363.png?',gameurl:'https://www.kongregate.com/games/Vasco_F/g-switch-3' },
  //   { id: 63, title: 'G-Switch', description: 'Frenetic gravity inversion action for the solo player, or up to 6 players on one keyboard!',topic:'Depression',genre:'Misc',level:'Mild', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0013/9643/gswitch_icon.png?',gameurl:'https://www.kongregate.com/games/Vasco_F/g-switch' },
  //   { id: 64, title: 'G-Switch 2', description: 'Run and flip gravity in all directions and discover the truth about your existence. Find the 7 secret orbs and unlock new characters.',topic:'Depression',genre:'Puzzle',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0063/1725/GS2_500x400.jpg?',gameurl:'https://www.kongregate.com/games/Vasco_F/g-switch-2' },
  //   { id: 65, title: 'G-Switch 3', description: 'G-Switch is back and better than ever! With new clone mode, multiplayer power-ups, new characters and 12 orbs to collect.',topic:'Depression',genre:'Misc',level:'Mild', imageUrl: 'https://cdn2.kongcdn.com/game_icons/0065/8959/gs3_Kong_454x363.png?',gameurl:'https://www.kongregate.com/games/Vasco_F/g-switch-3' },
  //   { id: 66, title: 'Flight simulator', description: 'Flight Simulator 2016 FlyWings is the ultimate simulation for your mobile! With a large selection of aircrafts and more than 10000 airports around the world!',topic:'Stress',genre:'Strategy',level:'Severe', imageUrl: 'https://g.vseigru.net/8/igra-letnyj-simulyator-letayushchie-krylya/logo.jpg',gameurl:'https://www.kongregate.com/games/ThetisGames/flight-simulator-flywings-2016' },
  //   { id: 121, title: 'Flight simulator', description: 'Flight Simulator 2016 FlyWings is the ultimate simulation for your mobile! With a large selection of aircrafts and more than 10000 airports around the world!',topic:'Depression',genre:'Strategy',level:'Moderate', imageUrl: 'https://g.vseigru.net/8/igra-letnyj-simulyator-letayushchie-krylya/logo.jpg',gameurl:'https://www.kongregate.com/games/ThetisGames/flight-simulator-flywings-2016' },
  //   { id: 67, title: 'Flight simulator', description: 'Flight Simulator 2016 FlyWings is the ultimate simulation for your mobile! With a large selection of aircrafts and more than 10000 airports around the world!',topic:'Ptsd',genre:'Strategy',level:'Severe', imageUrl: 'https://g.vseigru.net/8/igra-letnyj-simulyator-letayushchie-krylya/logo.jpg',gameurl:'https://www.kongregate.com/games/ThetisGames/flight-simulator-flywings-2016' },
  //   { id: 68, title: 'Accelerator', description: 'How fast can you go? See if you can find a place amongst the fastest players and stay alive for the longest time!',topic:'Ptsd',genre:'Action',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0044/9551/2013-03-05_14-59-00.png?',gameurl:'https://www.kongregate.com/games/TenebrousP/accelerator' },
  //   { id: 68, title: 'Accelerator', description: 'How fast can you go? See if you can find a place amongst the fastest players and stay alive for the longest time!',topic:'Stress',genre:'Action',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0044/9551/2013-03-05_14-59-00.png?',gameurl:'https://www.kongregate.com/games/TenebrousP/accelerator' },
  //   { id: 69, title: 'Hat Wizard 2', description: 'Outsmart your foes with your hat once again in a brand new adventure!',topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0067/9315/Thumbnail_Underworld.png?',gameurl:'https://www.kongregate.com/games/taccommandeur/hat-wizard-2' },
  //   { id: 70, title: 'Hat Wizard', description: 'Use your hat to outsmart foes in this short 2D platform adventure. You can throw it on their heads and switch places.',topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/1679/Thumbnail.png?',gameurl:'https://www.kongregate.com/games/taccommandeur/hat-wizard' },
  //   { id: 71, title: 'Hat Wizard 2', description: 'Outsmart your foes with your hat once again in a brand new adventure!',topic:'Anxiety',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0067/9315/Thumbnail_Underworld.png?',gameurl:'https://www.kongregate.com/games/taccommandeur/hat-wizard-2' },
  //   { id: 72, title: 'Hat Wizard', description: 'Use your hat to outsmart foes in this short 2D platform adventure. You can throw it on their heads and switch places.',topic:'Anxiety',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/1679/Thumbnail.png?',gameurl:'https://www.kongregate.com/games/taccommandeur/hat-wizard' },
  //   { id: 73, title: 'Hat Wizard 2', description: 'Outsmart your foes with your hat once again in a brand new adventure!',topic:'Ptsd',genre:'Adventure',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0067/9315/Thumbnail_Underworld.png?',gameurl:'https://www.kongregate.com/games/taccommandeur/hat-wizard-2' },
  //   { id: 74, title: 'Hat Wizard', description: 'Use your hat to outsmart foes in this short 2D platform adventure. You can throw it on their heads and switch places.',topic:'Ptsd',genre:'Adventure',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/1679/Thumbnail.png?',gameurl:'https://www.kongregate.com/games/taccommandeur/hat-wizard' },
  //   { id: 75, title: 'Kuja', description: 'What to do after a fun night in the bar? Go home? Order a pizza? No! Head to the infamous Kuja for the good, old-fashioned drunk fight!',topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0062/9654/Icon-Kongregate.jpg?',gameurl:'https://www.kongregate.com/games/filthsu/kuja' },
  //   { id: 76, title: 'Kuja', description: 'What to do after a fun night in the bar? Go home? Order a pizza? No! Head to the infamous Kuja for the good, old-fashioned drunk fight!',topic:'Stress',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0062/9654/Icon-Kongregate.jpg?',gameurl:'https://www.kongregate.com/games/filthsu/kuja' },
  //   { id: 77, title: 'Kuja', description: 'What to do after a fun night in the bar? Go home? Order a pizza? No! Head to the infamous Kuja for the good, old-fashioned drunk fight!',topic:'Anxiety',genre:'Adventure',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0062/9654/Icon-Kongregate.jpg?',gameurl:'https://www.kongregate.com/games/filthsu/kuja' },
  //   { id: 78, title: 'Crush The Castle 2', description: 'Even after crushing and capturing Arcturia, the Redvonian King was still longing for more castles to crush.',topic:'Anxiety',genre:'Action',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0070/1665/Screenshot2024-02-22at16.11.44-ezgif.com-resize.png?',gameurl:'https://www.kongregate.com/games/ArmorGames/crush-the-castle-2' },
  //   { id: 79, title: 'Crush The Castle 2', description: 'Even after crushing and capturing Arcturia, the Redvonian King was still longing for more castles to crush.',topic:'Depression',genre:'Action',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0070/1665/Screenshot2024-02-22at16.11.44-ezgif.com-resize.png?',gameurl:'https://www.kongregate.com/games/ArmorGames/crush-the-castle-2' },
  //   { id: 80, title: 'Achievement Unlocked 2', description: 'This is a game about you. Yes you, the player: A lowly blue elephant in a world that has no defining purpose. But you will create a purpose, and that purpose is to do the unthinkable.',  topic:'Ptsd',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0017/7580/ac2-kong.jpg?',gameurl:'https://www.kongregate.com/games/ArmorGames/achievement-unlocked-2'},
  //   { id: 81, title: 'Achievement Unlocked 2', description: 'This is a game about you. Yes you, the player: A lowly blue elephant in a world that has no defining purpose. But you will create a purpose, and that purpose is to do the unthinkable.',  topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0017/7580/ac2-kong.jpg?',gameurl:'https://www.kongregate.com/games/ArmorGames/achievement-unlocked-2'},
  //   { id: 82, title: 'Evo Explores', description: 'Start tapping and see where the world takes you',  topic:'Stress',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0064/8516/250x200.png?',gameurl:'http://www.kongregate.com/games/tobeglad/evo-explores'},
  //   { id: 83, title: 'Evo Explores', description: 'Start tapping and see where the world takes you',  topic:'Depression',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0064/8516/250x200.png?',gameurl:'http://www.kongregate.com/games/tobeglad/evo-explores'},
  //   { id: 84, title: 'Evo Explores', description: 'Start tapping and see where the world takes you',  topic:'Anxiety',genre:'Puzzle',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0064/8516/250x200.png?',gameurl:'http://www.kongregate.com/games/tobeglad/evo-explores'},
  //   { id: 85, title: 'Evo Explores', description: 'Start tapping and see where the world takes you',  topic:'Ptsd',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0064/8516/250x200.png?',gameurl:'http://www.kongregate.com/games/tobeglad/evo-explores'},
  //   { id: 86, title: 'Choppy Orc', description: 'Simple platformer about an Orc that likes chopping stuff with his axe.',  topic:'Anxiety',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0067/9399/Icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/choppy-orc'},
  //   { id: 87, title: 'Choppy Orc', description: 'Simple platformer about an Orc that likes chopping stuff with his axe.',  topic:'Stress',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0067/9399/Icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/choppy-orc'},
  //   { id: 88, title: 'Choppy Orc', description: 'Simple platformer about an Orc that likes chopping stuff with his axe.',  topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0067/9399/Icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/choppy-orc'},
  //   { id: 89, title: 'One Trick Mage', description: 'Simple platformer about a Mage that can only do one trick at a time ', topic:'Ptsd',genre:'Adventure',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/8361/IconOTM.png?',gameurl:'https://www.kongregate.com/games/eddynardo/one-trick-mage'},
  //   { id: 90, title: 'One Trick Mage', description: 'Simple platformer about a Mage that can only do one trick at a time ', topic:'Stress',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/8361/IconOTM.png?',gameurl:'https://www.kongregate.com/games/eddynardo/one-trick-mage'},
  //   { id: 91, title: 'One Trick Mage', description: 'Simple platformer about a Mage that can only do one trick at a time ', topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/8361/IconOTM.png?',gameurl:'https://www.kongregate.com/games/eddynardo/one-trick-mage'},
  //   { id: 92, title: 'One Trick Mage', description: 'Simple platformer about a Mage that can only do one trick at a time ', topic:'Anxiety',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/8361/IconOTM.png?',gameurl:'https://www.kongregate.com/games/eddynardo/one-trick-mage'},
  //   { id: 93, title: 'Hasty Shaman', description: 'Simple platformer about a Shaman that hastes his way through the ground.',  topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0069/0269/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/hasty-shaman'},
  //   { id: 94, title: 'Sleepy Knight', description: 'Simple platform game about a knight that is sleeping all day and….night.',  topic:'Stress',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/7584/Icon.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sleepy-knight'},
  //   { id: 95, title: 'Sticky Sorcerer', description: 'Simple platformer about a Sorcerer that likes to stick around when he visits.',  topic:'Anxiety',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0068/0112/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sticky-sorcerer'},
  //   { id: 96, title: 'Hasty Shaman', description: 'Simple platformer about a Shaman that hastes his way through the ground.',  topic:'Anxiety',genre:'Adventure',level:'Mild', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0069/0269/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/hasty-shaman'},
  //   { id: 97, title: 'Sleepy Knight', description: 'Simple platform game about a knight that is sleeping all day and….night.',  topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/7584/Icon.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sleepy-knight'},
  //   { id: 98, title: 'Sticky Sorcerer', description: 'Simple platformer about a Sorcerer that likes to stick around when he visits.',  topic:'Stress',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0068/0112/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sticky-sorcerer'},
  //   { id: 99, title: 'Hasty Shaman', description: 'Simple platformer about a Shaman that hastes his way through the ground.',  topic:'Stress',genre:'Adventure',level:'Mild', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0069/0269/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/hasty-shaman'},
  //   { id: 100, title: 'Sleepy Knight', description: 'Simple platform game about a knight that is sleeping all day and….night.',  topic:'Anxiety',genre:'Adventure',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/7584/Icon.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sleepy-knight'},
  //   { id: 101, title: 'Sticky Sorcerer', description: 'Simple platformer about a Sorcerer that likes to stick around when he visits.',  topic:'Depression',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0068/0112/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sticky-sorcerer'},
  //   { id: 102, title: 'Hasty Shaman', description: 'Simple platformer about a Shaman that hastes his way through the ground.',  topic:'Ptsd',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0069/0269/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/hasty-shaman'},
  //   { id: 103, title: 'Sleepy Knight', description: 'Simple platform game about a knight that is sleeping all day and….night.',  topic:'Ptsd',genre:'Adventure',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0067/7584/Icon.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sleepy-knight'},
  //   { id: 104, title: 'Sticky Sorcerer', description: 'Simple platformer about a Sorcerer that likes to stick around when he visits.',  topic:'Ptsd',genre:'Action',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0068/0112/icon250.png?',gameurl:'https://www.kongregate.com/games/eddynardo/sticky-sorcerer'},
  //   { id: 105, title: 'Building Rush 2', description: 'You are the boss! Manage the manufacturing and delivery of building materials to construction sites in multiple cities.',  topic:'Ptsd',genre:'Action',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0065/2927/BuildingRush2_250x200.png?',gameurl:'https://www.kongregate.com/games/BarbarianGames/building-rush-2'},
  //   { id: 106, title: 'Building Rush', description: 'Build plants to produce and sell the building materials.',  topic:'Stress',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0056/6909/BuildingRush250x200.jpg?',gameurl:'https://www.kongregate.com/games/BarbarianGames/building-rush'},
  //   { id: 107, title: 'Building Rush 2', description: 'You are the boss! Manage the manufacturing and delivery of building materials to construction sites in multiple cities.',  topic:'Stress',genre:'Action',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0065/2927/BuildingRush2_250x200.png?',gameurl:'https://www.kongregate.com/games/BarbarianGames/building-rush-2'},
  //   { id: 108, title: 'Building Rush', description: 'Build plants to produce and sell the building materials.',  topic:'Ptsd',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0056/6909/BuildingRush250x200.jpg?',gameurl:'https://www.kongregate.com/games/BarbarianGames/building-rush'},
  //   { id: 109, title: 'Building Rush 2', description: 'You are the boss! Manage the manufacturing and delivery of building materials to construction sites in multiple cities.',  topic:'Anxiety',genre:'Action',level:'Mild', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0065/2927/BuildingRush2_250x200.png?',gameurl:'https://www.kongregate.com/games/BarbarianGames/building-rush-2'},
  //   { id: 110, title: 'Building Rush', description: 'Build plants to produce and sell the building materials.',  topic:'Anxiety',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0056/6909/BuildingRush250x200.jpg?',gameurl:'https://www.kongregate.com/games/BarbarianGames/building-rush'},
  //   { id: 111, title: 'Hero Simulator', description: 'An idle-rpg game about little guy Folcard who tries to continue his ancestors craft of being a hero.',  topic:'Anxiety',genre:'Misc',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0062/8814/Icon500x400_2.png?',gameurl:'https://www.kongregate.com/games/revanaii/hero-simulator'},
  //   { id: 112, title: 'Hero Simulator', description: 'An idle-rpg game about little guy Folcard who tries to continue his ancestors craft of being a hero.',  topic:'Ptsd',genre:'Misc',level:'Moderate', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0062/8814/Icon500x400_2.png?',gameurl:'https://www.kongregate.com/games/revanaii/hero-simulator'},
  //   { id: 113, title: 'Giants and Dwarves TD', description: 'The kingdom is under the attack of huge devastating giants and relentless waves of enemies.',  topic:'Anxiety',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0045/1519/iconbig.jpg?',gameurl:'https://www.kongregate.com/games/LabuGames/giants-and-dwarves-td'},
  //   { id: 114, title: 'Pre-Civilization: Stone Age', description: 'Create and lead your own tribe from first human-primates lived 4 million years ago to the first civilizations of Ancient Egypt and Mesopotamia.',  topic:'Ptsd',genre:'Strategy',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0048/8046/iTunesArtwork.jpg?',gameurl:'https://www.kongregate.com/games/clarusvictoria/pre-civilization-stone-age'},
  //   { id: 115, title: 'Pre-Civilization: Bronze Age', description: 'Start with a plot of land on the shore of the Euphrates and lead your people through the furnace of World History. ',  topic:'Ptsd',genre:'Strategy',level:'Moderate', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0058/5167/250x200.jpg?',gameurl:'https://www.kongregate.com/games/clarusvictoria/pre-civilization-marble-age'},
  //   { id: 117, title: 'Pre-Civilization: Marble Age', description: 'Turn-based historical simulation strategy. Develop the Greek civilization from a small village to a great city-state where it will unite the whole of Greece!',  topic:'Ptsd',genre:'Strategy',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0058/5167/250x200.jpg?',gameurl:'https://www.kongregate.com/games/clarusvictoria/pre-civilization-marble-age'},
  //   { id: 118, title: 'Pre-Civilization: Stone Age', description: 'Create and lead your own tribe from first human-primates lived 4 million years ago to the first civilizations of Ancient Egypt and Mesopotamia.',  topic:'Anxiety',genre:'Action',level:'Moderate', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0048/8046/iTunesArtwork.jpg?',gameurl:'https://www.kongregate.com/games/clarusvictoria/pre-civilization-stone-age'},
  //   { id: 119, title: 'Pre-Civilization: Bronze Age', description: 'Start with a plot of land on the shore of the Euphrates and lead your people through the furnace of World History. ',  topic:'Anxiety',genre:'Strategy',level:'Severe', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0058/5167/250x200.jpg?',gameurl:'https://www.kongregate.com/games/clarusvictoria/pre-civilization-marble-age'},
  //   { id: 120, title: 'Pre-Civilization: Marble Age', description: 'Turn-based historical simulation strategy. Develop the Greek civilization from a small village to a great city-state where it will unite the whole of Greece!',  topic:'Anxiety',genre:'Strategy',level:'Mild', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0058/5167/250x200.jpg?',gameurl:'https://www.kongregate.com/games/clarusvictoria/pre-civilization-marble-age'},
  //   { id: 120, title: 'Trader of Stories 1', description: 'Trader of Stories is a HTML5 adventure game by the Rudowski brothers. Taking place in the world of The Old Tree that Sleeps',  topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0066/0760/game-icon-kongregate.jpg?',gameurl:'https://www.kongregate.com/games/mrudi/trader-of-stories-chapter-1'},
  //   { id: 120, title: 'Trader of Stories 2', description: 'The story continues, as our protagonist, Little Willow arrives in the city of Bark. Will she find there the answers she seeks, or will the troubles find her first.',  topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn4.kongcdn.com/game_icons/0069/2768/tos2.jpg?',gameurl:'https://www.kongregate.com/games/mrudi/trader-of-stories-chapter-2'},
  //   { id: 120, title: 'Trader of Stories 3', description: 'Myosotis travels to her home village to find her family and regain lost memories. But maybe some secrets are better left undiscovered',  topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn3.kongcdn.com/game_icons/0070/1436/tos3_icon.png?',gameurl:'https://www.kongregate.com/games/mrudi/trader-of-stories-chapter-3'},
  //   { id: 120, title: 'a Grain of Truth', description: 'a Grain of Truth is independent HTML5 adventure game by the Rudowscy brothers. A story that gave the birth to the world of The Old Tree that Sleeps',  topic:'Depression',genre:'Adventure',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0038/1827/site_thumb_256.jpg?',gameurl:'http://www.kongregate.com/games/mrudi/a-grain-of-truth'},
  //   { id: 120, title: 'Chess', description: 'Play chess against the computer!',  topic:'Stress',genre:'Strategy',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0038/1827/site_thumb_256.jpg?',gameurl:'https://www.kongregate.com/games/veclock/chess-ai-game'},
  //   { id: 120, title: 'Water ragdoll 2', description: 'Play around with a ragdoll inside a room full of water! Create object and throw around, connect with ropes and have fun!',  topic:'Stress',genre:'Action',level:'Moderate', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0021/1721/Untitled-1.jpg?',gameurl:'https://www.kongregate.com/games/veclock/water-ragdoll-2'},
  //   { id: 120, title: 'Whack your Boss', description: 'Have you ever dreamed of Whacking your Boss?',  topic:'Stress',genre:'Action',level:'Severe', imageUrl: 'https://cdn1.kongcdn.com/game_icons/0021/1721/Untitled-1.jpg?',gameurl:'https://www.kongregate.com/games/WhackYourBosscom/whack-your-boss'},
  //   { id: 120, title: 'There is no Game', description: 'There might be a game',  topic:'Anxiety',genre:'Puzzle',level:'Moderate', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1241700/header.jpg?',gameurl:'https://www.kongregate.com/games/KaMiZoTo_Creator/there-is-no-game'},
  //   { id: 120, title: 'There is no Game', description: 'There might be a game',  topic:'Ptsd',genre:'Puzzle',level:'Severe', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1241700/header.jpg?',gameurl:'https://www.kongregate.com/games/KaMiZoTo_Creator/there-is-no-game'},
    
  // ];











//  const temp = () =>{
//   try {
    
//   games.map(async (game)=>{
//      await axios.post('http://localhost:3001/games', {
//       title:game.title,
//       description:game.description,
//       topic:game.topic,
//       genre:game.genre,
//       level:game.level,
//       imageurl:game.imageUrl,
//       gameurl:game.gameurl,
      
//      });

//   }

//   )
//   } catch (error) {
    
//   }
//  }
   

   const toggleContent = () => {
    var content = document.getElementById('content');
    var clicker = document.getElementById('clicker');
    content.style.display = (content.style.display === 'none') ? 'flex' : 'none';
    clicker.style.display = (content.style.display === 'none') ? '' : 'none';
   
  };
   const togglepic = (num,url) => {
    if(id ===0){
      setForm({...form,profilepic:url,})
      var cont = document.getElementById(num);
      cont.style.border = '2px solid #1616ea';
      cont.style.opacity = '1';
      setid(num);
      return;

    }
    setForm({...form,profilepic:url,})
    var content = document.getElementById(id);
    var cont = document.getElementById(num);
    setid(num);
  //  \\content.style.display = (content.style.display === 'none') ? 'flex' : 'none';
    cont.style.border = '2px solid #1616ea';
    cont.style.opacity = '1';
    content.style.border = 'none';
    content.style.opacity = '0.9';
  };

 
const handleUpdate = async () => {

 try {
 
  await updateuser(user,form)
  navigate('/mymental/profile')
  
    
  
   } catch (error) {
     console.log('Update', error.message);
  
    }
};

return (
  <>
  {info ? (
    <>
  <head>
  <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>
  </head>
<div class="container" style={{backgroundColor:form.backgroundColor ? form.backgroundColor : '#ffff'}}>
<div class="row flex-lg-nowrap">
  <div class="col-12 col-lg-auto mb-3" style={{width: "250px"}}>
   
  </div>

  <div class="col">
    <div class="row">
      <div class="col mb-3">
        <div class="card">
          <div class="card-body">
            <div class="e-profile">
              <div class="row" >
                <div class="col-12 col-sm-auto mb-3">
                  <div class="mx-auto" style={{width: "140px"}}>
                  <img src={form.profilepic ? form.profilepic  : 'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Buddy&backgroundColor=8d5524,a26d3d,b68655,cb9e6e,eac393,f5cfa0,ffdbac&mouthColor=c98276,d29985,e35d6a' } />
                  </div>
                </div>
                <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div class="text-center text-sm-left mb-2 mb-sm-0">
                    <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{info.username}</h4>
                    
                    
                    <div class="mt-2">
                      <button id="clicker" class="btn btn-primary" type="button" onClick={()=>toggleContent()}>
                        <i class="fa fa-fw fa-camera"></i>
                        <span>Change Photo</span>
                      </button>
                     

                      </div> 
                  </div>
                  <div class="text-center text-sm-right">
                    <span class="badge badge-secondary">administrator</span>
                    <div class="text-muted"><small>Joined {info.created_at}</small></div>
                  </div>
                </div>
              </div>
              <div class="content-container" id="content">
                     
                        {profilepics.map((pic)=> (
                       
 <div class="image-container" >
<img src={pic.url}  id={pic.id} onClick={()=>togglepic(pic.id,pic.url)}style={{cursor:"pointer"}} />
</div>
                        ))}
    
  <button class="btn btn-primary" type="button" onClick={()=>toggleContent()}>
                        <i class="fa fa-fw fa-camera"></i>
                        <span>Change Photo</span>
                      </button>
                    </div>
              <ul class="nav nav-tabs">
                <li class="nav-item"><a href="" class="active nav-link">Profile</a></li>
              </ul>
              <div class="tab-content pt-3">
                <div class="tab-pane active">
                 
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Username</label>
                              <input class="form-control" type="text" name="name" placeholder={info.username} value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} />
                            </div>
                          </div>
                         
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Email</label>
                              <input class="form-control" type="text" value={info.email}/>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col mb-3">
                            <div class="form-group">
                              <label>About</label>
                              {/* <textarea class="form-control" rows="5" placeholder={info.bio} value={form.bio} id="bio" onChange={(e)=>setForm({...form,bio:e.target.value})}></textarea> */}
                            <br/> <input  type="color"  name="favcolor" placeholder={info.backgroundColor} value={form.backgroundColor} onChange={(e)=>setForm({...form,backgroundColor:e.target.value})} />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col mb-3">
                            <div class="form-group">
                              <label>Bio</label>
                              <textarea class="form-control" rows="5" placeholder={info.bio} value={form.bio} id="bio" onChange={(e)=>setForm({...form,bio:emojify(e.target.value)})}></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col d-flex justify-content-end">
                        <button class="btn btn-primary"  onClick={handleUpdate}>Save Changes</button>
                      </div>
                    </div>
                 

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3 mb-3">
        <div class="card mb-3">
          
        </div>
       
      </div>
    </div>

  </div>
</div>
</div> </>):( <div></div>)
}
</>
);

}
export default ProfileEdit;
