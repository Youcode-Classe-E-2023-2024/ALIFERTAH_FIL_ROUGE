import React from 'react'

function Primary({text}) {
  return (
    <button
      className='bg-[#346751] shadow-md shadow-gray-700  font-semibold text-white py-2 px-12 rounded'>
      {text}
    </button>
  )
}

export default Primary