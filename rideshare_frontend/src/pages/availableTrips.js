import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function AvailableTrips() {
    const [trips, setTrips] = useState([]);
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
                trips.map((val, key) => (
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
                                <span className='text-[#346751]'>{val.places}</span>
                                <a href={`/posts/${val.id}`} className='text-[#346751]'>GO</a>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </main>
    )
}

export default AvailableTrips
