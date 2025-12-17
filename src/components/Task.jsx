import { useState } from "react";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";

export default function Task({ task, tasks, setTasks }) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteTask = () => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
    setConfirmOpen(false);
  };

  return (
    <>
      <div className={`bg-white rounded p-2 shadow border-l-4 ${
        task.priority === "High" ? "border-red-500" :
        task.priority === "Medium" ? "border-yellow-500" : "border-green-500"
      }`}>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm">{task.description}</p>
        <p className="text-xs text-gray-500">{task.assignee}</p>
        <div className="flex gap-2 mt-1">
          <button 
            onClick={() => setEditOpen(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
          >Edit</button>
          <button 
            onClick={() => setConfirmOpen(true)}
            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
          >Delete</button>
        </div>
      </div>

      {editOpen && <TaskModal task={task} tasks={tasks} setTasks={setTasks} close={() => setEditOpen(false)} />}
      {confirmOpen && <ConfirmModal confirm={deleteTask} cancel={() => setConfirmOpen(false)} />}
    </>
  );
}
