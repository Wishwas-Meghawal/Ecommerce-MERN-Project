import { useContext, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Trash2,
  Home,
  Briefcase,
  EllipsisVertical,
} from "lucide-react";
import Radio from "@mui/material/Radio";
import { MyContext } from "../../App";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;

export default function AddressSelector({ addresses = [], removeAddress,editAddress }) {
  const context = useContext(MyContext);
  const [selected, setSelected] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  if (!addresses?.length) {
    return (
      <div className="bg-white/60 backdrop-blur-lg border border-gray-200 pt-5 mt-5 p-8 rounded-3xl text-center text-gray-500 shadow-sm">
        No address found
      </div>
    );
  }

  const handleRemoveAddress = (id) => {
  setAnchorEl(null);
  removeAddress(id); // ye props wala function hai ✅
};

const handleEditAddress = (id)=>{
  setAnchorEl(null);
  editAddress(id)
}

  return (
    <div className="w-full mt-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-blue-100">
          <MapPin size={16} className="text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Select Delivery Address
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {addresses.map((addr) => {
          const isSelected = selected === addr._id;

          return (
            <div
              key={addr._id}
              onClick={() => setSelected(addr._id)}
              className={`
            group relative flex items-start gap-3 p-4 rounded-xl
            transition-all duration-200 cursor-pointer border
            ${
              isSelected
                ? "bg-white border-blue-500 shadow-sm"
                : "bg-white border-gray-200 hover:shadow-sm"
            }
          `}
            >
              {/* Radio */}
              {/* <Radio
                checked={isSelected}
                onChange={handleChange}
                value={addr._id}
                sx={{
                  padding: "2px",
                  "&.Mui-checked": { color: "#2563eb" },
                }}
              /> */}

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-col gap-1">
                  {/* Badge (Top) */}
                  <span
                    className={`w-fit flex items-center gap-1 text-[10px] px-2 py-[2px] rounded-full font-medium
                    ${
                      addr.addressType === "Home"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {addr.addressType === "Home" ? (
                      <Home size={12} />
                    ) : (
                      <Briefcase size={12} />
                    )}
                    {addr.addressType}
                  </span>

                  {/* Name + Mobile (Below) */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900">
                      {context?.userData?.name || "User"}
                    </p>

                    {addr.mobile && (
                      <p className="text-sm font-semibold text-gray-900">
                        +{addr?.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <p className="text-sm text-gray-600">
                  {[addr?.address_line, addr?.city, addr?.state]
                    .filter(Boolean)
                    .join(", ")}

                  {addr?.pincode && (
                    <>
                      {" - "}
                      <span className="font-semibold text-gray-800">
                        {addr.pincode}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Delete Button (FIXED TOP RIGHT) */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                {/* <Trash2
                  size={16}
                  className="text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAddress(addr._id);
                  }}
                /> */}

                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <EllipsisVertical />
                </IconButton>

                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    },
                    list: {
                      "aria-labelledby": "long-button",
                    },
                  }}
                >
                    <MenuItem
                      onClick={()=>handleEditAddress(addr?._id)}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={()=>handleRemoveAddress(addr?._id)}
                    >
                      Delete
                    </MenuItem>
                </Menu>
              </div>

              {/* Selected */}
              {isSelected && (
                <div className="absolute bottom-2 right-3 flex items-center gap-1 text-blue-600 text-[11px]">
                  <CheckCircle2 size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
