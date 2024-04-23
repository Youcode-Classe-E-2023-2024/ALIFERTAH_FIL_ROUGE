import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography } from "@material-tailwind/react";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Sidebar from '@/components/layout/sideBar';

const tableHead = ["Username", "Email", "Role", "action"];

const Modal = ({ userId, setShowModal }) => {
  
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState(userId);
  const formData = {
    role,
    id,
    email,
    username,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/updateUser`, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("success")
        toast.success('User updated', {
          position: 'top-right',
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Something wrong: ' + response.statusText, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "role":
        setRole(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "id":
        setId(value);
      case "username":
        setUsername(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <ToastContainer /> 
        
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                User ID: {userId}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
              <input onChange={handleInputChange} type="text" name="id" value={id} hidden />
              <input onChange={handleInputChange} type="text" name="username" value={username} placeholder="Enter new username" className="p-3 border border-gray-300 rounded" />
              <input onChange={handleInputChange} type="text" name="email" value={email} placeholder="Enter new email" className="p-3 border border-gray-300 rounded" />
              <select name="role" onChange={handleInputChange} className="p-3 border border-gray-300 rounded">
                <option value={role} disabled selected>-role-</option>
                <option value="admin">admin</option>
              </select>
              <button type='submit' className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg transition-all duration-150">
                Submit
              </button>
            </form>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={() => updateUser()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

function Admin() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const authToken = () => {
      const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
      return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    axios.defaults.headers.common['Authorization'] = authToken() ? `Bearer ${authToken()}` : '';
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/allUsers')
      .then((response) => {
        setUsers(response.data.users);
        console.log(users);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleModalOpen = (userId) => {
    setShowModal(true);
    setSelectedUserId(userId);
  };

  const handleDelete = async (deletedUserId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/deleteUser/${deletedUserId}` ,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("success")
        toast.success('User updated', {
          position: 'top-right',
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Something wrong: ' + response.statusText, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Card className="flex flex-row items-start h-full w-full overflow-scroll ">
      <Sidebar items={[{name:"dashboard", link:"dashboard"}
      , {name:"dashboard", link:"dashboard"}]}/>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const isLast = index === users.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.username}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.role}
                  </Typography>
                </td>
                <td className={`flex w-full justify-center space-x-2 ${classes}`}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium bg-green-500 text-center px-4 py-2 rounded-lg text-white"
                    onClick={() => handleModalOpen(user.id)}
                  >
                    Edit
                  </Typography>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium bg-red-500 text-center px-4 py-2 rounded-lg text-white"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <Modal userId={selectedUserId} setShowModal={setShowModal} />
      )}
    </Card>
  );
}

export default Admin;
