import '../../../App.scss';
import { useAuth } from '../../../Auth/AuthProvider';
import { postcomment } from '../../../Dbqueries/qtimeline';
import { useState } from 'react';
import {format} from "timeago.js"

const Comments = ({cid , comment,username,created_at,profilepic}) => {
   
   
   
    return (
       
          
            <div class ="comment">
                <img src={profilepic} alt=""/>
                <div class ="info">
                  <span>{username}</span>
                  <p>{comment}</p>

                </div>
                <span class= 'date'>{format(created_at)}</span>
            </div>
    
    )
}
export default Comments;