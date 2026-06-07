import { useState } from "react";

import API from "../services/api";

export default function CommentsModal({
  task,
  fetchTasks,
  onClose,
}) {
  const [text, setText] =
    useState("");

  // ADD COMMENT
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      <div className="bg-white dark:bg-gray-800 dark:text-white w-full max-w-lg rounded shadow-lg p-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          
          <h2 className="text-2xl font-bold">
            Team Chat
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* COMMENTS */}
        <div className="h-80 overflow-y-auto border dark:border-gray-600 rounded p-3 mb-4 space-y-3">
          
          {task.comments?.length ===
          0 ? (
            <p>
              No comments yet
            </p>
          ) : (
            task.comments.map(
              (
                comment,
                index
              ) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded"
                >
                  <p className="font-bold">
                    {
                      comment.user
                    }
                  </p>

                  <p>
                    {
                      comment.text
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>

        {/* INPUT */}
        <div className="flex gap-2">
          
          <input
            type="text"
            placeholder="Type message..."
            value={text}
            onChange={(e) =>
              setText(
                e.target.value
              )
            }
            className="flex-1 border dark:border-gray-600 dark:bg-gray-700 p-2 rounded"
          />

          <button
            onClick={addComment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}