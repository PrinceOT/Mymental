import axios from 'axios';
import { doc,updateDoc} from 'firebase/firestore';
import { db } from '../Auth/firebase';
const signupuser = async (username,psw,email,uid,url) => {
  
 
    try {
      
      console.log(username)
     const response = await axios.post(`${apiUrl}/signup`, {
      user:username,
      psw:psw,
      email:email,
      fbid:uid,
      profilepic:url,
     });
 
    console.log('User Data:', response.data);
     return response.data;
   } catch (error) {
     console.error('Error fetching user data:', error);
   }
 };

const getuser = async (user) => {
   const idToken = await user.getIdToken();
   
  
     try {
       
        
      const response = await axios.get(`${apiUrl}/user`, {
        headers: {
          Authorization: idToken,
        },
      });
  
    // console.log('User Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
const getother = async (user) => {
   
  
     try {
       
        console.log(user);
      const response = await axios.get(`${apiUrl}/other`, {
        headers: {
          Authorization: user,
        },
      });
  
     console.log('User Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
const getprofile = async (user) => {
   const idToken = await user.getIdToken();
  
     try {
       
        console.log(user);
      const response = await axios.get(`${apiUrl}/userinfo`, {
        headers: {
          Authorization: idToken,
        },
      });
  
     console.log('User Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
const getotherprofile = async (user) => {
   
  
     try {
       
        console.log(user);
      const response = await axios.get(`${apiUrl}/otherinfo`, {
        headers: {
          Authorization: user,
        },
      });
  
     console.log('User Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
const updateuser = async (user,update) => {
   const idToken = await user.getIdToken();
  
     try {
      

        //console.log(update);
      const response = await axios.patch(`${apiUrl}/user`,update, {
        headers: {
          Authorization: idToken,
        },
      });
  
    //  console.log('User Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      //console.log(error);
    }
  };

  const createChat = async (user,update) => {

      try {
         //console.log(update);
       const response = await axios.patch(`${apiUrl}/chat`,{update:update,uid:user});
       console.log('User Data:', response);
       //return response.data;
     } catch (error) {
       console.error('Error fetching user data:', error);
       //console.log(error);
     }
   };
  export  {getuser,updateuser,getprofile,signupuser,getother,getotherprofile,createChat};