import Primary from '@/components/buttons/primary';
import Image from 'next/image'
import React, { useState } from 'react'

const inputs = [
  {
    name: "departure",
    question : "What is the departure address?",
  },
  {
    name: "arrival",
    question : "What is the arrival address?",
  },
  {
    name: "date",
    question : "What is the departure date and time?",
  },
  {
    name: "places",
    question : "How many places you have?",
  },
]

const steps = [];
  for (let i = 0; i < inputs.length; i++) {
    steps.push(
    <li class="flex items-center text-green-600 space-x-2.5 rtl:space-x-reverse">
      <span class="flex items-center justify-center w-8 h-8 border border-green-600 rounded-full shrink-0">
          {i + 1}
      </span>
    </li>
);
  }
  function NewTrip() {

  const [currentIndex, setCurrentIndex] = useState(0)
    const handleClick = () => {
      if(currentIndex < inputs.length)
        setCurrentIndex(currentIndex + 1)
      else{
        setCurrentIndex(0)
      }
    }

  return (
    <div className="bg-[#F5F5F5] my-40 flex flex-col items-center justify-center py-8 space-y-8 w-full">
      <ol class="items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        {steps}
      </ol>

        <h1 className="text-3xl font-semibold  pt-8 text-black">{inputs[currentIndex].question}</h1>
        <div className="flex items-center rounded-full justify-center bg-white shadow-lg py-2 pl-2">
        <Image src="/icons/location.svg" height={15} width={15} />
          <input type="text" size="60" placeholder="Enter text here..." 
          className=" mr-4 ml-2 max-w-full bg-white focus:outline-none text-dark"/>
        </div>

        <div onClick={handleClick}>
          <Primary text="Submit"/>
        </div>
    </div>
  )
}

export default NewTrip