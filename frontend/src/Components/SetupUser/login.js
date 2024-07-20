import React, { useState,useEffect } from 'react';
import './register.scss'
import { useAuth ,AuthProvider } from '../../Auth/AuthProvider';
import { getAuth ,onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const axios = require('axios');

const Login = () => {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  
    const {  user,signIn,signOut } = useAuth();
const  [form,setForm] = useState({
    email:'',
    psw:'',
   
});
//const [user, setUser] = useState(null);
//const auth = getAuth();


const handleChange = (e) =>{
   // console.log(user);
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
   
}
const handleLogout = async () => {
    //e.preventDefault();
   try {
    
           signOut();
           
     } catch (error) {
       console.log('Registration error:', error.message);
    
      }
  };
const handleLogin = async (e) => {
    e.preventDefault();
   try {
   
          const resp = await signIn(form.email,form.psw);
           resp === "User inValid" ? setErrors("Invalid password or username") : navigate('/mymental')
           //setForm({ email: '', psw: '' });
           
     } catch (error) {
       console.log('Registration error:', error.message);
    
      }
  };


return(

  <div class="wrapper">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
     
      <div class="input-box">
        <input type="text" placeholder="Enter your email"  name="email"
       value={form.email}
        id="email"
         
           onChange={handleChange} required/>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Enter password"  name="psw"
       value={form.psw}
        id="psw"
         
           onChange={handleChange} required/>
      </div>
    
      <div class="input-box button">
        <input type="Submit" value="Login Now"/>
      </div>
      <div class="text">
        <h3>New my Mymental ? <a href="/register">Register Now!</a></h3>
      </div>
    </form>
  </div>







//     <html>
//     {true? (
//     <form class="register"onSubmit={handleLogin}>
//       <div class="full-page"><h1>Login</h1>
//     <div class="container-login">
    
        
    

     
//     <div class="input">
//       <label htmlFor="email"><b>Email</b></label>
//     <input type="email"
//      placeholder=""
//       name="email"
//        value={form.email}
//         id="email"
//           onChange={handleChange}
//             />
//             {/* {errors.email && <p className="error">{errors.email}</p>} */}
//             </div>

//  <div class="input" >
//     <label htmlFor="psw"><b>Password</b></label>
//     <input 
//     type="password"
//      placeholder=""
//       name="psw"
//        value={form.psw}
//         id="psw"
         
//            onChange={handleChange}
//              />
//              {errors && <p className="error">{errors}</p>}
//     </div>
       
    
// {/*     
//     <hr/>

//     <label htmlFor="email"><b>Username</b></label>
//     <input type="email" placeholder="Enter Email" name="email" value={form.email} id="email"  onChange={handleChange}  required/>
//  <div className='password'>
//     <label htmlFor="psw"><b>Password</b></label>
//     <input type="password" placeholder="Enter Password" name="psw" value={form.psw} id="psw"  onChange={handleChange}   required/>

//     </div>
//     <hr/>

//     <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
//     <button type="submit">Login</button> */}




//   </div>
//    <button type="submit" onClick={(e)=>handleLogin(e)} class="btn-primarys">Login</button>
//  </div>
//  <hr class="divider"/>
//    <div class="container-sign">
//   <h2 class="login-header">New to myMental?</h2>
//   <a href='/register'><button  type="button" class="btn-secondary">Register</button></a>
   
//   </div>
//   </form>
//   ) : (
//     <div>
//         <h1>Login</h1>
//         <p>{user.email}</p>
//         <button onClick={handleLogout} >log out</button>
   
// </div>
//   )}
//   </html>

)
  
        

}
export default Login;