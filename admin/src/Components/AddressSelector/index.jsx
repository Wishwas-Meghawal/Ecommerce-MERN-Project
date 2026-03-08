import { useState, useEffect } from "react";
import { CheckCircle2, MapPin, Plus, Trash2 } from "lucide-react";

import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";

export default function AddressSelector({ addresses = [], onAddAddress }) {
  const [selected, setSelected] = useState(null);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  if (!addresses?.length) {
    return (
      <div className="bg-gray-50 p-6 rounded-xl text-center text-gray-500">
        No address found
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-100">
          <MapPin size={18} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          Select Delivery Address
        </h2>
      </div>

      {/* Address cards */}
      <div className="flex flex-col gap-3">
        {addresses.map((addr) => {
          const isSelected = selected === addr._id;

          return (
            <div
              key={addr._id}
              onClick={() => setSelected(addr._id)}
              className={`
                group relative flex items-start gap-4 p-6 rounded-3xl 
                transition-all duration-300 cursor-pointer
                backdrop-blur-xl border
                ${
                  isSelected
                    ? "bg-white border-blue-500 shadow-lg scale-[1.01]"
                    : "bg-white/70 border-gray-200 hover:shadow-md hover:-translate-y-1"
                }
              `}
            >
              {/* Left Radio */}
              <Radio
                checked={isSelected}
                onChange={handleChange}
                value={addr._id}
                sx={{
                  padding: "4px",
                  color: "#cbd5e1",
                  "&.Mui-checked": {
                    color: "#2563eb",
                  },
                }}
              />

              {/* Address Content */}
              <div className="flex-1 space-y-1">
                <p className="text-base font-semibold text-gray-900">
                  {addr.address_line}
                </p>

                <p className="text-sm text-gray-500">
                  {addr.city}, {addr.state} — {addr.pincode}
                </p>

                <p className="text-sm text-gray-500">{addr.country}</p>
              </div>

              {/* Delete Icon */}
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Trash2
                  size={18}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAddress(addr._id);
                  }}
                />
              </div>

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute bottom-5 right-5 flex items-center gap-1 text-blue-600 text-xs font-medium">
                  <CheckCircle2 size={16} />
                  Selected
                </div>
              )}
            </div>
          );
        })}

        {/* Add Address Button */}
        <Button
          onClick={onAddAddress}
          fullWidth
          variant="outlined"
          startIcon={<Plus size={16} />}
          sx={{
            borderStyle: "dashed",
            borderWidth: "2px",
            borderColor: "#d1d5db",
            color: "#9ca3af",
            borderRadius: "16px",
            paddingY: "10px",
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "none",

            "&:hover": {
              borderColor: "#60a5fa",
              color: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.05)",
            },
          }}
        >
          Add New Address
        </Button>
      </div>
    </div>
  );
}
