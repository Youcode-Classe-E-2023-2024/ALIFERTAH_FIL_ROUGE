import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Typography } from "@material-tailwind/react";


const tableHead = ["Name", "Job", "Employed", "action"];


  
function Dashboard() {
  
  const [users, setUsers] = useState([])
  
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
            console.log(users)
        })
        .catch(error => {
            console.error(error);
        });
  }, []);
      
    return (
        <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            {users.map((user, key) => {
              const isLast = key === users.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
   
              return (
                <tr key={key}>
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
                      {user.email}
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
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Edit
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
  )
}

export default Dashboard