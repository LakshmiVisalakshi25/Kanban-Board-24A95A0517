export default function Navbar({
  filters,
  setFilters,
  onAdd,
  users = [],
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow p-4 rounded-xl">

      <div className="flex flex-col gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
          className="
            w-full
            border
            dark:border-gray-600
            dark:bg-gray-700
            dark:text-white
            p-3
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* ASSIGNEE */}
          <select
            value={filters.assignee}
            onChange={(e) =>
              setFilters({
                ...filters,
                assignee: e.target.value,
              })
            }
            className="
              w-full
              border
              dark:border-gray-600
              dark:bg-gray-700
              dark:text-white
              p-3
              rounded-lg
            "
          >
            <option value="">
              All Assignees
            </option>

            {users.map((u) => (
              <option
                key={u._id}
                value={u.name}
              >
                {u.name}
              </option>
            ))}
          </select>

          {/* PRIORITY */}
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({
                ...filters,
                priority: e.target.value,
              })
            }
            className="
              w-full
              border
              dark:border-gray-600
              dark:bg-gray-700
              dark:text-white
              p-3
              rounded-lg
            "
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

        </div>

        {/* DESKTOP ONLY */}
        <div className="hidden md:flex justify-between items-center">

          <div className="text-sm font-medium">
            Welcome,{" "}
            <span className="font-bold">
              {user?.name}
            </span>
          </div>

          {user?.role === "admin" && (
            <button
              onClick={onAdd}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2.5
                rounded-lg
                transition
              "
            >
              + Add Task
            </button>
          )}
        </div>

        {/* MOBILE ONLY */}
        {user?.role === "admin" && (
          <button
            onClick={onAdd}
            className="
              md:hidden
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-lg
              transition
            "
          >
            + Add Task
          </button>
        )}

      </div>

    </div>
  );
}