import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registered! Please login.");
      navigate("/login");
    } catch (error) {
      // ✅ Shows exact backend message
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full border dark:border-gray-600 dark:bg-gray-700 p-3 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border dark:border-gray-600 dark:bg-gray-700 p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border dark:border-gray-600 dark:bg-gray-700 p-3 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white p-3 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}