import "../../App.scss";
import Post from "../Social/Timeline/Post";
import { useEffect, useState } from 'react';
import react  from "react";
import { useLocation} from 'react-router-dom';
import { useAuth ,AuthProvider } from '../../Auth/AuthProvider';
import {getprofile, getuser,updateuser,getother,getotherprofile} from '../../Dbqueries/qprofile';



const Profile = () => {
    const location = useLocation();
    const src = location.state;
    const {user} = useAuth();
    const[timeline,setTimeline] = useState([])
    const [use, setUse] = useState(false);
    
    const [info,setInfo] = useState({});
    useEffect(() => {
        const fetchData = async () =>{
            if(src === user.uid){
                const i = await getuser(user);
                setInfo(i[0]);    
                setTimeline(await getprofile(user));
                setUse(true);
            }
            else if(!src){
                const i = await getuser(user);
                setInfo(i[0]);    
                setTimeline(await getprofile(user));
                setUse(true);

                
            }else{
                const i = await getother(src);
                setInfo(i[0]);
                setTimeline(await getotherprofile(src));
            }
          }
          if(user){
          fetchData();
        }
        
       },[user ]);
return(
    <>
    { info.username ? (
    <div class ="profile">
        <div class="images">
            <div  class = 'cover' style={{backgroundColor:info.backgroundcolor}} />
            <img src={info.profilepic} class = 'profilePic'/>
        </div>
        <div class="profileContainer">
        <div class="uInfo">
            <div class="left">
                <span >{info.username}</span>
                <p >{info.bio} </p></div>
           
            <div class="right">
                <span>Joined - {(new Date(info.created_at)).toLocaleDateString()}</span>
            {use && <button class="btn btn-primary"><a href="profile/edit" style={{textDecoration:"none"}}>Edit Profile</a></button>}
            </div>
            
            </div> 
              
            {timeline.map((post)=>(
            <Post key={post.ptid} {...post}/>
           ))}
        </div> 
    </div>
):(
    <div></div>
)}
</>

);
}
export default Profile;
