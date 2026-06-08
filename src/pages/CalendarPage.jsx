import { useEffect, useState } from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

export default function CalendarPage() {
  // TASKS
  const [tasks, setTasks] =
    useState([]);

  // DATE
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  // FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await API.get(
        "/tasks"
      );

      console.log(
        "Calendar Tasks:",
        res.data
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // SELECTED DATE
  const selected =
  `${selectedDate.getFullYear()}-${
    String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")
  }-${
    String(
      selectedDate.getDate()
    ).padStart(2, "0")
  }`;

  // FILTER TASKS
  const filteredTasks =
    tasks.filter((task) => {
      // IGNORE TASKS WITHOUT DUE DATE
      if (!task.dueDate) {
        return false;
      }

      // CONVERT TASK DATE
     const taskDueDate =
  new Date(task.dueDate);

const taskDate =
  `${taskDueDate.getFullYear()}-${
    String(
      taskDueDate.getMonth() + 1
    ).padStart(2, "0")
  }-${
    String(
      taskDueDate.getDate()
    ).padStart(2, "0")
  }`;

      // MATCH DATES
      return (
        taskDate === selected
      );
    });

  return (
  <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
    <Sidebar />

    <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Calendar
      </h1>

      {/* CALENDAR */}
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-6 rounded-xl shadow mb-6 overflow-x-auto">
        <div className="w-full flex justify-center">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="max-w-full border-0"
            tileClassName={({ date, view }) => {
              if (view !== "month") return null;

              const formattedDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

              const task = tasks.find((t) => {
                if (!t.dueDate) return false;

                const taskDate = new Date(t.dueDate);

                const formattedTask = `${taskDate.getFullYear()}-${String(
                  taskDate.getMonth() + 1
                ).padStart(2, "0")}-${String(taskDate.getDate()).padStart(
                  2,
                  "0"
                )}`;

                return formattedTask === formattedDate;
              });

              if (!task) return null;

              const today = new Date();
              const dueDate = new Date(task.dueDate);

              if (dueDate < today && task.status !== "done") {
                return "calendar-overdue";
              }

              if (task.status === "done") {
                return "calendar-completed";
              }

              if (task.priority === "High") {
                return "calendar-high";
              }

              return "calendar-task";
            }}
          />
        </div>
      </div>

      {/* TASK LIST */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 break-words">
          Tasks on {selected}
        </h2>

        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks for this date
          </p>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="border dark:border-gray-600 p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg break-words">
                  {task.title}
                </h3>

                <p className="mt-2 break-words">
                  {task.description}
                </p>

                <p className="text-sm text-gray-500 mt-2 break-words">
                  Assignee:{" "}
                  {task.isTeamTask
                    ? "All Users"
                    : task.assignee?.name || "Unassigned"}
                </p>

                <p className="text-sm text-gray-500">
                  Priority: {task.priority}
                </p>

                <p className="text-sm text-gray-500">
                  Status: {task.status}
                </p>

                <p className="text-sm text-gray-500">
                  Due Date:{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  </div>
);
}