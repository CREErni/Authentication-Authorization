import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:5273/api/users', data);
      console.log("Signup successful: ", response.data);
      navigate("/login");
    } 
    catch (error) {
      console.error("Signup error: ", error.response ? error.response.data : error); 
      setSignupError('An error occurred during signup. Try using different username.');
      
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#61ADAB]">
        <div className="p-8 rounded-lg w-96">
          <h2 className="text-4xl text-center text-[#0C7F18] font-bold mb-6">Create account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="text-2xl block text-[#0F382A] mb-1" htmlFor="username"> 
                        Username
                    </label>
                    <input type="text" id="username" className="p-2 rounded bg-[#BCFFCA] w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    {...register("username", {required: "Username is required" })}/>
                    {errors.username && <p className="text-red-500 text-xs p-1">{errors.username.message}</p>}
                </div>
                <div className="mb-6">
                    <label className="text-2xl block text-[#0F382A]" htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" className="p-2 rounded bg-[#BCFFCA]  w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    {...register("password", {required: "Password is required"})}/>
                    {errors.password && <p className="text-red-500 text-xs p-1">{errors.password.message}</p>}
                </div>        
                {signupError && <p className="text-red-500 text-center">{signupError}</p>}            
                <button type="submit" className="w-full bg-[#0F382A] font-bold text-3xl text-[#F8E21E] p-2 rounded hover:bg-green-600 transition duration-200">
                    Sign up
                </button>
            </form>
            <p className="mt-4 text-[#0F382A] text-center">
              <Link to="/login">Already have an account? Login</Link>
            </p>
        </div>
    </div>
  );
}

export default Signup