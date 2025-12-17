export default function ConfirmModal({ onYes, onNo }) {
return (
<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
<div className="bg-white p-4 rounded">
<p>Are you sure you want to delete?</p>
<div className="flex gap-4 mt-3">
<button onClick={onYes} className="bg-red-600 text-white px-3 py-1">Yes</button>
<button onClick={onNo} className="bg-gray-400 px-3 py-1">No</button>
</div>
</div>
</div>
);
}