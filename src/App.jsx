import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Navbar from "./components/Navbar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import { loadData, saveData } from "./utils/storage";

const initialData = {
  columns: {
    todo: [],
    progress: [],
    review: [],
    done: [],
  },
};

function normalizeData(saved) {
  if (!saved || !saved.columns) return initialData;
  return {
    columns: {
      todo: saved.columns.todo || [],
      progress: saved.columns.progress || [],
      review: saved.columns.review || [],
      done: saved.columns.done || [],
    },
  };
}

export default function App() {
  const [data, setData] = useState(() => normalizeData(loadData()));
  const [filters, setFilters] = useState({ search: "", assignee: "", priority: "" });
  const [showAdd, setShowAdd] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Save all changes to localStorage automatically
  useEffect(() => {
    saveData(data);
  }, [data]);

  function onDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    let sourceColumn = null;
    let destinationColumn = null;

    // find source column
    for (const col in data.columns) {
      if (data.columns[col].some((t) => t.id === activeId)) sourceColumn = col;
    }

    // dropped on empty column
    if (data.columns[overId]) destinationColumn = overId;

    // dropped on a task
    for (const col in data.columns) {
      if (data.columns[col].some((t) => t.id === overId)) destinationColumn = col;
    }

    if (!sourceColumn || !destinationColumn) return;

    if (sourceColumn === destinationColumn) {
      const items = data.columns[sourceColumn];
      const oldIndex = items.findIndex((i) => i.id === activeId);
      const newIndex = items.findIndex((i) => i.id === overId);
      const reordered = [...items];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);

      setData({ ...data, columns: { ...data.columns, [sourceColumn]: reordered } });
    } else {
      const fromItems = [...data.columns[sourceColumn]];
      const toItems = [...data.columns[destinationColumn]];
      const index = fromItems.findIndex((i) => i.id === activeId);
      const [moved] = fromItems.splice(index, 1);
      toItems.push(moved);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceColumn]: fromItems,
          [destinationColumn]: toItems,
        },
      });
    }

    // Update ARIA live region for screen readers
    const status = document.getElementById("aria-status");
    if (status) status.innerText = "Task moved successfully";
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div id="aria-status" aria-live="polite" className="sr-only"></div>

      <Navbar filters={filters} setFilters={setFilters} onAdd={() => setShowAdd(true)} />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <Board data={data} setData={setData} filters={filters} />
      </DndContext>

      {showAdd && (
        <TaskModal
          isNew
          data={data}
          setData={setData}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}
