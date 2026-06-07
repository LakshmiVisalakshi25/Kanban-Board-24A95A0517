import { useEffect, useState } from "react";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";

import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

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
  const [data, setData] =
    useState(initialData);

  const [filters, setFilters] =
    useState({
      search: "",
      assignee: "",
      priority: "",
    });

  const [showAdd, setShowAdd] =
    useState(false);

  // DARK MODE
  const [darkMode, setDarkMode] =
    useState(() => {
      return (
        localStorage.getItem("theme") ===
        "dark"
      );
    });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [darkMode]);

  const sensors = useSensors(
    useSensor(PointerSensor),

    useSensor(KeyboardSensor, {
      coordinateGetter:
        sortableKeyboardCoordinates,
    })
  );

  // FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  // REALTIME
  useEffect(() => {
    socket.on("taskUpdated", () => {
      fetchTasks();
    });

    return () => {
      socket.off("taskUpdated");
    };
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

  // DRAG
  async function onDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;

    const overId = over.id;

    let sourceColumn = null;

    let destinationColumn = null;

    for (const col in data.columns) {
      if (
        data.columns[col].some(
          (t) => t._id === activeId
        )
      ) {
        sourceColumn = col;
      }
    }

    if (data.columns[overId]) {
      destinationColumn = overId;
    }

    for (const col in data.columns) {
      if (
        data.columns[col].some(
          (t) => t._id === overId
        )
      ) {
        destinationColumn = col;
      }
    }

    if (
      !sourceColumn ||
      !destinationColumn
    )
      return;

    const fromItems = [
      ...data.columns[sourceColumn],
    ];

    const toItems = [
      ...data.columns[destinationColumn],
    ];

    const index = fromItems.findIndex(
      (i) => i._id === activeId
    );

    const [moved] =
      fromItems.splice(index, 1);

    await API.put(
      `/tasks/${moved._id}`,
      {
        ...moved,

        status: destinationColumn,
      }
    );

    toItems.push({
      ...moved,

      status: destinationColumn,
    });

    setData({
      ...data,

      columns: {
        ...data.columns,

        [sourceColumn]: fromItems,

        [destinationColumn]:
          toItems,
      },
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1">
        
        {/* NAVBAR */}
        <Navbar
          filters={filters}
          setFilters={setFilters}
          onAdd={() =>
            setShowAdd(true)
          }
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* DASHBOARD */}
        <Dashboard data={data} />

        {/* BOARD */}
        <DndContext
          sensors={sensors}
          collisionDetection={
            closestCenter
          }
          onDragEnd={onDragEnd}
        >
          <Board
            data={data}
            setData={setData}
            filters={filters}
            fetchTasks={fetchTasks}
          />
        </DndContext>

        {/* MODAL */}
        {showAdd && (
          <TaskModal
            isNew
            data={data}
            setData={setData}
            fetchTasks={fetchTasks}
            onClose={() =>
              setShowAdd(false)
            }
          />
        )}

        {/* TOAST */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme={
            darkMode
              ? "dark"
              : "light"
          }
        />
      </div>
    </div>
  );
}