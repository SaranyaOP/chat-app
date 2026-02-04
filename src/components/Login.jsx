import React,{useState} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';
import WelcomeNote from './WelcomeNote';
import { toast } from "react-toastify";


const Login = ({ isLogiin, setIsLogin }) => {
  const[userData,setUserData]=useState({
      email:'',
      password:''
    });
  const [isLoading,setIsLoading]=useState(false);
    const handleChangeUserData=(e)=>{
     const {name,value}=e.target;
  
     setUserData((prevState) => ({
      ...prevState,
      [name]:value,
    }))
    }
    
    const handleAuth = async ( ) => {
      // Authentication logic will go here
      setIsLoading(true);
       if (
            userData?.email === "" ||
            userData?.password === ""
          ) {
            toast.error("Please fill all fields");
            setIsLoading(false);
            return;
          }
      try{
       await signInWithEmailAndPassword(
          auth,
          userData?.email,
          userData?.password
        );
      }catch(error){
        toast.error("Invalid email or password");
        console.log('Error during login:', error);
      } finally{
        setIsLoading(false);
      }
  
      
    }
  return (
     <section className='flex flex-col justify-center items-center h-[100vh] background-image'>
      <WelcomeNote />
         <div className='bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col justify-center items-center mb-4'>   
             <div className='mb-10'>
                 <h1 className='text-center text-[28px] font-bold'>Sign In</h1>
                 <p className='text-center text-sm text-gray-400'>Welcome back, Login to continue</p>
             </div>
             <div className='w-full'>
               <input type="email" name="email" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#00493958] mb-3 font-medium outline-none placeholder:text-[00493958]' placeholder='Email'/>
               <input type="password" name="password" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#00493958] mb-3 font-medium outline-none placeholder:text-[00493958]' placeholder='Password'/>
 
             </div>
             <div className='w-full'>
               <button disabled={isLoading} onClick={handleAuth} className='bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex justify-center items-center gap-2'>
                {isLoading ? <>Processing...</> : <>  Login<FaSignInAlt className='inline ml-2'/></>}
              </button>
 
             </div>
             <div className='mt-5 text-center text-gray-400 text-sm'>
               <button onClick={()=>setIsLogin(!isLogiin)}>Don't have an account? Sign Up</button>
               
             </div>
 
         </div>
     </section>
  )
}

export default Login