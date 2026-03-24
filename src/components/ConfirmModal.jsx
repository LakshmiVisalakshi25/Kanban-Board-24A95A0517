export default function ConfirmModal({ onYes, onNo }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded">
        <p>Are you sure?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onYes}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={onNo}
            className="bg-gray-400 px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}