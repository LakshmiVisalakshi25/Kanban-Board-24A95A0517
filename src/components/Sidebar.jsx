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

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Set --vh CSS variable to fix mobile browser address bar issue
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/", { replace: true });
  }

  const isActive = (path) => location.pathname === path;

  const menuStyle = (path) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive(path)
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
    }`;

  const navLinks = [
    { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/tasks",     icon: <FaTasks />,         label: "Tasks" },
    ...(user?.role === "admin"
      ? [{ to: "/analytics", icon: <FaChartPie />, label: "Analytics" }]
      : []),
    { to: "/calendar",  icon: <FaCalendarAlt />,   label: "Calendar" },
    ...(user?.role === "admin"
      ? [{ to: "/team", icon: <FaUsers />, label: "Team" }]
      : []),
    { to: "/profile",   icon: <FaUser />,          label: "Profile" },
  ];

  const SidebarContent = ({ onClose }) => (
    <div
      style={{
        // Use --vh variable which equals actual visible height on mobile
        // Falls back to 100vh on desktop where it works fine
        height: "calc(var(--vh, 1vh) * 100)",
        backgroundColor: "#111827",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // prevent the container itself from scrolling
      }}
      className="text-white w-64"
    >
      {/* TOP: Logo + Close — fixed height, never shrinks */}
      <div
        style={{ flexShrink: 0 }}
        className="flex items-center justify-between px-5 py-5"
      >
        <h1 className="text-xl font-bold tracking-tight">Kanban SaaS</h1>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg hover:bg-gray-800 transition text-lg text-gray-300"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* MIDDLE: Nav links — takes all remaining space, scrolls if needed */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          // Hide scrollbar visually but keep functionality
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="px-5 space-y-1 pb-2"
      >
        {navLinks.map(({ to, icon, label }) => (
          <Link key={to} to={to} className={menuStyle(to)}>
            <span className="text-base flex-shrink-0">{icon}</span>
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>

      {/* BOTTOM: Dark mode + Logout — fixed height, always visible */}
      <div
        style={{
          flexShrink: 0,        // NEVER shrink — always stays at bottom
          backgroundColor: "#111827",
          borderTop: "1px solid #374151",
          padding: "12px 20px",
        }}
        className="space-y-1"
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-all duration-200 text-sm font-medium"
        >
          <span className="text-base flex-shrink-0">
            {darkMode ? <FaSun /> : <FaMoon />}
          </span>
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-all duration-200 text-sm font-medium"
        >
          <span className="text-base flex-shrink-0">
            <FaSignOutAlt />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── MOBILE TOP BAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white flex items-center justify-between px-4 z-50 shadow-lg">
        <h1 className="text-lg font-bold tracking-tight">Kanban SaaS</h1>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg hover:bg-gray-800 transition text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* ── BACKDROP (mobile only) ── */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 60,
          width: "256px",
          // Use --vh here too so drawer matches actual screen height
          height: "calc(var(--vh, 1vh) * 100)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <SidebarContent onClose={() => setIsOpen(false)} />
      </div>

      {/* ── DESKTOP SIDEBAR ── */}
      <div
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 30,
          width: "256px",
          height: "100vh",
          backgroundColor: "#111827",
        }}
      >
        <SidebarContent />
      </div>

      {/* ── DESKTOP SPACER ── */}
      <div className="hidden md:block flex-shrink-0" style={{ width: "256px" }} />

      {/* ── MOBILE SPACER ── */}
      <div className="md:hidden" style={{ height: "56px" }} />
    </>
  );
}