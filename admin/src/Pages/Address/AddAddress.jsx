import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App.jsx";
import { fetchDataFromApi, postData } from "../../utils/api.js";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { PhoneInput } from "react-international-phone";

const AddAddress = () => {
  const context = useContext(MyContext);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: "",
    selected:false,
  });

  // set user id
  useEffect(() => {
    setFormFields((prev) => ({
      ...prev,
      userId: context?.userData?._id,
    }));
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prev) => ({
      ...prev,
      status: event.target.value,
    }));
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

    postData("/api/address/add", formFields, {
      withCredentials: true,
    }).then((res) => {
      if (!res?.error) {
        setIsLoading(true);
        context.alertBox(res?.data?.message, "success");

        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`,
        ).then((res) => {
          context?.setAddress(res.data);
        });

        
      } else {
        context.alertBox(res?.message, "error");
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100/80">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
        Address Information
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextField
            name="address_line"
            label="Address Line 1"
            size="small"
            fullWidth
            value={formFields.address_line}
            onChange={onChangeInput}
          />

          <TextField
            name="city"
            label="City"
            size="small"
            fullWidth
            value={formFields.city}
            onChange={onChangeInput}
          />

          <TextField
            name="state"
            label="State"
            size="small"
            fullWidth
            value={formFields.state}
            onChange={onChangeInput}
          />

          <TextField
            name="country"
            label="Country"
            size="small"
            fullWidth
            value={formFields.country}
            onChange={onChangeInput}
          />

          <TextField
            name="pincode"
            label="Postal Code"
            size="small"
            fullWidth
            value={formFields.pincode}
            onChange={onChangeInput}
          />

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

          <Select
            value={status}
            onChange={handleChangeStatus}
            size="small"
            className="w-full"
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="contained">
            ADD ADDRESS
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
