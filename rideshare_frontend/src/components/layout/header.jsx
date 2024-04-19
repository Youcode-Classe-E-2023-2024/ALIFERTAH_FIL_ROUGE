import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
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
        console.log(response.data);
        document.cookie.split(";").forEach(cookie => {
          const cookieName = cookie.split("=")[0].trim();
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        });
      })
      .catch(error => {
        console.error("Error :: ", error);
      });
  };

  const [cookies, setCookies] = useState("")
  useEffect (()=>{
    setCookies(document.cookie)
  }, [])
  return (
    <div className='bg-[#161616] text-[#F8F8F8] h-16 flex w-full justify-around items-center'>
        <Image src="/imgs/logo.png" width={60} height={100} />

        {
          cookies ? (
          <nav className='flex items-center'>
              <Link href='/newTrip' className='flex items-center rounded px-4 py-2 ml-4 cursor-pointer'><Image className='mr-4 cursor-pointer' src="/icons/New.svg" height={20} width={20} /><span>New</span></Link>
              <Link href='/availableTrips' className='flex items-center rounded px-4 py-2 ml-4 cursor-pointer'><span>Availabale trips</span></Link>
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
                <Link href="/dashboard" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Dashboard</Link>
                <a href="#" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Settings</a>
                <div onClick={logout} className='cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200'>Logout</div>
                <Link href="/register" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Register</Link>
              </div>
            </div>
          )}
          </div>
        </nav>
          ) : (

          <nav className='flex items-center'>
            <a
            href='/login'
            className='flex items-center bg-[#2D2D2D] rounded px-8 py-2 ml-4 cursor-pointer'><span>Login</span>
          </a>
        </nav>
          )
        }
    </div>
  )
}

export default Header