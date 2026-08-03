import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MyContext } from "../../App.jsx";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api.js";

const AddAddress = () => {
  const context = useContext(MyContext);
  const [phone, setPhone] = useState("");
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

    const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormFields(() => ({
      ...formFields,
      addressType: event.target.value,
    }));
  };


  useEffect(()=>{

    if(context?.addressMode === "edit"){
      fetchAddress(context?.addressId)
    }
  },[context?.addressMode]);


  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

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

    if (context?.addressMode === "add") {
      setIsLoading(true);
      postData(`/api/address/add`, formFields, {
        withCredentials: true,
      }).then((res) => {
        if (res?.error !== true) {
          
          context.alertBox(res?.message, "success");
          setTimeout(()=>{
            context?.setOpenAddressPanel(false);
            setIsLoading(false);
          },500)

          context?.getUserDetails();
          
        } else {
          context.alertBox(res?.message, "error");
          setIsLoading(false);
        }
      });
    }

    if (context?.addressMode  === "edit") {
      setIsLoading(true);
      editData(`/api/address/${context?.addressId}`, formFields, {
        withCredentials: true,
      }).then((res) => {
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`,
        ).then((res) => {
           setTimeout(()=>{
            setIsLoading(false);
            context?.setOpenAddressPanel(false);
          },500)
          context?.getUserDetails(res.data);
         

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
      });
    }
  };

  const fetchAddress = (id) => {



    fetchDataFromApi(`/api/address/${id}`).then((res) => {
      setFormFields({
        address_line: res?.address?.address_line,
        city: res?.address?.city,
        state: res?.address?.state,
        pincode: res?.address?.pincode,
        country: res?.address?.country,
        mobile: res?.address?.mobile,
        userId: res?.address?.userId,
        addressType: res?.address?.addressType,
        landmark: res?.address?.landmark,
      });
      const ph = `"${res?.address?.mobile}"`;
      setPhone(ph);
      setAddressType(res?.address?.addressType);
    });
  };

  return (
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
        <div className="w-[100%]">
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
        </div>

<div className="flex items-center gap-4 pb-4">
        <div className="col w-[100%]">
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
              <FormControlLabel value="Home" control={<Radio />} label="Home" />
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
      <div className="flex justify-center gap-3 mt-6">
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%" ,
            borderRadius: "10px",
            px: 4,
            py: 1,
            textTransform: "none",
            fontSize: "0.95rem",
            fontWeight: 600,
            backgroundColor: "#ff5252",
            boxShadow: "0 8px 16px -4px rgba(255, 82, 82, 0.35)",
            transition: "background-color 0.25s ease, box-shadow 0.25s ease",

            "&:hover": {
              backgroundColor: "#000", // 👈 only color change
              boxShadow: "0 12px 20px -6px rgba(255, 82, 82, 0.45)",
            },

            "&:active": {
              boxShadow: "0 6px 12px -4px rgba(255, 82, 82, 0.35)",
            },
          }}
        >
          {isLoading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            "Save Address"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddAddress;
