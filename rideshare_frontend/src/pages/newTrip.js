import Primary from '@/components/buttons/primary';
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


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
    name: "car",
    question : "What is your car?",
  },
  {
    name: "date",
    question : "What is the departure date and time?",
  },
  {
    name: "places",
    question : "How many places you have?",
  },
  {
    name: "price",
    question : "What is the price per person?",
  },
]

function NewTrip() {
  const owner = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('username='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  useEffect(() => {
    const authToken = () => {
      const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
      return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    axios.defaults.headers.common['Authorization'] = authToken() ? `Bearer ${authToken()}` : '';
  }, []);

  const handleSubmit = () => {
    const ownerData = { owner: owner() };
    const formDataWithOwner = { ...formData, ...ownerData };

    axios.post('http://127.0.0.1:8000/newTrip', formDataWithOwner)
      .then(response => {
        toast.success("Trip created successfully!", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => {
        toast.error("trip error!", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
  };

  const steps = [];
  for (let i = 0; i < inputs.length; i++) {
    steps.push(
      <li className="flex items-center text-green-600 space-x-2.5 rtl:space-x-reverse">
        <span className="flex items-center justify-center w-8 h-8 border border-green-600 rounded-full shrink-0">
          {i + 1}
        </span>
      </li>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const handleClick = () => {
    if (currentIndex === inputs.length - 1)
      handleSubmit();
    else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const [formData, setFormData] = useState({})
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="bg-[#F5F5F5] my-40 flex flex-col items-center justify-center py-8 space-y-8 w-full">
      <ToastContainer />
      <ol className="items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        {steps}
      </ol>
      <h1 className="text-3xl font-semibold pt-8 text-black">{inputs[currentIndex].question}</h1>
      <div className="flex items-center rounded-full justify-center bg-white shadow-lg py-2 pl-2">
        <Image src="/icons/location.svg" height={15} width={15} />
        <input
          type={inputs[currentIndex].name === "date" ? ('date') : ("text")} size="60" placeholder={currentIndex}
          name={inputs[currentIndex].name}
          value={formData[inputs[currentIndex].name] || ''}
          onChange={handleInputChange}
          className="mr-4 ml-2 max-w-full bg-white focus:outline-none text-dark"
        />
      </div>

      <div onClick={handleClick}>
        <Primary text="Submit" />
      </div>
    </div>
  )
}

export default NewTrip;
