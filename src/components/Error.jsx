export default function Error({ message, retry }) {
  return (
    <div className="text-center mt-10">
      <p className="text-red-500 mb-3">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}