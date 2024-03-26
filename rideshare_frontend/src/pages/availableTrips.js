import Image from 'next/image'
import React from 'react'

function AvailableTrips() {
  return (
    <main className='flex'>
      <div className='max-w-md mx-auto overflow-hidden shadow-lg hover:shadow-xl duration-500 my-12'>
        <div className='p-6 space-y-8'>
          <div className='flex space-x-12'>
            <div className='space-y-4'>
              <div className='flex space-x-4'>
                <span>12:07</span>
                <div className='flex pr-12 items-center'>
                  <Image src="/icons/location.svg" width={15} height={15} alt="Location Icon"/>
                  <span>Metz</span>
                </div>
                <span className='bg-[#346751] rounded-full text-white px-2'>400$</span>
              </div>
              <div className='flex space-x-4'>
                <span>12:07</span>
                <div className='flex items-center'>
                  <Image src="/icons/location.svg" width={15} height={15} alt="Location Icon"/>
                  <span>Paris</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex space-x-20 border-t'>
            <span>john doe</span>
            <span className='text-[#346751]'>4.5</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AvailableTrips
