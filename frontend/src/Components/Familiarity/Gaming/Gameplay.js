import React,{useState} from 'react';
import { useLocation} from 'react-router-dom';
import { SendTimeExtensionOutlined ,FavoriteBorderOutlined,FavoriteOutlined} from '@mui/icons-material';
import { useEffect } from 'react';
import { useAuth } from '../../../Auth/AuthProvider';
import { addWords, isBad } from 'adults';
import { postTimeline } from '../../../Dbqueries/qtimeline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { postgamelikes ,getgamelikes } from '../../../Dbqueries/qgameview';
import { emojify } from 'node-emoji';
const GameEmbed = () => {
  const {user} = useAuth();
  const [trigger,setTrigger] = useState(true);
  const [likes, setlikes] = useState(0);
  const [liked,setLiked] = useState(false);
  const [play, setPlay] = useState(false);
   const location = useLocation();
   const src = location.state?.src;
   const title = location.state?.title;
   const img = location.state?.img;
   const gid = location.state?.gid;
  // console.log(JSON.stringify(src))
  const [post,setPost] = useState({
    Image:img,
    Content:""

  })
  
  useEffect(()=>{
  const fetchData = async () =>{
    if(gid){
const i = await getgamelikes(gid);
    
console.log(i[0].likes)
setlikes(i[0].likes)
}
  }
  fetchData();
   var modal = document.getElementById("myModal");
    if(modal){
  
  console.log(modal)
  // Get the button that opens the modal
  var btn = document.getElementById("eitem");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
},[trigger])

const like = async () => { 
  if(!liked){
    postgamelikes(gid)
  }  
  setLiked(!liked)
  setTrigger(!trigger)

}

const postgame = async () =>{
  if(post.Content==="")
  return
 if(!isBad(post.Content)){
  postTimeline(post,user);
 }
setPost({...post,Content:"",})
};
    return (
      <div class="gameplay">
        <h1>{title}</h1>
      
    
    {/* <PlayCircleOutlineIcon sx={{ fontSize: 500 }} style={{position:"relative",left:"15%",cursor:"pointer"}} onClick={()=>setPlay(true)}/> */}
    {true && <iframe
      src={src}
      width="1000"
      height="600"
      title={title}
      style={{ border: 'none', borderRadius: '8px' }}
      allow={true}
      allowFullScreen={true}
     
    ></iframe> }
    <div class="item" >
    
    <SendTimeExtensionOutlined fontSize='large' id="eitem" />
    </div>
    

    <div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close"> &times;</span>
    
  
  <input type="text" id="gamepost" name="gamepost" value={post.Content} onChange={(e)=>setPost({...post,Content:emojify(e.target.value),})} class="gamepost" placeholder='Post something about this game?...'/>
 
  <input type="button" onClick={()=>postgame()}value="Post"/>

  </div>
  

</div>

      
    <div class="item" onClick={()=>like()}>
    {liked ? <FavoriteOutlined  color='primary' fontSize='large' /> : <FavoriteBorderOutlined fontSize='large' />} <span>{likes} likes</span></div>
    
    
    </div>
      
   );
  };
  export default GameEmbed
