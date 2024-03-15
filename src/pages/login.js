import React, { useState } from 'react';
import Image from 'next/image';
import Primary from '@/components/buttons/primary';

function Login() {
  const inputs = ["name", "email", "password", "confirmPassword", "birthday"];
    const emailT = "test.test@test.com"
    const passwordT = "test.test@test.com"
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailT, passwordT }),
      });
      if (response.ok) {
        console.log('Registration successful');
      } else {
        console.error(response.ok);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const [email, setEmail] = useState('alifertah');
  const [password, setPassword] = useState('');

  return (
    <main className='bg-gradient-to-r from-black to-gray-800 h-screen'>
      <div className='flex justify-center items-center '>
        <form className="mt-10 bg-white py-8 pl-40 m-4 pr-20 rounded shadow-inner shadow-md shadow-slate-900" onSubmit={handleSubmit}>
          {inputs.map((value, key) => {
            return (
              <div key={key}>
                <label htmlFor={value} className="block text-xs font-semibold text-gray-600 uppercase mt-2">{value}</label>
                <input id={value} type={value} name={value} placeholder={value} autoComplete={value}
                  className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required />
              </div>
            );
          })}
          <button type='submit'
            className='bg-[#346751] shadow-md shadow-gray-700 font-semibold text-white py-2 px-12 rounded hover:bg-[#346121] duration-500'
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
        <Image src="/imgs/login.png" className='ml-[-900px]' height={500} width={400} />
      </div>
    </main>
  );
}

export default Login;
