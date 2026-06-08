import { useEffect, useState } from "react";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ToastContainer } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Board from "../components/Board";
import TaskModal from "../components/TaskModal";
import Dashboard from "../components/Dashboard";

import socket from "../services/socket";
import API from "../services/api";

const initialData = {
  columns: {
    todo: [],
    progress: [],
    review: [],
    done: [],
  },
};

export default function TasksPage() {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ search: "", assignee: "", priority: "" });
  const [showAdd, setShowAdd] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const sensors = useSensors(
    // Desktop mouse support
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    // Mobile touch support
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,     // press and hold 200ms to start drag
        tolerance: 8,   // allow slight finger movement during hold
      },
    }),
    // Keyboard accessibility
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  useEffect(() => {
    socket.on("taskUpdated", () => fetchTasks());
    return () => socket.off("taskUpdated");
  }, []);

  async function fetchUsers() {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTasks() {
    try {
      const res = await API.get("/tasks");
      const tasks = res.data;
      const grouped = { todo: [], progress: [], review: [], done: [] };
      tasks.forEach((task) => {
        grouped[task.status].push(task);
      });
      setData({ columns: grouped });
    } catch (error) {
      console.log(error);
    }
  }

  async function onDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    let sourceColumn = null;
    let destinationColumn = null;

    for (const col in data.columns) {
      if (data.columns[col].some((t) => t._id === activeId)) sourceColumn = col;
    }

    if (data.columns[overId]) destinationColumn = overId;

    for (const col in data.columns) {
      if (data.columns[col].some((t) => t._id === overId)) destinationColumn = col;
    }

    if (!sourceColumn || !destinationColumn) return;

    const fromItems = [...data.columns[sourceColumn]];
    const toItems = [...data.columns[destinationColumn]];
    const index = fromItems.findIndex((i) => i._id === activeId);
    const [moved] = fromItems.splice(index, 1);

    await API.put(`/tasks/${moved._id}`, { ...moved, status: destinationColumn });

    toItems.push({ ...moved, status: destinationColumn });

    setData({
      ...data,
      columns: {
        ...data.columns,
        [sourceColumn]: fromItems,
        [destinationColumn]: toItems,
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

      {/* SIDEBAR — fixed on left, manages itself internally */}
      <Sidebar />

      {/* MAIN CONTENT — pushed right by sidebar width on desktop only */}
      <div className="md:ml-64 flex flex-col min-h-screen">

        {/* NAVBAR — scrolls with page */}
        <Navbar
          filters={filters}
          setFilters={setFilters}
          users={users}
          onAdd={() => setShowAdd(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* PAGE BODY */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">

          {/* DASHBOARD */}
          <Dashboard data={data} />

          {/* BOARD — horizontally scrollable on small screens */}
          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[320px] sm:min-w-[600px] md:min-w-[900px] lg:min-w-[1200px]">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <Board
                  data={data}
                  setData={setData}
                  filters={filters}
                  fetchTasks={fetchTasks}
                />
              </DndContext>
            </div>
          </div>

        </main>
      </div>

      {/* ADD TASK MODAL */}
      {showAdd && (
        <TaskModal
          isNew
          data={data}
          setData={setData}
          fetchTasks={fetchTasks}
          onClose={() => setShowAdd(false)}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}