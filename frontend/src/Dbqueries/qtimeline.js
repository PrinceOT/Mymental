
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getTimeline = async ( ) => {

    
    //const idToken = await user.getIdToken();
 
    try {
      
      // console.log(user);
     const response = await axios.get(`${apiUrl}/post`, {
    
     });
 
   // console.log('User Data:', response.data);
     return response.data;
   } catch (error) {
     console.error('Error fetching user data:', error);
   }
 };
const getcomments = async (ptid) => {

    try {

     const response = await axios.get(`${apiUrl}/comments`, {
      headers: {
        Ptid: ptid,
       }
       }
     );
     return response.data;
    }catch (error) {
      console.error('Error fetching user data:', error);
    }}

const getlikes = async (ptid) => {
    try {
      
     
       
     const response = await axios.get(`${apiUrl}/likes`,{
       headers: {
        
        Ptid: ptid,
       }
     });
 
   // console.log('User Data:', response.data);
     return response.data;
   } catch (error) {
     console.error('Error fetching user data:', error);
   }}
const countlikes = async (ptid,user) => {
    try {
      
     
      const idToken = await user.getIdToken();
     const response = await axios.get(`${apiUrl}/count`,{
       headers: {
        Authorization:idToken,
        Ptid: ptid,
       }
     });
 
   // console.log('User Data:', response.data);
     return response.data;
   } catch (error) {
     console.error('Error fetching user data:', error);
   }}
 

 const postTimeline = async (dataToSend,user) =>{
   
    const idToken = await user.getIdToken();
    try {
      console.log(dataToSend);
        const response = await axios.post(`${apiUrl}/post`, dataToSend,{
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
 const postcomment = async (dataToSend,user) =>{
   
    const idToken = await user.getIdToken();
    try {
      console.log(dataToSend.Ptid)
       const response = await axios.post( `${apiUrl}/comments`,dataToSend,{
          headers: {
            Authorization: idToken,
          },
        });
    
        // console.log('User Data:', response.data);
        // return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
 const postlikes = async (ptid,user) =>{

    const Ptid = {
      Ptid:ptid,
    }
  
    const idToken = await user.getIdToken();
    try {
        const response = await axios.post( `${apiUrl}/likes`,Ptid,{
          headers: {
            Authorization: idToken,         
          },
        });
      
    
        //console.log('User Data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


 const deletelikes = async (dataToSend,user) =>{
  
  
    const idToken = await user.getIdToken();
    
    try {
        const response = await axios.delete( `${apiUrl}/likes`,{
          headers: {
            Authorization: idToken,
            Ptid:dataToSend,
          },
        });
    
        console.log('User Data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };





    export {getTimeline , postTimeline,getcomments,postcomment,postlikes,deletelikes,getlikes,countlikes};