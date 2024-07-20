// Post.js (Individual Post Component)
import React ,{useEffect} from 'react';
import "../../../App.scss"

import {
  MoreHoriz,
  ChatBubbleOutline,
  ChatBubble,
 FavoriteBorderOutlined,
 FavoriteOutlined
} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import Comments from './comments';
import { useState } from 'react';
import { deepOrange, purple } from '@mui/material/colors';
import { getcomments,postcomment,postlikes,deletelikes,getlikes,countlikes } from '../../../Dbqueries/qtimeline';
import { format } from 'timeago.js';
import { emojify } from 'node-emoji';
import { getonegame } from '../../../Dbqueries/qgameview';

import { useAuth } from '../../../Auth/AuthProvider';
import { getuser } from '../../../Dbqueries/qprofile';

const Post = ({username,content,imageurl,ptid,created_at,profilepic,fbid}) => {
  const {user} =useAuth();
  const navigate = useNavigate();
  const [triggerRender, setTriggerRender] = useState(true);
 const [u,setU] = useState(null)
 const [onegame, setonegame] = useState();
  const [commentOpen,setCommentOpen] = useState(false);
  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState({
    Comment:"",
    Image:"",
    Ptid:ptid,
});
 
const [likeNum,setLikeNum] = useState(0);
const [commentNum,setCommentNum] = useState(0);
  //const[timeago,setTimeago] = useState("");

  const [liked,setLiked] = useState();

   useEffect(()=>{
        const fetchData = async () =>{
        
       if(imageurl){
        const g =  await getonegame(imageurl)
        setonegame(g[0])
        //console.log()

       }
        
if(user){
  //console.log(imageurl)
        const l =  await getlikes(ptid);
        setLikeNum(l);
        const commentss = await getcomments(ptid);
        setComments(commentss);
        setCommentNum(commentss.length)
        const id = await getuser(user);
        
        setU(id[0].profilepic);
        
        
             setLiked(await countlikes(ptid,user) === 0 ? false : true);
             
             
             
        }
        else{
          setTriggerRender(!triggerRender)
        }
         
 
        }
        fetchData();
    },[triggerRender])

    const postComment = async () =>{
      if(comment.Comment==="")
      return
    
   
  await postcomment(comment,user);
  console.log(comment.Ptid)
  setComment({...comment,Comment:"",})
  setTriggerRender(!triggerRender)
   
  }

  const unlike = async () =>{
    liked ? await deletelikes(ptid,user) : await postlikes(ptid,user)
    setLiked(!liked);
   
    setTriggerRender(!triggerRender)
   
  }
  const redirect = async (fbid) =>{
    
    navigate('/mymental/profile', { state:fbid});
  }

  const redirectgame = async () =>{
    navigate('/gameplay', { state: { src: onegame.gameurl ,title:onegame.title ,img:onegame.imageurl}});
  }
  return (
    
    
/* //    <div class ="post">
//     <Avatar class ="post_avatar"/>
   
//     <div class ="post_content">
//    <div class ="post_header">
//     <div class ="post_title">

//    <h3>John</h3>
//    </div>

//    <MoreHoriz class="post_options"/>
  
// </div>
// <div class = "post_description">jhfdjkshkfffftfuyufuyfuyfuyfuyfdtydysdtydtdydysdyddtydydyfuygyfdfuyffuyfuffufdu5yyuyyuyuyulsahaskjfhlahf
// </div>
   
//    <div class ="post_img">
//    </div> 
//    <div class="post_footer">

//    </div>
//    </div>
//    </div> */
<div class ='post'>
  <div class="pcontainer">
  <div class ="user">
    <div class ="userInfo">
      <img src={profilepic} />
      <div class="deatils">
      <span onClick={()=>redirect(fbid)}>{username}</span>
      <span class="date">{format(created_at)}</span>
      </div>
    </div>
    <div class="options">
<MoreHoriz/>


</div>

  </div>
  <div class="content">
  <p>{content}</p>
  <img  style={{cursor:"pointer"}} onClick={()=>redirectgame()} src={imageurl} /></div>
  <div class="info">
    <div class ="item" onClick={()=>unlike()}>
      {liked ? <FavoriteOutlined sx={{ color: purple[500]}}/> : <FavoriteBorderOutlined />}
      {likeNum}
    </div>
    <div class ="item" onClick={()=>setCommentOpen(!commentOpen)}>
      {commentOpen ? <ChatBubble sx={{ color: deepOrange[300]}}/> : <ChatBubbleOutline/>}
      {commentNum}
    </div>
   
  </div>
  {commentOpen&&
   <div class = "comments">
    <div class="write">
    <img src={u} />
    <input type="text" value={comment.Comment} placeholder='write a comment' onChange={(e)=>setComment({...comment,
                                                                                                        Comment:emojify(e.target.value),})} />
    <button onClick={()=>postComment()}>Send</button>
    </div>
    {comments?.map((comment)=>(<Comments key={comment.cid} {...comment} />))} 
    </div>
  
  }
  </div>
</div>

  );
};

export default Post;
