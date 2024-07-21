import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;

const getgames = async  () => {

    try {
        const response = await axios.get(`${apiUrl}/gameview`);
        
        return response.data
    
    } catch (error) {
        console.error('Error fetching user data:', error);
        
    }
};
const getonegame = async  (image) => {

    try {
        const response = await axios.get(`${apiUrl}/onegame`,{
          headers: {
            imageurl: image,
          },
        })

        return response.data
    
    } catch (error) {
        console.error('Error fetching user data:', error);
        
    }
};
 const getgamelikes = async (gid) =>{

  
  
    
    try {
        const response = await axios.get( `${apiUrl}/getlikegame`,{
          
        headers: {
          gid:gid,
        },
    }
          
        );
      
    
        //console.log('User Data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

const postgamelikes = async (gid) => {
  try {
    
   
   console.log(gid);
   const response = await axios.patch(`${apiUrl}/patchlikes`,{gid}
   );

 // console.log('User Data:', response.data);
   //return response.data;
 } catch (error) {
   console.error('Error fetching user data:', error);
 }}
export {getgames,getgamelikes,postgamelikes,getonegame}