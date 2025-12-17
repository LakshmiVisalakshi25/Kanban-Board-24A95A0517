import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, data, setData, filters }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const filtered = tasks.filter(
    (t) =>
      (!filters.search || t.title.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.assignee || t.assignee === filters.assignee) &&
      (!filters.priority || t.priority === filters.priority)
  );

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-50 rounded p-3 min-h-[200px] transition-all duration-200 ${
        isOver ? "ring-4 ring-blue-400 bg-blue-50" : ""
      }`}
    >
      <h2 className="font-bold mb-2">
        {column.title} ({filtered.length})
      </h2>

      {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-6">Drop tasks here</p>}

      {filtered.map((task) => (
        <TaskCard key={task.id} task={task} columnId={column.id} data={data} setData={setData} />
      ))}
    </div>
  );
}
