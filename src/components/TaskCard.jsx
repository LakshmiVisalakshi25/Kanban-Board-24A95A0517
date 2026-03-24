import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";

export default function TaskCard({ task, columnId, data, setData }) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    data: { columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteTask = () => {
    const updated = { ...data };
    updated.columns[columnId] = updated.columns[columnId].filter(
      (t) => t.id !== task.id
    );
    setData(updated);
    setConfirmOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded shadow mb-2"
    >
      {/* ✅ DRAG AREA ONLY */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab mb-2"
      >
        <h3 className="font-bold">{task.title}</h3>
      </div>

      {/* NON-DRAG AREA */}
      <p className="text-sm">{task.description}</p>
      <p className="text-xs text-gray-500">Assignee: {task.assignee}</p>
      <p className="text-xs text-gray-500">Priority: {task.priority}</p>

      {/* BUTTONS */}
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

      {/* MODALS */}
      {editOpen && (
        <TaskModal
          isNew={false}
          task={task}
          columnId={columnId}
          data={data}
          setData={setData}
          onClose={() => setEditOpen(false)}
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