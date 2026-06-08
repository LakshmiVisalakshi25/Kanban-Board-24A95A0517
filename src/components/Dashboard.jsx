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

export default function Dashboard({ data }) {
  const todo = data?.columns?.todo?.length || 0;
  const progress =
    data?.columns?.progress?.length || 0;
  const review =
    data?.columns?.review?.length || 0;
  const done =
    data?.columns?.done?.length || 0;

  const pieData = [
    { name: "To Do", value: todo },
    { name: "Progress", value: progress },
    { name: "Review", value: review },
    { name: "Done", value: done },
  ];

  const barData = [
    {
      name: "Tasks",
      todo,
      progress,
      review,
      done,
    },
  ];

  const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#10b981",
  ];

  return (
    <div className="space-y-6 w-full">

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-gray-500 dark:text-gray-400">
            To Do
          </h3>
          <p className="text-3xl font-bold text-blue-500">
            {todo}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-gray-500 dark:text-gray-400">
            In Progress
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {progress}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-gray-500 dark:text-gray-400">
            Review
          </h3>
          <p className="text-3xl font-bold text-purple-500">
            {review}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-gray-500 dark:text-gray-400">
            Completed
          </h3>
          <p className="text-3xl font-bold text-green-500">
            {done}
          </p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* PIE CHART */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow min-w-0">

          <h2 className="text-xl font-semibold mb-4">
            Task Distribution
          </h2>

          <div
            style={{
              width: "100%",
              height: "320px",
              minWidth: 0,
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* BAR CHART */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow min-w-0">

          <h2 className="text-xl font-semibold mb-4">
            Task Status Overview
          </h2>

          <div
            style={{
              width: "100%",
              height: "320px",
              minWidth: 0,
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={barData}
              >
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

    </div>
  );
}