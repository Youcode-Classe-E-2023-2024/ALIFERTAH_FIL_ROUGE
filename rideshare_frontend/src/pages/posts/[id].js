import Primary from '@/components/buttons/primary';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export function Post () {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const authToken = document.cookie.split('; ').find(row => row.startsWith('token='));
        const headers = authToken ? { Authorization: `Bearer ${authToken.split('=')[1]}` } : {};

        const response = await axios.get(`http://127.0.0.1:8000/trip/${id}`, { headers });
        setPost(response.data);
       
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // if (!post) {
  //   return <div>Loading...</div>;
  // }
  const authTokenn = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const loggedInUserId = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('userId='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };


const handleBook = async() =>{
  axios.defaults.headers.common['Authorization'] = authTokenn() ? `Bearer ${authTokenn()}` : '';
  try {
    const response = await axios.post(`http://127.0.0.1:8000/book/${id}`, {"userId" : loggedInUserId()});
    
    if (response.status === 200) {
      toast.success('Booking successful!', {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Booking failed. Please try again.');
    }
  } catch (error) {
    console.error('Error booking:', error);
    toast.error('An error occurred while booking. Please try again later.');
  }
}
  return (
    <>
      {post ? (<div class=" w-[50%] container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg space-y-8 flex flex-col items-center">
      <ToastContainer /> 
  <div class="text-2xl font-bold mb-4">{post.date}</div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">Departure</div>
      <div class="mt-2">{post.departure}</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">Arrival</div>
      <div class="mt-2">{post.arrival}</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">Price per passenger</div>
      <div class="mt-2">{post.price}.00$</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">Car</div>
      <div class="mt-2">{post.car}</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">Description</div>
      <div class="mt-2">Julie</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer" onClick={handleBook}>
      <Primary text="BOOK NOW"/>
    </div>
  </div>
</div>

)
       :
       ("Loading ...")
    }
  </>
    
  );
};

export default Post;
