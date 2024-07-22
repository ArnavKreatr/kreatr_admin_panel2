'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


const Login = () => {
  const [Username,setUsername]= useState('')
  const [Password,setPassword]= useState('')
  const router = useRouter();

  const loginBtn = async () => {
    try {
      console.log(Username, Password);
  
      const body = {
        phoneNo: Username,
        password: Password
      };
  
      const response = await fetch('https://prukyi52kg.execute-api.ap-south-1.amazonaws.com/dev/adminLogin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json' // Set the Content-Type header
        },
        body: JSON.stringify(body)
      });
  
      // Check if the response is OK (status code 200-299)
      
  
      const data = await response.json(); // Parse the response as JSON
      console.log(data.permission.blogs);
      if(data.permission){
        const jsonString = JSON.stringify(data.permission);
        localStorage.setItem('permission',jsonString);
        router.push('/choosePlatform');
      }
      // Redirect to another page if login is successful
      
    } catch (error) {
      console.error('Error during login:', error);
      alert(`Login failed: ${error.message}`);
    }
  };
  return (
    <div className=' h-full w-full flex flex-col bg-light justify-center items-center'>

      <div className=' w-[20%] h-[20%] relative'>
      <Image layout='fill' src={'/assets/darkkreatrLogo.svg'}/>
      </div>

      <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder='Username' className='  placeholder:text-dark placeholder:text-opacity-[50%] rounded-md p-4 w-[40%] bg-white'/>
      <div className=' h-5'/>
      <input type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='  placeholder:text-dark placeholder:text-opacity-[50%] rounded-md p-4 w-[40%] bg-white'/>
      <div className=' h-5'/>
      <div onClick={()=>{loginBtn()}} className=' border pl-4 pr-4 pt-2 pb-2 border-dark rounded-lg cursor-pointer'>Login</div>
    </div>
    
  )
}

export default Login;