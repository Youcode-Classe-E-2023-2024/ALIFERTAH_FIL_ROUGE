import React from 'react'

/**
 * this is the primary button 
 * @param {*} param0 
 * @returns 
 */
function Primary({text}) {
  return (
    <button
      className='bg-[#346751] shadow-md shadow-gray-700  font-semibold text-white py-2 px-12 rounded hover:bg-[#346121] duration-500'>
      {text}
    </button>
  )
}

export default Primary