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
const handleBook = async() =>{
  axios.defaults.headers.common['Authorization'] = authTokenn() ? `Bearer ${authTokenn()}` : '';
  try {
    const response = await axios.post(`http://127.0.0.1:8000/book/${id}`);
    
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
  <div class="text-2xl font-bold mb-4">12:06</div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">4:00</div>
      <div class="mt-2">7, place Guy Leveque</div>
      <div>00274 Paris</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">16:06</div>
      <div class="mt-2">37, place Corinne Etienne</div>
      <div>49378 Lille</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">Prix total pour un passager</div>
      <div class="mt-2">94.95€</div>
    </div>
  </div>
  <div class="w-full">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="text-xl font-bold">Empreinte carbone du trajet</div>
      <div class="mt-2">0.12</div>
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
