import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

export default function TeamPage() {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await API.get(
        "/auth/users"
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">
        
        <h1 className="text-3xl font-bold mb-6">
          Team Management
        </h1>

        {/* USERS TABLE */}
        <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
          
          <table className="w-full">
            
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${
                        user.role ===
                        "admin"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {user.role ||
                        "member"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}