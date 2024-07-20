import axios from 'axios';


const getgames = async  () => {

    try {
        const response = await axios.get('http://localhost:3001/gameview');
        
        return response.data
    
    } catch (error) {
        console.error('Error fetching user data:', error);
        
    }
};
const getonegame = async  (image) => {

    try {
        const response = await axios.get('http://localhost:3001/onegame',{
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
        const response = await axios.get( "http://localhost:3001/getlikegame",{
          
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
   const response = await axios.patch("http://localhost:3001/patchlikes",{gid}
   );

 // console.log('User Data:', response.data);
   //return response.data;
 } catch (error) {
   console.error('Error fetching user data:', error);
 }}
export {getgames,getgamelikes,postgamelikes,getonegame}