import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash } from "react-icons/fa";

import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";
import CommentsModal from "./CommentsModal";
import API from "../services/api";
import { toast } from "react-toastify";

export default function TaskCard({ task, fetchTasks }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",       // ← CRITICAL: prevents browser hijacking touch for scroll
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : "auto",
    position: "relative",
  };

  async function deleteTask() {
    try {
      await API.delete(`/tasks/${task._id}`);
      toast.success("Task Deleted");
      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  }

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  return (
    <>
      {/* DRAG WRAPPER — only this part is draggable */}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
          bg-white dark:bg-gray-800 dark:text-white
          p-3 rounded-xl shadow-md hover:shadow-lg
          transition-all duration-300
          cursor-grab active:cursor-grabbing
          break-words w-full
          ${isOverdue ? "border-l-4 border-red-500" : ""}
          ${isDragging ? "shadow-2xl scale-105" : ""}
        `}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="font-bold text-base flex-1 break-words">
            {task.title}
          </h3>

          {currentUser?.role === "admin" && (
            <div className="flex gap-2 flex-shrink-0">
              {/* stopPropagation prevents buttons from triggering drag */}
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setShowEdit(true)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit size={15} />
              </button>

              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setShowDelete(true)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={15} />
              </button>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-3 break-words">
          {task.description || "No description"}
        </p>

        {/* DETAILS */}
        <div className="space-y-2 text-sm">
          <p className="break-words">
            <span className="font-semibold">Assigned To:</span>{" "}
            {task.isTeamTask
              ? "All Users"
              : task.assignee?.name || "Unassigned"}
          </p>

          <p>
            <span className="font-semibold">Priority:</span>{" "}
            <span
              className={`font-semibold ${
                task.priority === "High"
                  ? "text-red-500"
                  : task.priority === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {task.priority}
            </span>
          </p>

          <p className={isOverdue ? "text-red-500 font-bold" : ""}>
            <span className="font-semibold">Due:</span>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No Date"}
          </p>
        </div>

        {/* CHAT BUTTON */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setShowComments(true)}
          className="
            mt-4 w-full bg-gray-200 dark:bg-gray-700
            py-2 rounded-lg hover:bg-gray-300
            dark:hover:bg-gray-600 transition text-sm font-medium
          "
        >
          Open Chat
        </button>
      </div>

      {/* MODALS */}
      {showEdit && (
        <TaskModal
          task={task}
          fetchTasks={fetchTasks}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showDelete && (
        <ConfirmModal
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          onConfirm={deleteTask}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {showComments && (
        <CommentsModal
          task={task}
          fetchTasks={fetchTasks}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
}