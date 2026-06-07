import { useState } from "react";

import {
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import TaskModal from "./TaskModal";

import ConfirmModal from "./ConfirmModal";

import CommentsModal from "./CommentsModal";

import API from "../services/api";

import { toast } from "react-toastify";

export default function TaskCard({
  task,
  fetchTasks,
}) {
  // CURRENT USER
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  // MODALS
  const [showEdit, setShowEdit] =
    useState(false);

  const [showDelete, setShowDelete] =
    useState(false);

  const [showComments, setShowComments] =
    useState(false);

  // DRAG
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task._id,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform
      ),

    transition,
  };

  // DELETE
  async function deleteTask() {
    try {
      await API.delete(
        `/tasks/${task._id}`
      );

      toast.success(
        "Task Deleted"
      );

      fetchTasks();
    } catch (error) {
      console.log(error);

      toast.error(
        "Delete failed"
      );
    }
  }

  // OVERDUE
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) <
      new Date() &&
    task.status !== "done";

  return (
    <>
      {/* CARD */}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow cursor-grab transition-all duration-300 hover:shadow-lg ${
          isOverdue
            ? "border-l-4 border-red-500"
            : ""
        }`}
      >
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-2">
          
          <h3 className="font-bold text-lg">
            {task.title}
          </h3>

          {/* ADMIN ONLY */}
          {currentUser?.role ===
            "admin" && (
            <div className="flex gap-2">
              
              {/* EDIT */}
              <button
                onClick={() =>
                  setShowEdit(true)
                }
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>

              {/* DELETE */}
              <button
                onClick={() =>
                  setShowDelete(
                    true
                  )
                }
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm mb-3">
          {task.description}
        </p>

        {/* ASSIGNEE */}
        <p className="text-sm mb-1">
          <span className="font-semibold">
            Assigned To:
          </span>{" "}
          {task.isTeamTask
            ? "All Users"
            : task.assignee?.name}
        </p>

        {/* PRIORITY */}
        <p className="text-sm mb-1">
          <span className="font-semibold">
            Priority:
          </span>{" "}
          {task.priority}
        </p>

        {/* DUE DATE */}
        <p
          className={`text-sm ${
            isOverdue
              ? "text-red-500 font-bold"
              : ""
          }`}
        >
          <span className="font-semibold">
            Due:
          </span>{" "}
          {task.dueDate ||
            "No Date"}
        </p>

        {/* COMMENTS BUTTON */}
        <button
          onClick={() =>
            setShowComments(true)
          }
          className="mt-3 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Open Chat
        </button>
      </div>

      {/* EDIT */}
      {showEdit && (
        <TaskModal
          task={task}
          fetchTasks={fetchTasks}
          onClose={() =>
            setShowEdit(false)
          }
        />
      )}

      {/* DELETE */}
      {showDelete && (
        <ConfirmModal
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          onConfirm={deleteTask}
          onCancel={() =>
            setShowDelete(false)
          }
        />
      )}

      {/* COMMENTS */}
      {showComments && (
        <CommentsModal
          task={task}
          fetchTasks={fetchTasks}
          onClose={() =>
            setShowComments(false)
          }
        />
      )}
    </>
  );
}