import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

export default function InstallationModal({ setIsOpen,slug,layout }) {
  const htmlCode = `<div id="embed-root"></div>
<script src="${import.meta.env.VITE_BACKEND_URL}/review/embed/${slug}/${layout}/embed.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    toast.info("Code copied to clipboard!"); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <button
          className="absolute cursor-pointer top-2 right-2 text-gray-600 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Installation</h2>

        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Add the HTML code in your website where you want to load Gimme Feedbacks Wall of love section.</li>
        </ul>

        <div className="bg-gray-900 text-white font-mono text-sm rounded p-4 overflow-x-auto mb-4">
          <pre>{htmlCode}</pre>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={handleCopy}
          >
            Copy Code
          </button>
          
        </div>
      </div>
    </div>
  );
}
