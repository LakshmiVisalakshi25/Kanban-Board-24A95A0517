import { Link } from "react-router-dom";

import {
  FaTasks,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaComments,
  FaMoon,
} from "react-icons/fa";

export default function HomePage() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-blue-600">
            Kanban SaaS
          </h1>

          <div className="space-x-4">

            {token ? (
              <Link
                to="/dashboard"
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Get Started
                </Link>
              </>
            )}

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Organize Your Work.
          <br />
          Empower Your Team.
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          A collaborative Kanban platform designed to help teams
          manage projects efficiently with task assignment,
          real-time updates, analytics, and calendar tracking.
        </p>

        <div className="flex justify-center gap-6">

          {token ? (
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
              >
                Start for Free
              </Link>

              <Link
                to="/login"
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
              >
                Login
              </Link>
            </>
          )}

        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-gray-800 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Everything You Need
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Task Management */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaTasks className="text-4xl text-blue-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Task Management
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Create, edit, prioritize, and track tasks using
                an intuitive drag-and-drop Kanban board.
              </p>
            </div>

            {/* Team Collaboration */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaUsers className="text-4xl text-green-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Team Collaboration
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Assign tasks to individual users or teams and
                work together seamlessly.
              </p>
            </div>

            {/* Team Chat */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaComments className="text-4xl text-purple-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Team Chat
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Discuss tasks using built-in chat to improve
                communication and productivity.
              </p>
            </div>

            {/* Analytics */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaChartBar className="text-4xl text-yellow-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Analytics Dashboard
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Gain insights with visual reports and progress
                tracking charts.
              </p>
            </div>

            {/* Calendar */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaCalendarAlt className="text-4xl text-red-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Calendar Integration
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Track deadlines and upcoming tasks using a
                dedicated calendar view.
              </p>
            </div>

            {/* Dark Mode */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaMoon className="text-4xl text-indigo-500 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Dark Mode
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Switch between light and dark themes for a
                comfortable user experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-6 text-center">

        <p className="text-gray-600 dark:text-gray-300">
          © 2026 Kanban SaaS • Built with React, Node.js,
          Express, MongoDB & Socket.IO
        </p>

      </footer>

    </div>
  );
}