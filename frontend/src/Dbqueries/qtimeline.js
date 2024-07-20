
import axios from 'axios';



const getTimeline = async ( ) => {

    
    //const idToken = await user.getIdToken();
 
    try {
      
      // console.log(user);
     const response = await axios.get("http://localhost:3001/post", {
    
     });
 
   // console.log('User Data:', response.data);
     return response.data;
   } catch (error) {
     console.error('Error fetching user data:', error);
   }
 };
const getcomments = async (ptid) => {

    try {

     const response = await axios.get("http://localhost:3001/comments", {
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
      
     
       
     const response = await axios.get("http://localhost:3001/likes",{
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
     const response = await axios.get("http://localhost:3001/count",{
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
        const response = await axios.post("http://localhost:3001/post", dataToSend,{
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
       const response = await axios.post( "http://localhost:3001/comments",dataToSend,{
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
        const response = await axios.post( "http://localhost:3001/likes",Ptid,{
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
        const response = await axios.delete( "http://localhost:3001/likes",{
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