import { React } from "react";
import { useState,useContext } from "react";
import {Timestamp,collection,onSnapshot,serverTimestamp,query,orderBy,querySnapshot,doc, arrayUnion, updateDoc} from 'firebase/firestore'
import { auth , db} from '../../../Auth/firebase';
import { useAuth } from "../../../Auth/AuthProvider";
import { ChatContext } from './ChatContext';
import {v4 as uuid} from "uuid";
import {emojify, unemojify} from 'node-emoji'

import EmojiPicker  from 'emoji-picker-react';
import { addWords, isBad } from 'adults';
import { Send as Sent} from "@mui/icons-material";

 

const Send = () =>{
    const {data} = useContext(ChatContext);
    const{user} = useAuth();
    const [chosenEmoji, setChosenEmoji] = useState(false);
    const [input ,setInput] = useState('');
    

    const sendMessage = async () =>{
        console.log(data.user.uid);
        addWords("kill","die")
       // e.preventDefault();
        if(input===''){
            return
        }
        if(!isBad(input)){
          updateDoc(doc(db,"messages",data.chatId),{
            messages:arrayUnion({
                id:uuid(),
                input,
                senderId:user.uid,
                date:Timestamp.now(),
            })
        })
   
     updateDoc(doc(db,"userchats",data.user.uid),{
        [data.chatId+".lastMessage"]:{
            input,
        },
        [data.chatId+".date"]:serverTimestamp(),
    });
     updateDoc(doc(db,"userchats",user.uid),{
        [data.chatId+".lastMessage"]:{
            input,
        },
        [data.chatId+".date"]:serverTimestamp(),
    });}else{
        setInput('Please refrain from using profanity')
        await timeout(5000);

    }
        setInput('');
    }

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const onEmojiClick = ( emojiObject) => {
        //setChosenEmoji(emojiObject);
        //setInput(input+emojiObject.emoji)
        console.log(emojiObject)
      };
//     const yest = (emoji,e) => {
// console.log(emoji.getImageUrl);
        
//     }
    return(
        <div class="footer-chat">
            {/* {chosenEmoji && <div style={{position:"relative"}}><EmojiPicker height={450} width={500}  onEmojiClick={(e)=>onEmojiClick(e)}/> </div>} */}
            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f604.png" onClick={()=>setChosenEmoji(true)} style={{width:"40px",height:"40px",marginLeft:"50px",cursor:"pointer"}}/>
        {/* <i class="icon fa fa-smile-o clickable"  aria-hidden="true" ></i> style="font-size:25pt;" */}
       <input type="text" value={input} onChange={(e)=>setInput(emojify(e.target.value))}class="write-message" placeholder="Type your message here"></input>
       <button class="icon send fa fa-paper-plane-o clickable" aria-hidden="true" onClick={()=>sendMessage()}><Sent/></button>
     </div>

    );
};
export default Send;