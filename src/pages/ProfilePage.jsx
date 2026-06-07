import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

import { toast } from "react-toastify";

export default function ProfilePage() {
  const [profile, setProfile] =
    useState({
      name: "",
      bio: "",
      college: "",
      github: "",
      linkedin: "",
      skills: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await API.get(
        "/auth/profile"
      );

      setProfile({
        ...res.data,

        skills:
          res.data.skills?.join(", ") ||
          "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();

    try {
      await API.put(
        "/auth/profile",
        {
          ...profile,

          skills:
            profile.skills
              .split(",")
              .map((skill) =>
                skill.trim()
              ),
        }
      );

      toast.success(
        "Profile Updated"
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">
        
        <h1 className="text-3xl font-bold mb-6">
          Profile Settings
        </h1>

        <form
          onSubmit={updateProfile}
          className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-2xl"
        >
          
          {/* NAME */}
          <div className="mb-4">
            <label className="block mb-1">
              Name
            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name:
                    e.target.value,
                })
              }
              className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
            />
          </div>

          {/* BIO */}
          <div className="mb-4">
            <label className="block mb-1">
              Bio
            </label>

            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio:
                    e.target.value,
                })
              }
              className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
            />
          </div>

          {/* COLLEGE */}
          <div className="mb-4">
            <label className="block mb-1">
              College
            </label>

            <input
              type="text"
              value={profile.college}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  college:
                    e.target.value,
                })
              }
              className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
            />
          </div>

          {/* GITHUB */}
          <div className="mb-4">
            <label className="block mb-1">
              GitHub
            </label>

            <input
              type="text"
              value={profile.github}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  github:
                    e.target.value,
                })
              }
              className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
            />
          </div>

          {/* LINKEDIN */}
          <div className="mb-4">
            <label className="block mb-1">
              LinkedIn
            </label>

            <input
              type="text"
              value={profile.linkedin}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  linkedin:
                    e.target.value,
                })
              }
              className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
            />
          </div>

          {/* SKILLS */}
          <div className="mb-4">
            <label className="block mb-1">
              Skills
            </label>

            <input
              type="text"
              placeholder="React, Node.js, MongoDB"
              value={profile.skills}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skills:
                    e.target.value,
                })
              }
              className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}