import axios from 'axios';
import Image from 'next/image'

import React, { useEffect, useState } from 'react'

function Header() {

  const [isDropDown, setIsDropDown] = useState(false)
  
  const handleDropDownToggle = () =>{
    setIsDropDown(!isDropDown);
  }
  
  useEffect(() => {
    const authToken = () => {
      const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
      return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    axios.defaults.headers.common['Authorization'] = authToken() ? `Bearer ${authToken()}` : '';
  }, []);
  
  const logout = () => {
    axios.post("http://127.0.0.1:8000/logout")
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error("Error :: ", error)
    })
    const tokenName = document.cookie.split("=");
    console.log(tokenName)
    document.cookie = "token" + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + tokenName[1] + ';';
  }
  return (
    <div className='bg-[#161616] text-[#F8F8F8] h-16 flex w-full justify-around items-center'>
        <Image src="/imgs/logo.png" width={60} height={100} />
        <nav className='flex items-center'>
            <a href='/newTrip' className='flex items-center rounded px-4 py-2 ml-4 cursor-pointer'><Image className='mr-4 cursor-pointer' src="/icons/New.svg" height={20} width={20} /><span>New</span></a>
            <div className='flex items-center  rounded px-4 py-2 ml-4 cursor-pointer'><Image className='mr-4 cursor-pointer' src="/icons/search.svg" height={20} width={20} /><span>Search</span></div>
          <div className='relative'>
            <div className='flex items-center bg-[#2D2D2D] rounded px-8 py-2 ml-4 cursor-pointer'><span>John Doe</span>
            <Image className={`ml-4 transition-transform transform ${isDropDown ? 'rotate-180' : ''}`}
              onClick={handleDropDownToggle}
              src="/icons/dropdown.svg" height={10} width={10} />
            </div>
            {isDropDown && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
            <div className='py-1'>
              <a href="#" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Profile</a>
              <a href="#" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Settings</a>
              <a onClick={logout} className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Logout</a>
              <a href="/register" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Register</a>
            </div>
          </div>
        )}
        </div>
        </nav>
    </div>
  )
}

export default Header