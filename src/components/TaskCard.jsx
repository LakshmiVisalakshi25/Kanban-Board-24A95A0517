import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";

export default function TaskCard({ task, columnId, data, setData }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: task.id,
    data: { col: columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleDelete() {
    const updated = data.columns[columnId].filter((t) => t.id !== task.id);
    setData({ ...data, columns: { ...data.columns, [columnId]: updated } });
    setConfirmOpen(false);

    const status = document.getElementById("aria-status");
    if (status) status.innerText = "Task deleted successfully";
  }

  return (
    <div
      ref={setNodeRef}
      tabIndex={0} // keyboard focusable
      style={style}
      className={`bg-white p-3 mb-2 rounded shadow border-l-4 transition ${
        task.priority === "High"
          ? "border-red-500"
          : task.priority === "Medium"
          ? "border-yellow-500"
          : "border-green-500"
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="cursor-grab font-semibold mb-1 select-none hover:bg-gray-100 rounded transition">
        ☰ {task.title}
      </div>

      <p className="text-sm text-gray-700">{task.description}</p>

      <div className="flex gap-3 mt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setEditOpen(true);
          }}
          className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmOpen(true);
          }}
          className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200"
        >
          Delete
        </button>
      </div>

      {editOpen && (
        <TaskModal
          task={task}
          columnId={columnId}
          data={data}
          setData={setData}
          onClose={() => setEditOpen(false)}
        />
      )}

      {confirmOpen && <ConfirmModal onYes={handleDelete} onNo={() => setConfirmOpen(false)} />}
    </div>
  );
}
