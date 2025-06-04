import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";
import { useState } from "react";
import axios from "axios";



export function SigninPage() {
const [Email , setEmail] = useState('')
const [Password , setPassword] = useState('');
const navigate =useNavigate();

    function Signin(){
       axios.post('http://localhost:3000/api/v1/user/signup'
 , {
        Email ,
        Password
       })

       alert('You have Signed-up')
}

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-80 space-y-6">
        <h2 className="text-2xl font-bold text-center text-purple-700">Welcome Back</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
        value={Email} onChange={(e)=>{setEmail(e.target.value)}}  />
          <input
            type="password"
            placeholder="Password..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
        value={Password} onChange={(e)=>{setPassword(e.target.value)}}   />
           <div className="flex justify-center items-center ">
          <Button onClick={Signin} variant="primary" text="Signin" />
        </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <button className="text-purple-600 font-medium cursor-pointer" onClick={()=>
            navigate('/signup')
          }>Log in</button>
          </p>
      </div>
    </div>
  );
}

