export default function Navbar({
  filters,
  setFilters,
  onAdd,
}) {
  // USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 flex flex-wrap gap-4 shadow items-center">
      
      {/* SEARCH */}
      <input
        className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 flex-1 rounded"
        placeholder="Search tasks"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
      />

      {/* ASSIGNEE */}
      <select
        className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
        onChange={(e) =>
          setFilters({
            ...filters,
            assignee: e.target.value,
          })
        }
      >
        <option value="">
          All Assignees
        </option>

        <option value="Lakshmi Visalakshi">
          Lakshmi Visalakshi
        </option>

        <option value="Admin">
          Admin
        </option>
      </select>

      {/* PRIORITY */}
      <select
        className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
        onChange={(e) =>
          setFilters({
            ...filters,
            priority: e.target.value,
          })
        }
      >
        <option value="">
          All Priority
        </option>

        <option value="Low">
          Low
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="High">
          High
        </option>
      </select>

      {/* USER */}
      <div className="font-semibold">
        Welcome, {user?.name} (
        {user?.role || "member"})
      </div>

      {/* ADD TASK - ADMIN ONLY */}
      {user?.role === "admin" && (
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add Task
        </button>
      )}
    </div>
  );
}