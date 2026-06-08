import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function TeamPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Sidebar />

      <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Team Management
        </h1>

        {/* MOBILE VIEW */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
            >
              <h3 className="font-bold text-lg">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500 break-all mt-2">
                {user.email}
              </p>

              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    user.role === "admin"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                >
                  {user.role || "member"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="p-4">{user.name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${
                        user.role === "admin"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {user.role || "member"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}