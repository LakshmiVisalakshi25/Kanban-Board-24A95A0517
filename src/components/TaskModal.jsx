import { useState } from "react";

export default function TaskModal({
  isNew = true,
  task,
  columnId,
  data,
  setData,
  onClose,
}) {
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];

  const assignees = ["Lakshmi", "Team"];
  const priorities = ["Low", "Medium", "High"];

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assignee, setAssignee] = useState(task?.assignee || assignees[0]);
  const [priority, setPriority] = useState(task?.priority || priorities[0]);
  const [column, setColumn] = useState(columnId || columns[0].id);
  const [error, setError] = useState("");

  function handleSubmit(e) {
  e.preventDefault();

  if (!title || !description || !assignee || !priority || !column) {
    setError("All fields are required.");
    return;
  }

  const newTask = {
    id: task?.id || Date.now().toString(),
    title,
    description,
    assignee,
    priority,
  };

  const updatedColumns = { ...data.columns };

  if (!task) {
    updatedColumns[column] = [...updatedColumns[column], newTask];
  } else {
    updatedColumns[columnId] = updatedColumns[columnId].map((t) =>
      t.id === task.id ? newTask : t
    );
  }

  setData({
    ...data,
    columns: updatedColumns,
  });

  onClose();
}

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        className="bg-white p-6 rounded shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-4">
          {isNew ? "Add Task" : "Edit Task"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Title */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border px-2 py-1 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Assignee */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Assignee</label>
          <select
            className="w-full border px-2 py-1 rounded"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            {assignees.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Priority</label>
          <select
            className="w-full border px-2 py-1 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Column (ONLY for Add) */}
        {isNew && (
          <div className="mb-3">
            <label className="block mb-1 font-medium">Column</label>
            <select
              className="w-full border px-2 py-1 rounded"
              value={column}
              onChange={(e) => setColumn(e.target.value)}
            >
              {columns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            {isNew ? "Add" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}