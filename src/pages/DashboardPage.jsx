import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import Dashboard from "../components/Dashboard";

import API from "../services/api";

import { toast } from "react-toastify";

export default function DashboardPage() {
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
      const res = await API.get(
        "/tasks"
      );

      const tasks =
        res.data;

      // GROUP TASKS BY STATUS
      const groupedTasks = {
        todo: tasks.filter(
          (task) =>
            task.status ===
            "todo"
        ),

        progress:
          tasks.filter(
            (task) =>
              task.status ===
              "progress"
          ),

        review:
          tasks.filter(
            (task) =>
              task.status ===
              "review"
          ),

        done: tasks.filter(
          (task) =>
            task.status ===
            "done"
        ),
      };

      setData({
        columns:
          groupedTasks,
      });

      // SHOW REMINDERS
      showDeadlineReminders(
        tasks
      );
    } catch (error) {
      console.log(error);
    }
  }

  function showDeadlineReminders(
    tasks
  ) {
    const today =
      new Date();

    tasks.forEach(
      (task) => {
        if (
          !task.dueDate
        )
          return;

        // IGNORE COMPLETED TASKS
        if (
          task.status ===
          "done"
        )
          return;

        const dueDate =
          new Date(
            task.dueDate
          );

        // REMOVE TIME PART
        const diffTime =
          dueDate.setHours(
            0,
            0,
            0,
            0
          ) -
          today.setHours(
            0,
            0,
            0,
            0
          );

        const daysLeft =
          Math.ceil(
            diffTime /
              (1000 *
                60 *
                60 *
                24)
          );

        // SHOW ONLY IF WITHIN 5 DAYS
        if (
          daysLeft >
            0 &&
          daysLeft <=
            5
        ) {
          const reminderKey = `reminder-${task._id}`;

          // AVOID DUPLICATES
          if (
            !sessionStorage.getItem(
              reminderKey
            )
          ) {
            toast.warning(
              `⏰ "${task.title}" deadline is in ${daysLeft} day${
                daysLeft >
                1
                  ? "s"
                  : ""
              }.`,
              {
                autoClose: 5000,
              }
            );

            sessionStorage.setItem(
              reminderKey,
              "shown"
            );
          }
        }
      }
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {/* DASHBOARD */}
        <Dashboard
          data={data}
        />
      </div>
    </div>
  );
}