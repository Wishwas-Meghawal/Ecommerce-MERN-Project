import React, { useContext, useEffect, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import AddressSelector from "../../components/AddressSelector";
import { Button, Select, TextField } from "@mui/material";
import { Plus } from "lucide-react";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api.js";
import { MyContext } from "../../App.jsx";

const AddressForm = () => {
  const context = useContext(MyContext);
  const [phone, setPhone] = useState("");
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addressType, setAddressType] = useState("");

  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    addressType: "",
    landmark: "",
  });

  useEffect(() => {
    if (context?.userData?._id !== undefined) {
      setFormFields((prev) => ({
        ...prev,
        userId: context?.userData?._id,
      }));
    }
  }, [context?.userData]);

  useEffect(() => {
    if (context?.userData?._id !== undefined && context?.userData?._id !== "") {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`,
      ).then((res) => {
        setAddress(res.data);
      });
    }
  }, [context?.userData]);

  const handleClose = () => {
    setIsOpenModel(false);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`,
      ).then((res) => {
        setAddress(res.data);
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.address_line === "")
      return context.alertBox("Address Line 1 required", "error");

    if (formFields.city === "")
      return context.alertBox("City required", "error");

    if (formFields.state === "")
      return context.alertBox("State required", "error");

    if (formFields.pincode === "")
      return context.alertBox("Pincode required", "error");

    if (formFields.country === "")
      return context.alertBox("Country required", "error");

    if (phone === "") return context.alertBox("Mobile required", "error");

    if (formFields.landmark === "")
      return context.alertBox("Landmark required", "error");

    if (formFields.addressType === "")
      return context.alertBox("AddressType required", "error");

    postData(`/api/address/add`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (!res?.error) {
        setIsLoading(true);
        context.alertBox(res?.message, "success");

        setIsOpenModel(false);
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`,
        ).then((res) => {
          setAddress(res.data);

          setFormFields({
            address_line: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            userId: "",
            addressType: "",
            landmark: "",
          });

          setAddressType("");
          setPhone("");
        });
      } else {
        context.alertBox(res?.message, "error");
        setIsLoading(false);
      }
    });
  };

  const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormFields(() => ({
      ...formFields,
      addressType: event.target.value,
    }));
  };

  return (
    <>
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto flex gap-8">
          {/* Sidebar */}
          <div className="w-[22%]">
            <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="w-[55%]">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                    Address Information
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your saved delivery addresses
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                {/* Add Address Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Plus size={18} />}
                  onClick={() => setIsOpenModel(true)}
                  sx={{
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                    borderRadius: "20px",
                    paddingY: "14px",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    textTransform: "none",
                    transition: "all 0.3s ease",

                    "&:hover": {
                      borderColor: "#3b82f6",
                      color: "#2563eb",
                      backgroundColor: "rgba(59,130,246,0.06)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Add New Address
                </Button>
              </div>
              <AddressSelector
                addresses={address}
                removeAddress={removeAddress}
              />
            </div>
          </div>
        </div>
      </section>
      <Dialog
        open={isOpenModel}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "600px",
            width: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#ff5252",
            color: "white",
            padding: "16px 24px",
            fontSize: "1.25rem",
            fontWeight: 600,
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          Add Address
        </DialogTitle>

        <form
          className="w-full"
          style={{ padding: "24px" }}
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-4 pb-4">
            <div className="col w-[100%]">
              <TextField
                className="w-full"
                label="Address Line 1"
                variant="outlined"
                size="small"
                name="address_line"
                value={formFields.address_line}
                onChange={onChangeInput}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pb-4">
            <div className="col w-full">
              <TextField
                className="w-full"
                label="City *"
                variant="outlined"
                size="small"
                name="city"
                value={formFields.city}
                onChange={onChangeInput}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pb-4">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="State *"
                variant="outlined"
                size="small"
                name="state"
                value={formFields.state}
                onChange={onChangeInput}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </div>
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Country *"
                variant="outlined"
                size="small"
                name="country"
                value={formFields.country}
                onChange={onChangeInput}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </div>
          </div>

          <h6
            className="text-[14px] font-[500] mb-2"
            style={{
              color: "#4a5568",
              marginBottom: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            Postcode/ZIP *
          </h6>

          <div className="flex items-center gap-4 pb-4">
            <div className="col w-[100%]">
              <TextField
                className="w-full"
                label="ZIP Code"
                variant="outlined"
                size="small"
                name="pincode"
                value={formFields.pincode}
                onChange={onChangeInput}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pb-4">
            <div className="w-[50%]">
              <div className="mui-phone-wrapper">
                <PhoneInput
                  defaultCountry="in"
                  value={phone}
                  onChange={(phone) => {
                    setPhone(phone);
                    setFormFields((prev) => ({
                      ...prev,
                      mobile: phone,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Landmark"
                variant="outlined"
                size="small"
                name="landmark"
                value={formFields.landmark}
                onChange={onChangeInput}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pb-4">
            <div className="col w-[50%]">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <h6
                    className="text-[14px] font-[500] "
                    style={{
                      color: "#4a5568",
                      marginBottom: "2px",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Address Type *
                  </h6>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={addressType}
                  onChange={handleChangeAddressType}
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio />}
                    label="Home"
                  />
                  <FormControlLabel
                    value="Office"
                    control={<Radio />}
                    label="Office"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {/* Add Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              onClick={handleClose}
              sx={{
                borderRadius: "6px",
                px: 3,
                py: 1,
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 500,

                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(0,0,0,0.08)",
                color: "#374151",

                transition: "all 0.25s ease",

                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                  borderColor: "#000",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                  transform: "translateY(-1px)",
                },

                "&:active": {
                  transform: "translateY(0px)",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "10px",
                px: 4,
                py: 1,
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                backgroundColor: "#ff5252",
                boxShadow: "0 8px 16px -4px rgba(255, 82, 82, 0.35)",
                transition:
                  "background-color 0.25s ease, box-shadow 0.25s ease",

                "&:hover": {
                  backgroundColor: "#000", // 👈 only color change
                  boxShadow: "0 12px 20px -6px rgba(255, 82, 82, 0.45)",
                },

                "&:active": {
                  boxShadow: "0 6px 12px -4px rgba(255, 82, 82, 0.35)",
                },
              }}
            >
              Save Address
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddressForm;
