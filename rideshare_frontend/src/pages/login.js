import Image from 'next/image';
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const inputs = ["email", "password"];
  const formData = {
    email: "test1@test1.test1", password: "test1@test1.test1"
  }
  /**
   * 
   * @param {*} e 
   */
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
        const response = await axios.post('http://127.0.0.1:8000/login', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          toast.success('Login successful', {
            position: 'top-right',
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
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
        console.log(error.message)
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

  return (
    <main className='bg-gradient-to-r from-black to-gray-800 h-screen flex items-center justify-center'>
      <div className='flex justify-center items-center '>
        <form className="mt-10 bg-white py-8 pl-40 m-4 pr-20 rounded shadow-inner shadow-md shadow-slate-900" onSubmit={handleSubmit}>
          {inputs.map((value, key) => {
            return (
              <div key={key}>
                <label htmlFor={value} className="block text-xs font-semibold text-gray-600 uppercase mt-2">{value}</label>
                <input  id={value} 
                type={value === "password" ? ("password") : (value === "birthday" ? ("date") : "text")} 
                name={value} placeholder={value}
                  className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required />
              </div>
            );
          })}
          <button type='submit'
            className='bg-[#346751] shadow-md shadow-gray-700 font-semibold text-white py-2 px-12 rounded hover:bg-[#346121] duration-500 mt-4'
          >
            Register
          </button>

          <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <a href="#" className="flex-2 underline">
              Forgot password?
            </a>

            <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
              or
            </p>

            <a href="#" className="flex-2 underline">
              Create an Account
            </a>
          </div>
        </form>
        <ToastContainer /> 
        <Image src="/imgs/login.png" className='ml-[-700px]' height={400} width={400} />
      </div>
    </main>
  )
}

export default Login