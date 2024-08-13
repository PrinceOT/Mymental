import react, { useState,useEffect} from 'react';
import Post from './Post';
import '../../../App.scss'

  import {
    MoreHoriz,
    Attachment,
    ChatBubbleOutline,
    ChatBubble,
   FavoriteBorderOutlined,
   FavoriteOutlined
  } from "@mui/icons-material"
import { getTimeline,postTimeline } from '../../../Dbqueries/qtimeline';
import { addWords, isBad } from 'adults';
import { useAuth } from '../../../Auth/AuthProvider';
import Register from '../../SetupUser/signup';
import { getuser } from '../../../Dbqueries/qprofile';
import { emojify } from 'node-emoji';

const Feed = () => {
    const[timeline,setTimeline] = useState([])
    const [badWord, setbadWord] = useState(false);
    const [triggerRender, setTriggerRender] = useState(true);
    const {user} = useAuth()
    const [u,setU] = useState("")
    const [input,setInput] = useState({
        Content:"",
        Image:"",
    });

    useEffect(()=>{
        const interval = 5000;
            
        const fetchData = async () =>{
            addWords("kill","die")
             if(user){
              
            //     const response = await fetch('http://localhost:3001/get-latest-data');
            //     console.log(response)
            //    const result = await response.json();
            //     console.log(result)
            const id =  await getuser(user);
        
            const pp = id[0].profilepic;
              setU(pp);
             }
        const timeline = await getTimeline();
        
        setTimeline(timeline);
      

          

        }
        
        fetchData();
        const intervalId = setInterval(fetchData, interval);
        return () => clearInterval(intervalId);
    },[triggerRender])

const sendPost = async () => {

    const isBadWord = isBad(input.Content);
   
   
 if (!isBadWord){

       await postTimeline(input,user);
 }
    setInput({
        Content:"",
        Image:"",
    })
    setTriggerRender(!triggerRender)
};

    return (
        <>
        {true ? (
        <div class ='feed'>
       {timeline.map((post)=>(
            <Post key={post.ptid} {...post}/>
           ))} 
            <div class="btn-click">
                <span>+</span>
                <div class='postbox'>
                <div class ="userInfo">
      <img src={u} alt=""/> 
                    <div class="pb_form">
                        <div class="pb_form-field">
                    <div class="pb_input">
                        <input type="text" value={input.Content} placeholder='Whats on your mind?...' onChange={(e)=>setInput({Content:emojify(e.target.value)})}/>
                    </div>
                    <button  onClick={()=>sendPost()}>Post</button>
                    {/* <div class ="item" onClick={()=>sendPost()}> */}
       {/* <FavoriteBorderOutlined /> */}
     
    {/* </div> */}

                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
 ) : (<Register/>)}
        </>


    );
 

};export default Feed;