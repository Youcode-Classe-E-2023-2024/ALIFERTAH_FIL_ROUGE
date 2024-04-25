import Image from 'next/image';
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const inputs = ["email", "password"];
  const formData = {
    email, password
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Set cookies and redirect on successful login
        document.cookie = `token=${response.data.data.token}`
        document.cookie = `role=${response.data.data.user.role}`
        document.cookie = `username=${response.data.data.user.username}`
        document.cookie = `userId=${response.data.data.user.id}`
        
        // Display success toast
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Redirect to the desired page after a delay
        setTimeout(() => {
          router.replace('/availableTrips');
        }, 2000);
      } else {
        // Display error toast for unsuccessful login
        toast.error('Registration failed: ' + response.statusText, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      // Display error toast for server errors
      toast.error('Error registering user: ' + error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <main className='bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center'>
      <div className='flex flex-col md:flex-row justify-center items-center'>
        <Image src="/imgs/login.png" alt="Login" height={400} width={400} className="mx-auto md:mr-8" />
        <form className="mt-10 bg-white p-8 rounded shadow-inner shadow-md shadow-slate-900" onSubmit={handleSubmit}>
          {inputs.map((value, key) => (
            <div key={key} className="mb-4">
              <label htmlFor={value} className="block text-xs font-semibold text-gray-600 uppercase">{value}</label>
              <input  
                id={value}
                value={formData[value]}
                onChange={handleInputChange} 
                type={value === "password" ? "password" : "text"}
                name={value} 
                placeholder={value}
                className="w-full py-3 px-4 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required 
              />
            </div>
          ))}
          <button type='submit' className='bg-[#346751] shadow-md font-semibold text-white py-2 px-12 rounded hover:bg-[#346121] duration-500'>
            Login
          </button>
          <div className="mt-4 text-sm text-center">
            <a href="#" className="underline">Forgot password?</a>
            <span className="mx-2 text-gray-500">or</span>
            <a href="#" className="underline">Create an Account</a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </main>
  )
}

export default Login
