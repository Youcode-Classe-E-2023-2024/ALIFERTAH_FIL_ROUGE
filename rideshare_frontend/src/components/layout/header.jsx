import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

function Header() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDropDownToggle = () => {
    setIsDropDown(!isDropDown);
  };

  useEffect(() => {
    const authToken = document.cookie.split('; ').find(row => row.startsWith('token='));
    setIsLoggedIn(!!authToken);

    axios.defaults.headers.common['Authorization'] = authToken ? `Bearer ${authToken.split('=')[1]}` : '';
  }, []);

  const logout = () => {
    axios.post("http://127.0.0.1:8000/logout")
      .then(response => {
        console.log(response.data);
        document.cookie.split(";").forEach(cookie => {
          const cookieName = cookie.split("=")[0].trim();
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        });
        setIsLoggedIn(false);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-[#161616] text-[#F8F8F8] h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8">
      <div>
        <Image src="/imgs/logo.png" width={60} height={100} />
      </div>
      <nav className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link href="/newTrip" className="flex items-center rounded px-4 py-2 ml-4 cursor-pointer"><Image className="mr-2" src="/icons/New.svg" height={20} width={20} /><span className="hidden sm:inline-block">New</span></Link>
            <Link href="/availableTrips" className="flex items-center rounded px-4 py-2 ml-4 cursor-pointer"><span className="hidden sm:inline-block">Available trips</span></Link>
            <div className="flex items-center bg-[#2D2D2D] rounded px-4 py-2 ml-4 cursor-pointer relative">
              <span className="hidden sm:inline-block">John Doe</span>
              <Image
                className={`ml-2 transition-transform transform ${isDropDown ? 'rotate-180' : ''}`}
                onClick={handleDropDownToggle}
                src="/icons/dropdown.svg"
                height={10}
                width={10}
              />
              {isDropDown && (
                <div className="absolute right-0 mt-56 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a>
                    <div onClick={logout} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <a href="/login" className="flex items-center bg-[#2D2D2D] rounded px-4 py-2 ml-4 cursor-pointer">Login</a>
        )}
      </nav>
    </div>
  );
}

export default Header;
