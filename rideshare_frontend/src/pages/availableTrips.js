import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
        <main className='flex flex-wrap justify-center flex-col w-full items-center'>
            {!trips.length ? (
                <div>Loading ...</div>
            ) : (
                trips
                .filter(val => val.owner !== loggedUsername())
                .map((val, key) => (
                    <div className='' key={key}>
                        <div class="flex mx-auto items-center my-8">
                            <div class="flex bg-[#346751] p-4 rounded-lg">
                                <div class="flex flex-col w-2/3 pr-4 bg">
                                <div className='flex items-center'>
                                    <div className='flex items-center space-x-4'>
                                        <p class="text-2xl font-black mb-2 text-gray-50">{val.departure} </p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    <div className='flex items-center space-x-4'>
                                        <p class="text-2xl font-black mb-2 text-gray-50">{val.arrival} </p>
                                    </div>
                                </div>
                                <p class="text-lg font-light leading-5 text-gray-300">Where the earth is stepped on, there the sky is upheld</p>
                                <div class="flex h-full items-end text-gray-300 hover:text-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    <Link href={`/posts/${val.id}`} class="text-sm font-semibold flex items-center space-x-2">
                                    <span>BOOK NOW</span>
                                    </Link>
                                </div>
                                </div>
                                <div class="w-1/3">
                                <img class="w-full hover:animate-bounce rounded-lg" src="https://www.riautelevisi.com/foto_berita/77foto%20ilustrasi.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </main>
    );
}

export default AvailableTrips;
