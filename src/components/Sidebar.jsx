import {
  FaTachometerAlt,
  FaTasks,
  FaChartPie,
  FaCalendarAlt,
  FaUsers,
  FaUser,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export default function Sidebar() {
  const navigate = useNavigate();

  // DRAWER
  const [isOpen, setIsOpen] = useState(false);

  // USER
  const user = JSON.parse(localStorage.getItem("user"));

  // DARK MODE
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // LOGOUT
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/", { replace: true });
  }

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">Kanban SaaS</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* OVERLAY — closes drawer when tapping outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static
          top-0 left-0 z-50
          w-64 min-h-screen
          bg-gray-900 text-white p-5
          flex flex-col justify-between
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* TOP */}
        <div>

          {/* LOGO */}
          <h1 className="text-2xl font-bold mb-10">Kanban SaaS</h1>

          {/* MENU */}
          <div className="space-y-5">

            {/* DASHBOARD */}
            <Link
              to="/dashboard"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaTachometerAlt />
              Dashboard
            </Link>

            {/* TASKS */}
            <Link
              to="/tasks"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaTasks />
              Tasks
            </Link>

            {/* ANALYTICS - ADMIN ONLY */}
            {user?.role === "admin" && (
              <Link
                to="/analytics"
                className="flex items-center gap-3 hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaChartPie />
                Analytics
              </Link>
            )}

            {/* CALENDAR */}
            <Link
              to="/calendar"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaCalendarAlt />
              Calendar
            </Link>

            {/* TEAM - ADMIN ONLY */}
            {user?.role === "admin" && (
              <Link
                to="/team"
                className="flex items-center gap-3 hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaUsers />
                Team
              </Link>
            )}

            {/* PROFILE */}
            <Link
              to="/profile"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaUser />
              Profile
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="space-y-5">

          {/* THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 hover:text-yellow-400 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-3 hover:text-red-400 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}