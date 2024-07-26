"use client";

const HoverButton = ({ icon, text, action, disabled }) => {
  return (
    <button
      id={`CP-${text}`}
      disabled={disabled}
      onClick={action}
      className="w-fit h-14 relative flex items-center px-4 hover:px-6 disabled:bg-blue-200 disabled:shadow-indigo-300/75 disabled:hover:gap-3 disabled:hover:px-4 justify-between bg-blue-500 hover:bg-blue-800 text-white font-semibold rounded-3xl shadow-lg shadow-indigo-600/75 overflow-hidden gap-3 hover:gap-5 transition-all duration-300 z-10"
    >
      <span className="relative">{icon}</span>
      <span className="">{text}</span>
    </button>
  );
};

export default HoverButton;
