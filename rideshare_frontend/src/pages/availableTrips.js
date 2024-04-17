import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function AvailableTrips() {
    const [trips, setTrips] = useState([]);
    const loggedUsername = () => {
        const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    };
    useEffect(() => {
        const authToken = () => {
            const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
            return tokenCookie ? tokenCookie.split('=')[1] : null;
        };
        
        axios.defaults.headers.common['Authorization'] = authToken() ? `Bearer ${authToken()}` : '';
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/allTrips')
            .then((response) => {
                setTrips(response.data.trips);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <main className='flex'>
    {!trips.length ? (
        <div>Loading ...</div>
    ) : (
        trips
            .filter(val => val.owner != loggedUsername)
            .map((val, key) => (
                <div className='max-w-md mx-auto overflow-hidden shadow-lg hover:shadow-xl duration-500 my-12' key={key}>
                    <div className='p-6 space-y-8'>
                        <div className='flex space-x-12'>
                            <div className='space-y-4'>
                                <div className='flex space-x-4'>
                                    <span>12:07</span>
                                    <div className='flex pr-12 items-center'>
                                        <Image src="/icons/location.svg" width={15} height={15} alt="Location Icon"/>
                                        <span>{val.departure}</span>
                                    </div>
                                    <span className='bg-[#346751] rounded-full text-white px-2'>{val.price} $</span>
                                </div>
                                <div className='flex space-x-4'>
                                    <span>12:07</span>
                                    <div className='flex items-center'>
                                        <Image src="/icons/location.svg" width={15} height={15} alt="Location Icon"/>
                                        <span>{val.arrival}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex space-x-20 border-t'>
                            <span>{val.owner}</span>
                            <span className='text-[#346751] font-bold-xl flex items-center space-x-2'>
                                <p>
                                    {val.places}
                                </p>
                                <Image src="/icons/user.svg" width={10} height={10}/>
                                </span>
                            <a href={`/posts/${val.id}`} className='text-[#346751] flex items-center hover:scale-110 duration-300'>
                                <span>GO</span>                                
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                            </svg>
                            </a>
                        </div>
                    </div>
                </div>
            ))
    )}
</main>

    )
}

export default AvailableTrips
