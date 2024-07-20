import React from 'react'
import { useState,useContext } from 'react';
import { db } from '../../../Auth/firebase';
import { useAuth } from '../../../Auth/AuthProvider';
import { getDoc,doc,updateDoc,setDoc,collection,serverTimestamp,where,query ,getDocs} from 'firebase/firestore';
import { ChatContext } from './ChatContext';
import { Search as Sea} from '@mui/icons-material';
import { createChat, getuser } from '../../../Dbqueries/qprofile';


const Search = ()=>{
    const[username,setUsername] = useState("")
    const [users,setUser] = useState({})
    const [err,setErr] = useState(false)
    const {dispatch} = useContext(ChatContext);
    const {user} =  useAuth();


    const handleSearch = async (e)=>{
       const q = query(collection(db,"users"), where("username", "==" , username));
  try{
    
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc)=> {
        //console.log(doc.data())
        setUser(doc.data())
       })
    }catch(err){
        setErr(true);
        console.log(err);

    }
    };



    const handleKey = (e)=>{
        e.code =  "Enter" && handleSearch();
    }



    const handleSelect = async () =>{
        console.log(users)
        dispatch({type:"CHANGE_USER",payload:users})
        const combinedId = user.uid > users.uid 
        ? user.uid + users.uid 
        : users.uid + user.uid;
        //setUsername("");
        try {
        const res = await getDoc(doc(db,"messages",combinedId)); if(!res.exists()){
          const u = await getuser(user);
          console.log(u[0]);
          await setDoc(doc(db,"messages",combinedId),{messages: []});
          //console.log(users.uid);
          const update1 = {
            combinedId:combinedId,
            uid:users.uid,
            email:users.email,
            username:users.username,
            profilepic:users.profilepic
          }
          const update2 ={
            combinedId:combinedId,
            uid:user.uid,
            email:user.email,
            username:u[0].username,
            profilepic:u[0].profilepic
          }
          // const response1 =    createChat(user.uid,update1);
          // const response2 =   createChat(users.uid,update2);
          //console.log(response1 ,response2)
             updateDoc(doc(db,"userchats",user.uid),{
                [combinedId+".userInfo"]: {
                    uid:users.uid,
                    email:users.email,
                    username:users.username,
                    profilepic:users.profilepic
                },
                [combinedId+".date"]: serverTimestamp()
            });  
             updateDoc(doc(db,"userchats",users.uid),{
                [combinedId+".userInfo"]: {
                    uid:user.uid,
                    email:user.email,
                    username:u[0].username,
                    profilepic:u[0].profilepic
                },
                [combinedId+".date"]: serverTimestamp() 
            });
            
           
                        
            }

            setUsername("");
            setUser({});
       
        } catch(err)
        {
           console.log(err);
        }
       
    };


return(
    <div>
    <div class="discussion search">
    <div class="searchbar">
   <Sea/>
      <input type="text" placeholder="Search..." onKeyDown={handleKey} value ={username} onChange={(e)=>setUsername(e.target.value)}></input>
    </div>
  </div>
  {err && <span>User not found</span>}
  
  { !(username === "")&& (Object.keys(users) != 0) && <div class="discussion message-active" onClick={handleSelect}>
  <img src={users.profilepic} class="photo" >
    {/* <div class="online"></div> */}
  </img>
  <div class="desc-contact">
    <p class="name">{users.username}</p>
    <p class="message"></p>
  </div>
  {/* <div class="timer">12 sec</div> */}
</div>}
</div>
);
};   export default Search;