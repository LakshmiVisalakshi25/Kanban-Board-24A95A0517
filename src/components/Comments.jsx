import { useState } from "react";

import API from "../services/api";

export default function Comments({
  task,
  fetchTasks,
}) {
  const [text, setText] =
    useState("");

  async function addComment() {
    if (!text) return;

    try {
      await API.post(
        `/tasks/${task._id}/comment`,
        {
          text,
        }
      );

      setText("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-4">
      
      <h3 className="font-bold mb-2">
        Comments
      </h3>

      {/* COMMENTS */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {task.comments?.map(
          (comment, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 p-2 rounded"
            >
              <p className="font-semibold text-sm">
                {comment.user}
              </p>

              <p className="text-sm">
                {comment.text}
              </p>
            </div>
          )
        )}
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Add comment..."
          className="flex-1 border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <button
          onClick={addComment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded"
        >
          Send
        </button>
      </div>

      {/* ACTIVITY */}
      <div className="mt-4">
        <h3 className="font-bold mb-2">
          Activity
        </h3>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {task.activity?.map(
            (item, index) => (
              <div
                key={index}
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                • {item.text}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}