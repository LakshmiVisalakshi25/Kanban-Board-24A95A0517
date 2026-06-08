import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
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
      const res = await API.get("/auth/profile");

      setProfile({
        ...res.data,
        skills: res.data.skills?.join(", ") || "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();

    try {
      await API.put("/auth/profile", {
        ...profile,
        skills: profile.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
      });

      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      
      <div className="flex">
        
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            w-full
            min-w-0
            p-3
            sm:p-4
            md:p-6
            pt-20
            md:pt-6
          "
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Profile Settings
          </h1>

          <div className="flex justify-center">
            <form
              onSubmit={updateProfile}
              className="
                w-full
                max-w-3xl
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-lg
                p-4
                sm:p-6
                md:p-8
              "
            >
              {/* NAME */}
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Name
                </label>

                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:text-white
                    p-3
                    rounded-lg
                  "
                />
              </div>

              {/* BIO */}
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Bio
                </label>

                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bio: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:text-white
                    p-3
                    rounded-lg
                    resize-none
                  "
                />
              </div>

              {/* COLLEGE */}
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  College
                </label>

                <input
                  type="text"
                  value={profile.college}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      college: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:text-white
                    p-3
                    rounded-lg
                  "
                />
              </div>

              {/* GITHUB */}
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  GitHub
                </label>

                <input
                  type="text"
                  value={profile.github}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      github: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:text-white
                    p-3
                    rounded-lg
                  "
                />
              </div>

              {/* LINKEDIN */}
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  LinkedIn
                </label>

                <input
                  type="text"
                  value={profile.linkedin}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      linkedin: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:text-white
                    p-3
                    rounded-lg
                  "
                />
              </div>

              {/* SKILLS */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Skills
                </label>

                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  value={profile.skills}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    dark:border-gray-600
                    dark:bg-gray-700
                    dark:text-white
                    p-3
                    rounded-lg
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  sm:w-auto
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  px-8
                  py-3
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                Save Profile
              </button>
            </form>
          </div>
        </main>

      </div>
    </div>
  );
}