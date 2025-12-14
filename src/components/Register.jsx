import React,{useState} from 'react';
import {FaUserPlus} from 'react-icons/fa'

const Register = () => {
  const[userData,setUserData]=useState({
    fullName:'',
    email:'',
    password:''
  });
  const handleChangeUserData=(e)=>{
   const {name,value}=e.target;

   setUserData((prevState) => ({
    ...prevState,
    [name]:value,
  }))
  }
  console.log(userData);
  const handleAuth = async ( ) => {
    try{
      alert('Register button clicked');
    }catch(error){
      console.log('Error during registration:', error);
    }

    // Authentication logic will go here
  }
  return (
    <section className='flex flex-col justify-center items-center h-[100vh] background-image'>
        <div className='bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col justify-center items-center '>   
            <div className='mb-10'>
                <h1 className='text-center text-[28px] font-bold'>Sign Up</h1>
                <p className='text-center text-sm text-gray-400'>Welcome, create an account to continue</p>
            </div>
            <div className='w-full'>
              <input type="text" name="fullName" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#00493958] mb-3 font-medium outline-none placeholder:text-[00493958]' placeholder='Full name'/>
              <input type="email" name="email" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#00493958] mb-3 font-medium outline-none placeholder:text-[00493958]' placeholder='Email'/>
              <input type="password" name="password" onChange={handleChangeUserData} className='border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#00493958] mb-3 font-medium outline-none placeholder:text-[00493958]' placeholder='Password'/>

            </div>
            <div className='w-full'>
              <button onClick={handleAuth} className='bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex justify-center items-center gap-2'>Register<FaUserPlus className='inline ml-2'/></button>

            </div>
            <div className='mt-5 text-center text-gray-400 text-sm'>
              <button >Already have an account? Login</button>
            </div>

        </div>
    </section>
  )

}































































































































































































export default Register