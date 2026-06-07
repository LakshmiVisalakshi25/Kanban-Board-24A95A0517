import { useState } from "react";

import API from "../services/api";

import {
  toast,
} from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    otpSent,
    setOtpSent,
  ] = useState(false);

  async function sendOtp() {
    try {
      await API.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(
        "OTP sent to email"
      );

      setOtpSent(true);
    } catch (error) {
      toast.error(
        error.response
          ?.data
          ?.message
      );
    }
  }

  async function resetPassword() {
    try {
      await API.post(
        "/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      toast.success(
        "Password reset successful"
      );
    } catch (error) {
      toast.error(
        error.response
          ?.data
          ?.message
      );
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {!otpSent ? (
          <button
            onClick={
              sendOtp
            }
            className="bg-blue-500 text-white w-full p-2 rounded"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="OTP"
              className="border p-2 w-full mb-4"
              value={otp}
              onChange={(
                e
              ) =>
                setOtp(
                  e.target
                    .value
                )
              }
            />

            <input
              type="password"
              placeholder="New Password"
              className="border p-2 w-full mb-4"
              value={
                newPassword
              }
              onChange={(
                e
              ) =>
                setNewPassword(
                  e.target
                    .value
                )
              }
            />

            <button
              onClick={
                resetPassword
              }
              className="bg-green-500 text-white w-full p-2 rounded"
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}