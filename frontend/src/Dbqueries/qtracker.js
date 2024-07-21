
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

  const postUserData = async (dataToSend,user) =>{
   
    const idToken = await user.getIdToken();
    try {
        const response = await axios.post(`${apiUrl}/mymental/progress`, dataToSend,{
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
  
const getUserData = async (user) => {

    
     const idToken = await user.getIdToken();
  
     try {
       
        console.log(user);
      const response = await axios.get(`${apiUrl}/mymental/progress/get`, {
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
  
//};

export {postUserData,getUserData};
