import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const SortByDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Relevance");

  const options = [
    "Relevance",
    "New Arrivals",
    "Price (High to Low)",
    "Price (Low to High)",
    "Ratings",
    "Discount",
  ];

  return (
    <div className="relative flex items-center gap-2">
      {/* Label outside */}
      <span className="text-sm text-gray-600 whitespace-nowrap">
        Sort by :
      </span>

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-[260px] bg-[#fff0fb]! px-4 py-2 rounded-md flex items-center justify-between text-sm shadow-sm"
      >
        <span className="font-medium text-gray-800">
          {selected}
        </span>
        <FiChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          } text-black`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-[260px] bg-[#fff0fb] rounded-xl shadow-lg z-50">
          <ul className="max-h-60 overflow-y-auto text-sm py-2 custom-scrollbar">
            {options.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                }}
                className={`px-5 py-3 cursor-pointer transition rounded-lg mx-2
                  ${
                    selected === item
                      ? "bg-white text-pink-600 font-medium"
                      : "hover:bg-white/70 text-gray-700"
                  }
                `}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortByDropdown;
