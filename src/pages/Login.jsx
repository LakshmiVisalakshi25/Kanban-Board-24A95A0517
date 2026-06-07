import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      toast.success(
        "Login Successful"
      );

      navigate(
        "/dashboard"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "User credentials are wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={
          handleLogin
        }
        className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* DEMO CREDENTIALS */}
        <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600">
          <p className="text-center font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Demo Credentials
          </p>

          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
            <div>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                Admin Account
              </p>

              <p>
                Email:
                {" "}
                admin@kanban.com
              </p>

              <p>
                Password:
                {" "}
                Admin@123
              </p>
            </div>

            <hr className="dark:border-gray-600" />

            <div>
              <p className="font-semibold text-green-600 dark:text-green-400">
                User Account
              </p>

              <p>
                Email:
                {" "}
                user@kanban.com
              </p>

              <p>
                Password:
                {" "}
                User@123
              </p>
            </div>
          </div>
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={
            password
          }
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={
            loading
          }
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-3 rounded transition duration-300"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* FORGOT PASSWORD */}
        <p className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>

        {/* REGISTER */}
        <p className="text-center mt-6">
          Don't have an
          account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}