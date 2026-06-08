import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({
  column,
  tasks,
  data,
  setData,
  filters,
  fetchTasks,
}) {
  const { setNodeRef, isOver } =
    useDroppable({
      id: column.id,
    });

  const filtered = tasks.filter(
    (t) =>
      (!filters.search ||
        t.title
          .toLowerCase()
          .includes(
            filters.search.toLowerCase()
          )) &&
      (!filters.assignee ||
        t.assignee?.name ===
          filters.assignee) &&
      (!filters.priority ||
        t.priority ===
          filters.priority)
  );

  return (
    <div
      ref={setNodeRef}
      className={`
        bg-white
        dark:bg-gray-800
        rounded-2xl
        p-4
        shadow-lg
        min-h-[70vh]
        border
        border-gray-200
        dark:border-gray-700
        transition-all duration-300
        ${
          isOver
            ? "ring-4 ring-blue-400"
            : ""
        }
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-gray-800 dark:text-white">
          {column.title}
        </h2>

        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {filtered.length}
        </span>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <div className="flex items-center justify-center min-h-[250px]">
          <p className="text-gray-400">
            Drop tasks here
          </p>
        </div>
      )}

      {/* TASKS */}
      <div className="space-y-4">
        {filtered.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            columnId={column.id}
            data={data}
            setData={setData}
            fetchTasks={fetchTasks}
          />
        ))}
      </div>
    </div>
  );
}