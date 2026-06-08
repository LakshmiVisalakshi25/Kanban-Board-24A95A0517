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
        if (grouped[task.status]) {
          grouped[task.status].push(task);
        }
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

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 overflow-x-hidden pt-20 md:pt-0">

        <div className="p-3 sm:p-4 md:p-6 lg:p-8">

          {/* PAGE HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Analytics
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Track task distribution, workflow progress, and productivity insights.
            </p>
          </div>

          {/* DASHBOARD */}
          <div className="w-full">
            <Dashboard data={data} />
          </div>

        </div>

      </main>
    </div>
  );
}