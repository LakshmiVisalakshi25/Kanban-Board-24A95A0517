import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import Dashboard from "../components/Dashboard";

import API from "../services/api";

export default function AnalyticsPage() {
  const [data, setData] = useState({
    columns: {
      todo: [],
      progress: [],
      review: [],
      done: [],
    },
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await API.get("/tasks");

      const tasks = res.data;

      const grouped = {
        todo: [],
        progress: [],
        review: [],
        done: [],
      };

      tasks.forEach((task) => {
        grouped[task.status].push(task);
      });

      setData({
        columns: grouped,
      });
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
          Analytics
        </h1>

        {/* ANALYTICS */}
        <Dashboard data={data} />
      </div>
    </div>
  );
}