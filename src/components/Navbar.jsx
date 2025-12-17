export default function Navbar({ filters, setFilters, onAdd }) {
  return (
    <div className="bg-white p-4 flex flex-wrap gap-4 shadow items-center">
      <input
        className="border p-2 flex-1"
        placeholder="Search tasks"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select
        className="border p-2"
        onChange={(e) =>
          setFilters({ ...filters, assignee: e.target.value })
        }
      >
        <option value="">All Assignees</option>
        <option value="Lakshmi">Lakshmi</option>
        <option value="Team">Team</option>
      </select>

      <select
        className="border p-2"
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Task
      </button>
    </div>
  );
}
