import React, { useContext, useEffect, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import AddressSelector from "../../components/AddressSelector";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";



import {
  deleteData,

  fetchDataFromApi,

} from "../../utils/api.js";

import { MyContext } from "../../App.jsx";

const AddressForm = () => {
  const context = useContext(MyContext);
  const [address, setAddress] = useState([]);
 

  

  useEffect(() => {
    if (context?.userData?._id !== undefined && context?.userData?._id !== "") {
      
        setAddress(context?.userData?.address_details);
    }
  }, [context?.userData]);

  

  

  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`,
      ).then((res) => {
        setAddress(res.data);
        context?.getUserDetails();
      });
    });
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
                  onClick={()=>{
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }}
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
      
    </>
  );
};

export default AddressForm;
