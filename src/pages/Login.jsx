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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      
      <form
        onSubmit={
          handleLogin
        }
        className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-xl shadow-lg w-96"
      >
        
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>
        <p className="text-center mt-4">
  <Link
    to="/forgot-password"
    className="text-blue-500"
  >
    Forgot Password?
  </Link>
</p>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border dark:border-gray-600 dark:bg-gray-700 p-3 rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border dark:border-gray-600 dark:bg-gray-700 p-3 rounded mb-6"
          value={
            password
          }
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={
            loading
          }
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-3 rounded"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="text-center mt-4">
          Don't have an
          account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}