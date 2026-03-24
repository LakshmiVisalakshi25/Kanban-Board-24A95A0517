import { useState } from "react";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";

export default function Task({ task, data, setData }) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteTask = () => {
    const updatedColumns = {};

    Object.keys(data.columns).forEach((colId) => {
      updatedColumns[colId] = data.columns[colId].filter(
        (t) => t.id !== task.id
      );
    });

    setData({
      ...data,
      columns: updatedColumns,
    });

    setConfirmOpen(false);
  };

  return (
    <div className="bg-white p-3 rounded shadow mb-2">
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
      <p className="text-xs text-gray-500">Assignee: {task.assignee}</p>
      <p className="text-xs text-gray-500">Priority: {task.priority}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setEditOpen(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => setConfirmOpen(true)}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>

      {editOpen && (
        <TaskModal
          task={task}
          data={data}
          setData={setData}
          close={() => setEditOpen(false)}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          onYes={deleteTask}
          onNo={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}