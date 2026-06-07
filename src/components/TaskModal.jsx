import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

export default function TaskModal({
  isNew = true,
  task,
  columnId,
  fetchTasks,
  onClose,
}) {
  // COLUMNS
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];

  // PRIORITIES
  const priorities = [
    "Low",
    "Medium",
    "High",
  ];

  // USERS
  const [users, setUsers] =
    useState([]);

  // FORM STATES
  const [title, setTitle] =
    useState(
      task?.title || ""
    );

  const [
    description,
    setDescription,
  ] = useState(
    task?.description || ""
  );

  const [assignee, setAssignee] =
    useState(
      task?.isTeamTask
        ? "team"
        : task?.assignee
            ?._id || ""
    );

  const [priority, setPriority] =
    useState(
      task?.priority ||
        priorities[0]
    );

  const [dueDate, setDueDate] =
    useState(
      task?.dueDate
        ? new Date(
            task.dueDate
          )
            .toISOString()
            .split("T")[0]
        : ""
    );

  const [column, setColumn] =
    useState(
      task?.status ||
        columnId ||
        columns[0].id
    );

  const [error, setError] =
    useState("");

  // FETCH USERS
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

  // SUBMIT
  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    setError("");

    // VALIDATION
    if (
      !title.trim() ||
      !description.trim() ||
      !priority ||
      !dueDate ||
      !assignee
    ) {
      setError(
        "Please fill all fields."
      );

      return;
    }

    try {
      const taskData = {
        title:
          title.trim(),

        description:
          description.trim(),

        priority,

        dueDate,

        status: column,

        // TEAM TASK
        isTeamTask:
          assignee ===
          "team",

        // USER TASK
        assignee:
          assignee ===
          "team"
            ? null
            : assignee,
      };

      // CREATE
      if (!task) {
        await API.post(
          "/tasks",
          taskData
        );

        toast.success(
          "Task Added Successfully"
        );
      }

      // UPDATE
      else {
        await API.put(
          `/tasks/${task._id}`,
          taskData
        );

        toast.success(
          "Task Updated Successfully"
        );
      }

      fetchTasks();

      onClose();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow-lg w-96"
      >

        <h2 className="text-xl font-bold mb-4">
          {isNew
            ? "Add Task"
            : "Edit Task"}
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 mb-3">
            {error}
          </p>
        )}

        {/* TITLE */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">
            Title
          </label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">
            Description
          </label>

          <textarea
            required
            rows={3}
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
          />
        </div>

        {/* ASSIGNEE */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">
            Assignee
          </label>

          <select
            required
            value={assignee}
            onChange={(e) =>
              setAssignee(
                e.target.value
              )
            }
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
          >
            <option value="">
              Select Assignee
            </option>

            <option value="team">
              Assign to All
            </option>

            {users.map(
              (user) => (
                <option
                  key={
                    user._id
                  }
                  value={
                    user._id
                  }
                >
                  {user.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* PRIORITY */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">
            Priority
          </label>

          <select
            value={
              priority
            }
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
          >
            {priorities.map(
              (p) => (
                <option
                  key={p}
                  value={p}
                >
                  {p}
                </option>
              )
            )}
          </select>
        </div>

        {/* DUE DATE */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">
            Due Date
          </label>

          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
          />
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Column
          </label>

          <select
            value={column}
            onChange={(e) =>
              setColumn(
                e.target.value
              )
            }
            className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
          >
            {columns.map(
              (col) => (
                <option
                  key={
                    col.id
                  }
                  value={
                    col.id
                  }
                >
                  {
                    col.title
                  }
                </option>
              )
            )}
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={
              onClose
            }
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isNew
              ? "Add"
              : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}