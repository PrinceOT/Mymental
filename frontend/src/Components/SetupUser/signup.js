import React, { useState} from 'react';
import './register.scss' 
import { useAuth } from '../../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const {  register } = useAuth();
    const navigate = useNavigate();
    const  [form,setForm] = useState({
        user:'',
        email:'',
        psw:'',
        pswrepeat:'',
    });
   
    const [match,setMatch] = useState(false);
    const [errors, setErrors] = useState({});

   
      function checkuser  (error) {
        const newRrr = {};
        newRrr.user = error;
        setErrors(newRrr);
        return true;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        
       try {
        if(validateForm()){
          const newErrors = {};
              const response =  await register(form.email,form.psw ,form.user);
              console.log(response);
               response === "User created" ?  navigate('/mymental') : newErrors.email = 'Email address already in use';
               setErrors(newErrors);
               //log in user after register signIn(form.email,form.psw)
               
        }
           
         } catch (error) {
           console.log('Registration error:', error.message);
           
          }
      };
   

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setForm((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,20}$/;
    
        if (!form.user.trim()) {
          newErrors.user = 'Username is required';
        }
    
        if (!form.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
          newErrors.email = 'Invalid email address';
        }
    
        if (!form.psw.trim()) {
          newErrors.psw = 'Password is required';
        } else if (form.psw.length < 6) {
          newErrors.psw = 'Password must be at least 6 characters';
        } else if (!passwordRegex.test(form.psw)){
            newErrors.psw = 'Incorrect format';
        }
    
        if (form.psw !== form.pswrepeat) {
          newErrors.pswrepeat = 'Passwords do not match';
        }
    
        setErrors(newErrors);
    
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
      };


return (

  <div class="wrapper">
  <h2>Registration</h2>
  <form onSubmit={handleRegister}>
    <div class="input-box">
      <input type="text" placeholder="Enter your Username" name='user' id='user' value={form.user}  onChange={handleChange} required/>
    </div>
    <div class="input-box">
      <input type="text" placeholder="Enter your Email" name='email' id='email' value={form.email}  onChange={handleChange} required/>
    </div>
    <div class="input-box">
      <input type="password" placeholder="Create Password" name='psw' id='psw' value={form.psw}  onChange={handleChange} required/>
    </div>
    <div class="input-box">
      <input type="password" placeholder="Confirm Password" name='pswrepeat' id='pswrepeat' value={form.pswrepeat}  onChange={handleChange} required/>
    </div>
    <div class="policy">
      <input type="checkbox"/>
      <h3>I accept all terms & condition</h3>
    </div>
    <div class="input-box button">
      <input type="Submit" />
    </div>
    <div class="text">
      <h3>Already have an account? <a href="/login">Login now</a></h3>
    </div>
  </form>
</div>

//     <form class="register" >
//       <div class="full-page">
//       <h1 class="h1">Register</h1>
//     <div class="containers">
    
    
    
    
//     {/* <input type="username" placeholder="Enter username" name="username" value={username} id="username"  onChange={(e) => setUsername(e.target.value)}  required/> --> */}
//     <div class="input"><label for="username"><b>Username</b></label>
//     {/* <label htmlFor="user"><b>Username</b></label> */}
//     <input type="text"
//      placeholder=""
//       name="user"
//        value={form.user}
//         id="user"
         
//           onChange={handleChange}   />
//           {errors.user && <p className="error">{errors.user}</p>}
//     </div>
    
//     <div class="input">
//       <label htmlFor="email"><b>Email     </b></label>
//     <input type="email"
//      placeholder=""
//       name="email"
//        value={form.email}
//         id="email"
//           onChange={handleChange}
//             />
//             {errors.email && <p className="error">{errors.email}</p>}
//             </div>

//  <div class="input" >
//     <label htmlFor="psw"><b>Password</b></label>
//     <input 
//     type="password"
//      placeholder=""
//       name="psw"
//        value={form.psw}
//         id="psw"
         
//           onChange={handleChange}
//              />
//              {errors.psw && <p className="error">{errors.psw}</p>}
//     </div>

//     <div class="input">
//      <label htmlFor="pswrepeat"><b>Repeat Password</b></label>
//     <input type="password"
//      placeholder=""
//       name="pswrepeat"
//        value={form.pswrepeat}
//         id="pswrepeat"
         
//            onChange={handleChange} /> 
//            {errors.pswrepeat && <p className="error">{errors.pswrepeat}</p>}
//     </div> 
   
   
   
    

//     {/* <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
//     <button type="submit" >Register</button> */}
//   </div> <button type="submit" onClick={(e)=>handleRegister(e)} class="btn-primarys">Register</button></div>
//  {match ? (
//         <div>

//     <p>Password do not match</p>


//     <hr/> 
//     </div>):(
//         <hr class="divider"/>
//         )}
//   <div class="container-sign">
//     <h2 class="login-header">Already have an account</h2>
//  <a href='/login'> <button type="button"class="btn-secondary">Log in</button></a>
//   </div>
//   </form>
);
};
export default Register;