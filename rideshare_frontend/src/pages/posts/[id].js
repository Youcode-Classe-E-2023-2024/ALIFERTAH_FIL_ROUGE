import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
        console.log(response.data);
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

  return (
    <>
      {post ? (<div>
        <div class="flex flex-col items-center">
  <div class="text-2xl font-bold mb-4">12:06</div>
  <div class="flex space-x-4 mb-4">
    <div class="flex flex-col items-center">
      <div class="text-xl font-bold">4:00</div>
      <div>7, place Guy Leveque</div>
      <div>00274 Paris</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="text-xl font-bold">16:06</div>
      <div>37, place Corinne Etienne</div>
      <div>49378 Lille</div>
    </div>
  </div>
  <div class="flex space-x-4 mb-4">
    <div class="flex flex-col items-center">
      <div class="text-xl font-bold">Prix total pour un passager</div>
      <div>94.95€</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="text-xl font-bold">Empreinte carbone du trajet</div>
      <div>0.12</div>
    </div>
  </div>
  <div class="flex space-x-4 mb-4">
    <div class="flex flex-col items-center">
      <div class="text-xl font-bold">Description</div>
      <div>Julie</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="text-xl font-bold">Contacter Julie</div>
      <div>Réserver</div>
    </div>
  </div>
</div>
</div>)
       :
       ("Loading ...")
    }
  </>
    
  );
};

export default Post;
