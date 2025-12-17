import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ id, task, columnId, setModalTask, setDeleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-50 p-3 rounded mb-2 border-l-4 border-blue-400"
    >
      <div className="mb-2 font-medium">{task.title}</div>
      <div className="flex gap-2">
        <button
          onClick={() => setModalTask({ ...task, column: columnId })}
          className="bg-blue-600 text-white px-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => setDeleteTask({ ...task, column: columnId })}
          className="bg-red-600 text-white px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
