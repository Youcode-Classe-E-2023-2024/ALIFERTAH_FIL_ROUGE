import Primary from '@/components/buttons/primary';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';

export function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const authToken = document.cookie.split('; ').find(row => row.startsWith('token='));
        const headers = authToken ? { Authorization: `Bearer ${authToken.split('=')[1]}` } : {};

        const response = await axios.get(`http://127.0.0.1:8000/user/${id}`, { headers });
        setUser(response.data);
        console.log(response.data)

      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const authTokenn = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const handleBook = async (postOwner) => {
    axios.defaults.headers.common['Authorization'] = authTokenn() ? `Bearer ${authTokenn()}` : '';
    try {
      const response = await axios.post(`http://127.0.0.1:8000/book/${id}`, { "userId": postOwner });

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
      {user ? (
        <>
<div className="bg-white shadow-md rounded-lg border flex flex-col items-center">
  <div className="px-6 py-5">
    <h1 className="text-xl font-semibold text-gray-800 mb-2 font-bold">{user.username}</h1>
    <p className="text-sm text-gray-600 mb-4">This is some information about the user.</p>
  </div>
  <div className="border-t border-gray-200 px-6 py-4">
    <dl className="divide-y divide-gray-200">
      <div className="py-3">
        <dt className="text-sm font-medium text-gray-500">Full name</dt>
        <dd className="mt-1 text-sm text-gray-900">{user.username}</dd>
      </div>
      <div className="py-3">
        <dt className="text-sm font-medium text-gray-500">Email address</dt>
        <a href={`mailto:${user.email}`} className="mt-1 text-sm text-gray-900">{user.email}</a>
      </div>
      <div className="py-3">
        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
        <a href={`https://api.whatsapp.com/send?phone=${user.phone}`}
        className="mt-1 text-sm text-blue-500 " target='_blank'>{user.phone}</a>
      </div >
      <div className="py-3">
        <dt className="text-sm font-medium text-gray-500">Address</dt>
        <dd className="mt-1 text-sm text-gray-900">123 Main St, Anytown, USA 12345</dd>
      </div>
    </dl>
  </div>
</div>

        </>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Post;
