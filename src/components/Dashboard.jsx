import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Dashboard({
  data,
}) {
  // TOTALS
  const todo =
    data.columns.todo.length;

  const progress =
    data.columns.progress.length;

  const review =
    data.columns.review.length;

  const done =
    data.columns.done.length;

  // PIE DATA
  const pieData = [
    {
      name: "To Do",
      value: todo,
    },

    {
      name: "Progress",
      value: progress,
    },

    {
      name: "Review",
      value: review,
    },

    {
      name: "Done",
      value: done,
    },
  ];

  // BAR DATA
  const barData = [
    {
      name: "Tasks",

      todo,

      progress,

      review,

      done,
    },
  ];

  // COLORS
  const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#10b981",
  ];

  return (
    <div className="p-6">
      
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* TODO */}
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow">
          
          <h2 className="text-lg font-semibold">
            To Do
          </h2>

          <p className="text-3xl font-bold mt-2">
            {todo}
          </p>
        </div>

        {/* PROGRESS */}
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow">
          
          <h2 className="text-lg font-semibold">
            In Progress
          </h2>

          <p className="text-3xl font-bold mt-2">
            {progress}
          </p>
        </div>

        {/* REVIEW */}
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow">
          
          <h2 className="text-lg font-semibold">
            Review
          </h2>

          <p className="text-3xl font-bold mt-2">
            {review}
          </p>
        </div>

        {/* DONE */}
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow">
          
          <h2 className="text-lg font-semibold">
            Done
          </h2>

          <p className="text-3xl font-bold mt-2">
            {done}
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PIE CHART */}
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow">
          
          <h2 className="text-xl font-bold mb-4">
            Task Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow">
          
          <h2 className="text-xl font-bold mb-4">
            Task Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={barData}>
              
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="todo"
                fill="#3b82f6"
              />

              <Bar
                dataKey="progress"
                fill="#f59e0b"
              />

              <Bar
                dataKey="review"
                fill="#8b5cf6"
              />

              <Bar
                dataKey="done"
                fill="#10b981"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}